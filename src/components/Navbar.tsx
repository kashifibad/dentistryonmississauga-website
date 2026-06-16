import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Clock, Mail } from 'lucide-react';
import { useClinicOpen } from '../hooks/useClinicOpen';
import { clinic, sharedHours } from '../config/clinic';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const services = [
  { label: 'Preventive & Family', page: 'services', hash: 'preventive' },
  { label: 'Emergency Dental', page: 'services', hash: 'emergency' },
  { label: 'Restorative Dentistry', page: 'services', hash: 'restorative' },
  { label: 'Root Canal Treatment', page: 'services', hash: 'root-canal' },
  { label: 'Cosmetic Dentistry', page: 'services', hash: 'cosmetic' },
  { label: 'Implants & Missing Teeth', page: 'services', hash: 'implants' },
  { label: 'Insurance & Direct Billing', page: 'services', hash: 'coverage' },
];

const insuranceLinks = [
  { label: 'CDCP', page: 'insurance', hash: 'cdcp' },
  { label: 'ODSP', page: 'insurance', hash: 'odsp' },
  { label: 'Private Insurance', page: 'insurance', hash: 'private-insurance' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const open = useClinicOpen();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services', dropdown: 'services' },
    { label: 'Insurance', page: 'insurance', dropdown: 'insurance' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const getDropdownItems = (dropdown?: string) => {
    if (dropdown === 'services') return services;
    if (dropdown === 'insurance') return insuranceLinks;
    return [];
  };

  const handleNav = (page: string, hash?: string) => {
    onNavigate(page);
    setMobileOpen(false);
    setOpenDropdown(null);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="relative z-[60] bg-neutral-950 text-white text-xs py-2 md:hidden border-b border-neutral-800">
        <div className="px-4 flex items-center justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold border ${
              open
                ? 'bg-green-500/15 border-green-400/40 text-green-300'
                : 'bg-red-500/15 border-red-400/40 text-red-300'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            {open ? 'Open Now' : 'Closed'}
          </span>
          <button
            onClick={() => handleNav('contact')}
            className="shrink-0 rounded-full bg-primary-600 px-3 py-1.5 font-bold text-white shadow-sm shadow-black/20"
          >
            Book Appt
          </button>
        </div>
      </div>
      <div className="relative z-[60] bg-neutral-950 text-white text-sm py-2 hidden md:block border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-neutral-400">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                open
                  ? 'bg-green-500/15 border-green-400/40 text-green-300'
                  : 'bg-red-500/15 border-red-400/40 text-red-300'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              {open ? 'Open Now' : 'Closed'}
            </span>
            <div className="relative group">
              <button className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-neutral-300 transition-colors hover:bg-white/10 hover:text-white">
                <Clock className="w-3.5 h-3.5" />
                Hours of Operation
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full z-[80] mt-2 w-72 rounded-xl border border-white/10 bg-neutral-950 p-4 opacity-0 shadow-2xl shadow-black/30 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Hours of Operation</p>
                <div className="space-y-2">
                  {sharedHours.map((item) => (
                    <div key={item.day} className="grid grid-cols-[1fr_auto] items-start gap-4 text-xs">
                      <span className="text-neutral-400 whitespace-nowrap">{item.day}</span>
                      <span className="font-semibold text-white text-right whitespace-nowrap">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={`mailto:${clinic.email}`} className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-neutral-300 transition-colors hover:bg-white/10 hover:text-white">
              <Mail className="w-3.5 h-3.5" />
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg shadow-neutral-100/80'
            : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNav('home')}
              className="flex min-w-0 items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity"
            >
              <img
                src="/brand-mark.png"
                alt={`${clinic.name} logo mark`}
                className="h-11 w-11 sm:h-14 sm:w-14 shrink-0 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="min-w-0">
                <span className="text-primary-700 font-black text-[11px] sm:text-sm tracking-widest uppercase leading-tight block">
                  {clinic.headerLine1}<br />
                  <span className="text-teal-600">{clinic.headerLine2}</span>
                </span>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.page} className="relative">
                  {link.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(link.dropdown)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        onClick={() => handleNav(link.page)}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          currentPage === link.page
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                        }`}
                      >
                        {link.label}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.dropdown ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === link.dropdown && (
                        <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 mt-1">
                          {getDropdownItems(link.dropdown).map((s) => (
                            <button
                              key={s.hash}
                              onClick={() => handleNav(s.page, s.hash)}
                              className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNav(link.page)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        currentPage === link.page
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                      }`}
                    >
                      {link.label}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => handleNav('contact')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-primary-200 hover:shadow-lg hover:shadow-primary-200 transition-all"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-100 px-6 py-4 space-y-1 shadow-lg">
            {navLinks.map((link) => (
              <div key={link.page}>
                <button
                  onClick={() => handleNav(link.page)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    currentPage === link.page
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </button>
                {link.dropdown && (
                  <div className="ml-4 space-y-1 mt-1">
                    {getDropdownItems(link.dropdown).map((s) => (
                      <button
                        key={s.hash}
                        onClick={() => handleNav(s.page, s.hash)}
                        className="w-full text-left px-4 py-2 rounded-lg text-sm text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => handleNav('contact')}
                className="bg-primary-600 text-white px-5 py-3 rounded-xl font-semibold text-sm w-full"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
