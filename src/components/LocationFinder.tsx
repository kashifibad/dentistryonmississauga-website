import { useMemo, useState } from 'react';
import { Calendar, Clock, ExternalLink, LocateFixed, MapPin, Navigation, Phone, Star } from 'lucide-react';
import { allClinics, clinic, getDirectionsUrl, sharedHours, telHref } from '../config/clinic';

interface LocationFinderProps {
  compact?: boolean;
  showMaps?: boolean;
  className?: string;
  onNavigate?: (page: string) => void;
}

export default function LocationFinder({ compact = false, className = '', onNavigate }: LocationFinderProps) {
  const [startingPoint, setStartingPoint] = useState('');
  const [geoMessage, setGeoMessage] = useState('');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationMode, setLocationMode] = useState<'browser' | 'manual' | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const hasStartingPoint = startingPoint.trim().length > 0;
  const closestBadgeText =
    locationMode === 'manual'
      ? 'Closest based on your address'
      : 'Closest based on your location';

  const parseCoordinates = (value: string) => {
    const match = value.trim().match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
    if (!match) return null;

    const lat = Number(match[1]);
    const lng = Number(match[2]);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return { lat, lng };
  };

  const distanceFromUser = (lat: number, lng: number) => {
    if (!userCoords) return null;

    const toRadians = (value: number) => (value * Math.PI) / 180;
    const earthRadiusKm = 6371;
    const dLat = toRadians(lat - userCoords.lat);
    const dLng = toRadians(lng - userCoords.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(userCoords.lat)) *
        Math.cos(toRadians(lat)) *
        Math.sin(dLng / 2) ** 2;

    return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const orderedLocations = useMemo(() => {
    const locations = [clinic, ...allClinics.filter((item) => item.id !== clinic.id)];

    if (!userCoords) return locations;

    return [...locations].sort((a, b) => {
      const distanceA = distanceFromUser(a.coordinates.lat, a.coordinates.lng) ?? Number.MAX_VALUE;
      const distanceB = distanceFromUser(b.coordinates.lat, b.coordinates.lng) ?? Number.MAX_VALUE;
      return distanceA - distanceB;
    });
  }, [userCoords]);

  const closestLocationId = userCoords ? orderedLocations[0]?.id : '';

  const handleBook = (locationId: string, website?: string) => {
    if (locationId === clinic.id) {
      if (onNavigate) {
        onNavigate('contact');
        setTimeout(() => {
          document.getElementById('appointment-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return;
      }

      document.getElementById('appointment-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (website) {
      window.open(`${website.replace(/\/$/, '')}/contact`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleUseLocation = () => {
    setGeoMessage('');

    if (!navigator.geolocation) {
      setGeoMessage('Your browser does not support location sharing. You can still enter an address or postal code.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude},${position.coords.longitude}`;
        setStartingPoint(coords);
        setUserCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLocationMode('browser');
        setGeoMessage('We highlighted the closest clinic by straight-line distance. Use Google Maps directions to confirm real travel time.');
      },
      () => {
        setGeoMessage('Location access was not allowed. You can still enter an address or postal code.');
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  };

  const handleCompareRoutes = async () => {
    const trimmedStartingPoint = startingPoint.trim();

    if (!trimmedStartingPoint) {
      setGeoMessage('Enter your address or postal code first, then compare directions for each clinic.');
      return;
    }

    const parsedCoords = parseCoordinates(trimmedStartingPoint);
    if (parsedCoords) {
      setUserCoords(parsedCoords);
      setLocationMode('manual');
      setGeoMessage('We highlighted the closest clinic based on your starting point. Use Google Maps directions to confirm real travel time.');
      document.getElementById('clinic-location-cards')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    setIsComparing(true);
    setGeoMessage('Checking that address so we can highlight the closest clinic...');

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ca&q=${encodeURIComponent(trimmedStartingPoint)}`
      );
      const results = await response.json();
      const firstResult = Array.isArray(results) ? results[0] : null;
      const lat = Number(firstResult?.lat);
      const lng = Number(firstResult?.lon);

      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        setUserCoords(null);
        setLocationMode(null);
        setGeoMessage('We could not find that address. Try adding the city and province, or use each directions button to compare in Google Maps.');
        return;
      }

      setUserCoords({ lat, lng });
      setLocationMode('manual');
      setGeoMessage('We highlighted the closest clinic based on your address. Use Google Maps directions to confirm real travel time.');
      document.getElementById('clinic-location-cards')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch {
      setUserCoords(null);
      setLocationMode(null);
      setGeoMessage('We could not check that address right now. You can still use each directions button to compare travel time in Google Maps.');
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <section id="locations" className={className}>
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-primary-600 font-bold text-sm tracking-wider uppercase">Our Locations</span>
        <h2 className={`${compact ? 'text-3xl' : 'text-4xl'} font-black text-neutral-900 mt-3 mb-4`}>
          Choose the Clinic That Works Best for You
        </h2>
        <p className="text-neutral-600 text-lg leading-relaxed">
          Enter your address or postal code to compare routes in Google Maps, or share your current location
          to highlight the closest clinic by distance.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-8 bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 md:p-5">
        <div className="flex flex-col md:flex-row gap-3">
          <label className="sr-only" htmlFor="starting-point">Starting address or postal code</label>
          <input
            id="starting-point"
            type="text"
            value={startingPoint}
            onChange={(event) => {
              setStartingPoint(event.target.value);
              if (userCoords) {
                setUserCoords(null);
                setLocationMode(null);
              }
            }}
            onFocus={() => {
              if (userCoords) {
                setUserCoords(null);
                setLocationMode(null);
                setGeoMessage('');
              }
            }}
            placeholder="Enter your address or postal code"
            className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
          />
          <button
            type="button"
            onClick={handleCompareRoutes}
            disabled={isComparing}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-75 ${
              hasStartingPoint
                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm'
                : 'border border-neutral-200 text-neutral-500 hover:bg-neutral-50'
            }`}
          >
            <Navigation className="w-4 h-4" />
            {isComparing ? 'Checking...' : 'Compare routes'}
          </button>
          <button
            type="button"
            onClick={handleUseLocation}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-200 px-4 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
          >
            <LocateFixed className="w-4 h-4" />
            Use my location
          </button>
        </div>
        {geoMessage && <p className="mt-3 text-sm text-neutral-500">{geoMessage}</p>}
      </div>

      <div id="clinic-location-cards" className="grid md:grid-cols-3 gap-6 scroll-mt-28">
        {orderedLocations.map((location) => {
          const isCurrent = location.id === clinic.id;
          const isClosest = location.id === closestLocationId;
          const distanceKm = distanceFromUser(location.coordinates.lat, location.coordinates.lng);
          const directionsUrl = getDirectionsUrl(location.address, startingPoint);

          return (
            <article
              key={location.id}
              className={`relative rounded-2xl border bg-white shadow-lg transition-all duration-300 ${
                isClosest
                  ? 'border-2 border-teal-500 shadow-2xl shadow-teal-100 ring-4 ring-teal-50'
                  : isCurrent && !userCoords
                    ? 'border-primary-200 shadow-primary-100'
                    : 'border-neutral-200'
              } flex flex-col`}
            >
              {isClosest && (
                <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-teal-200 bg-teal-600 px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-lg">
                  {closestBadgeText}
                </div>
              )}

              {!compact && (
                <div className="relative h-40 overflow-hidden rounded-t-2xl bg-neutral-100">
                  <img
                    src={location.heroImage}
                    alt={`${location.name} clinic`}
                    className="w-full h-full object-cover"
                  />
                  {isCurrent && (
                    <span className="absolute top-3 left-3 rounded-full bg-primary-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                      Current Website
                    </span>
                  )}
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black text-neutral-900 mb-2">{location.name}</h3>
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  {location.rating} Google rating ({location.reviewCount} reviews)
                </div>

                <div className="space-y-3 text-sm text-neutral-600 flex-1">
                  <p className="flex gap-3">
                    <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {location.address}
                      {distanceKm !== null && (
                        <span className="mt-1 block text-xs font-bold text-teal-700">
                          Approx. {distanceKm.toFixed(1)} km away by distance
                        </span>
                      )}
                    </span>
                  </p>
                  <p className="flex gap-3">
                    <Phone className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                    <a href={telHref(location.phone)} className="font-semibold text-neutral-800 hover:text-primary-600">
                      {location.phone}
                    </a>
                  </p>
                  <p className="flex gap-3">
                    <Clock className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {sharedHours[0].time} weekdays<br />
                      {sharedHours[1].time} Saturday
                    </span>
                  </p>
                </div>

                <div className="mt-6 grid gap-2">
                  <button
                    type="button"
                    onClick={() => handleBook(location.id, location.website)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-bold text-white hover:bg-primary-700 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Book at this location
                  </button>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-bold text-neutral-700 hover:border-primary-200 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Get directions
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
