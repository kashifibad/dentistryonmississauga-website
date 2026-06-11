import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { clinic, otherClinics, telHref } from '../config/clinic';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServicesNav = (hash: string) => {
    onNavigate('services');
    setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1 text-center md:text-left">
            <div className="mb-4">
              <p className="text-white font-black text-lg tracking-widest uppercase leading-tight">
                {clinic.name.split(' ').slice(0, -1).join(' ').toUpperCase()}<br />
                <span className="text-primary-400">{clinic.name.split(' ').slice(-1).join(' ').toUpperCase()}</span>
              </p>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-5">
              Delivering professional, compassionate dental care for your whole family in {clinic.serviceArea}. Modern technology, gentle touch, and a smile you'll be proud of.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <a
                href="https://www.facebook.com/dentistryonmississauga/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/countryside_dental_clinic/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Cosmetic Dentistry', hash: 'cosmetic' },
                { label: 'Restorative Dentistry', hash: 'restorative' },
                { label: 'General Dentistry', hash: 'general' },
                { label: 'Teeth Whitening', hash: 'whitening' },
                { label: 'Dental Implants', hash: 'implants' },
                { label: 'Emergency Dental Care', hash: 'emergency' },
              ].map((s) => (
                <li key={s.hash}>
                  <button
                    onClick={() => handleServicesNav(s.hash)}
                    className="text-neutral-400 hover:text-primary-400 text-sm transition-colors text-center md:text-left w-full"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', page: 'home' },
                { label: 'About Us', page: 'about' },
                { label: 'CDCP Program', page: 'cdcp' },
                { label: 'Contact Us', page: 'contact' },
                { label: 'Book Appointment', page: 'contact' },
                { label: 'Patient Forms', page: 'contact' },
                { label: 'Privacy Policy', page: 'privacy' },
              ].map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => handleNav(l.page)}
                    className="text-neutral-400 hover:text-primary-400 text-sm transition-colors text-center md:text-left w-full"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <div className="text-neutral-400 text-sm text-left">
                  <p className="font-medium text-white">{clinic.name}</p>
                  <p>{clinic.address}</p>
                </div>
              </li>
              <li className="flex gap-3 items-center justify-center md:justify-start">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <a href={telHref(clinic.phone)} className="text-neutral-400 hover:text-primary-400 text-sm transition-colors">
                  {clinic.phone}
                </a>
              </li>
              <li className="flex gap-3 items-center justify-center md:justify-start">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <a
                  href={`mailto:${clinic.email}`}
                  className="text-neutral-400 hover:text-primary-400 text-sm transition-colors break-all"
                >
                  {clinic.email}
                </a>
              </li>
              <li className="flex gap-3 justify-center md:justify-start">
                <Clock className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <div className="text-neutral-400 text-sm text-left">
                  <p>Mon-Fri: 11:00 AM - 8:00 PM</p>
                  <p>Saturday: 10:00 AM - 5:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sister locations */}
      <div className="border-t border-neutral-700">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-center text-neutral-300 text-xs font-semibold uppercase tracking-widest mb-6">Our Other Locations</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {otherClinics.map((item) => (
              <a
                key={item.id}
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-neutral-800 hover:bg-primary-600 border border-neutral-700 hover:border-primary-500 text-white text-sm font-medium px-5 py-3 rounded-xl transition-all duration-200 group"
              >
                <MapPin className="w-4 h-4 text-primary-400 group-hover:text-white transition-colors" />
                <span>{item.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col items-center sm:flex-row sm:justify-between gap-3 text-sm text-neutral-500 text-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <p>&copy; {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
            <span className="hidden sm:inline text-neutral-700">|</span>
            <p>Powered by <a href="https://servquik.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">ServQuik Technologies</a></p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('privacy')} className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </button>
            <span>|</span>
            <button onClick={() => handleNav('contact')} className="hover:text-neutral-300 transition-colors">
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
