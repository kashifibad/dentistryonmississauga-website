import { useMemo, useState } from 'react';
import { Calendar, Clock, ExternalLink, LocateFixed, Map, MapPin, Navigation, Phone, Star } from 'lucide-react';
import { allClinics, clinic, getDirectionsUrl, getMapSearchUrl, sharedHours, telHref } from '../config/clinic';

interface LocationFinderProps {
  compact?: boolean;
  showMaps?: boolean;
  className?: string;
  onNavigate?: (page: string) => void;
}

export default function LocationFinder({ compact = false, showMaps = false, className = '', onNavigate }: LocationFinderProps) {
  const [startingPoint, setStartingPoint] = useState('');
  const [geoMessage, setGeoMessage] = useState('');

  const orderedLocations = useMemo(
    () => [clinic, ...allClinics.filter((item) => item.id !== clinic.id)],
    []
  );

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
        setGeoMessage('Location added. Use Get directions to compare travel time in Google Maps.');
      },
      () => {
        setGeoMessage('Location access was not allowed. You can still enter an address or postal code.');
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  };

  return (
    <section id="locations" className={className}>
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-primary-600 font-bold text-sm tracking-wider uppercase">Our Locations</span>
        <h2 className={`${compact ? 'text-3xl' : 'text-4xl'} font-black text-neutral-900 mt-3 mb-4`}>
          Choose the Clinic That Works Best for You
        </h2>
        <p className="text-neutral-600 text-lg leading-relaxed">
          A connected group of three dental clinics serving Brampton, Mississauga, and the greater GTA.
          Not sure which clinic is closest?
          Enter a starting point to open directions and compare travel time in Google Maps.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-8 bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 md:p-5">
        <div className="flex flex-col md:flex-row gap-3">
          <label className="sr-only" htmlFor="starting-point">Starting address or postal code</label>
          <input
            id="starting-point"
            type="text"
            value={startingPoint}
            onChange={(event) => setStartingPoint(event.target.value)}
            placeholder="Enter address or postal code"
            className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
          />
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

      <div className="grid md:grid-cols-3 gap-6">
        {orderedLocations.map((location) => {
          const isCurrent = location.id === clinic.id;
          const directionsUrl = getDirectionsUrl(location.address, startingPoint);
          const mapUrl = getMapSearchUrl(location.address);

          return (
            <article
              key={location.id}
              className={`bg-white rounded-2xl border ${isCurrent ? 'border-primary-200 shadow-primary-100' : 'border-neutral-200'} shadow-lg overflow-hidden flex flex-col`}
            >
              {!compact && (
                <div className="relative h-40 bg-neutral-100">
                  <img
                    src={location.heroImage}
                    alt={`${location.name} clinic`}
                    className="w-full h-full object-cover"
                  />
                  {isCurrent && (
                    <span className="absolute top-3 left-3 rounded-full bg-primary-600 px-3 py-1 text-xs font-bold text-white">
                      Current Website
                    </span>
                  )}
                </div>
              )}

              {showMaps && (
                <div className="relative h-44 overflow-hidden border-y border-neutral-100 bg-gradient-to-br from-sky-50 via-white to-teal-50">
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(14, 165, 233, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.12) 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                  <div className="relative flex h-full flex-col justify-between p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary-100 bg-white shadow-sm">
                        <MapPin className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">Map & directions</p>
                        <p className="mt-1 text-sm font-semibold text-neutral-900">{location.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-neutral-500">{location.address}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-primary-100 bg-white px-3 py-2 text-xs font-bold text-primary-700 shadow-sm transition-colors hover:border-primary-300"
                      >
                        <Map className="h-4 w-4" />
                        Open map
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-primary-700"
                      >
                        <Navigation className="h-4 w-4" />
                        Directions
                      </a>
                    </div>
                  </div>
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
                    <span>{location.address}</span>
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
