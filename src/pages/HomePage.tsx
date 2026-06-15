import { useState, useEffect, useRef } from 'react';
import {
  Star, CheckCircle, ArrowRight, Phone, Calendar,
  Shield, Clock, Heart, Award, ChevronLeft, ChevronRight,
  Sparkles, Stethoscope, Smile
} from 'lucide-react';
import { useClinicOpen } from '../hooks/useClinicOpen';
import { clinic, clinicGroupMessage, telHref } from '../config/clinic';
import LocationFinder from '../components/LocationFinder';

// Google Reviews SVG logo
function GoogleLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function RatingStars({ value, className = 'w-5 h-5' }: { value: number; className?: string }) {
  return (
    <div className="flex">
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = value - index;
        if (fill >= 0.75) {
          return <Star key={index} className={`${className} text-amber-400 fill-current`} />;
        }
        if (fill >= 0.25) {
          return (
            <span key={index} className={`relative inline-block ${className}`}>
              <Star className={`${className} text-neutral-300 fill-current absolute inset-0`} />
              <span className="absolute inset-0 overflow-hidden w-1/2">
                <Star className={`${className} text-amber-400 fill-current`} />
              </span>
            </span>
          );
        }
        return <Star key={index} className={`${className} text-neutral-300 fill-current`} />;
      })}
    </div>
  );
}

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const services = [
  {
    icon: Stethoscope,
    title: 'Preventive & Family Dentistry',
    description: 'Exams, cleanings, digital X-rays, fluoride, sealants, and friendly care for children, adults, and seniors.',
    hash: 'preventive',
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    icon: Clock,
    title: 'Emergency Dental Care',
    description: 'Support for tooth pain, swelling, chipped or broken teeth, lost crowns or fillings, and urgent dental concerns.',
    hash: 'emergency',
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    icon: Shield,
    title: 'Restorative Dentistry',
    description: 'Fillings, crowns, bridges, inlays, onlays, dentures, and partial dentures to restore comfort and function.',
    hash: 'restorative',
    color: 'from-blue-500 to-cyan-600',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description: 'Whitening, bonding, veneers, and smile consultations designed around your goals and comfort.',
    hash: 'cosmetic',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: Heart,
    title: 'Implants & Missing Teeth',
    description: 'Consultations for missing teeth and implant-supported options where appropriate for your needs.',
    hash: 'implants',
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    icon: Smile,
    title: 'CDCP, ODSP & Insurance Support',
    description: 'Coverage guidance, direct billing support, and help choosing the right location for your visit.',
    hash: 'coverage',
    color: 'from-indigo-500 to-violet-600',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
];

const features = [
  { icon: Award, label: 'Experienced Clinical Team', desc: 'Care led by a dentist with extensive experience across family, cosmetic, and restorative dentistry.' },
  { icon: Shield, label: 'Direct Insurance Billing', desc: 'We bill many insurance plans directly to make the visit simpler.' },
  { icon: Clock, label: 'Walk-In & Emergency Care', desc: 'New and emergency patients are always welcome. We\'re here when you need us most.' },
  { icon: Heart, label: 'Whole Family Care', desc: 'From pediatric dentistry to seniors, care for all ages with a personal touch.' },
];

const offers = [
  { text: 'Free Teeth Whitening' },
  { text: 'Direct Insurance Billing' },
  { text: 'CDCP Registered Provider' },
  { text: '3 Connected Dental Clinics' },
  { text: 'Walk-In Patients Welcome' },
  { text: 'Emergency Dental Care' },
  { text: 'ODSP Accepted' },
];

const coverageHighlights = [
  {
    title: 'Direct insurance billing',
    text: 'We can submit many dental insurance claims directly, helping reduce paperwork and making your visit simpler.',
  },
  {
    title: 'CDCP patients welcome',
    text: 'Eligible CDCP patients may have reduced or no out-of-pocket costs for covered services, depending on coverage level.',
  },
  {
    title: 'ODSP support',
    text: 'Our team can help patients with ODSP dental coverage understand next steps before their appointment.',
  },
  {
    title: 'Coverage questions before you visit',
    text: 'Not sure what applies to you? Share your coverage details and our front desk can help confirm the best next step.',
  },
];

function useIntersection(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return visible;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const open = useClinicOpen();
  const servicesRef = useRef<HTMLDivElement>(null!);
  const whyRef = useRef<HTMLDivElement>(null!);
  const servicesVisible = useIntersection(servicesRef);
  const whyVisible = useIntersection(whyRef);

  const handleServiceNav = (hash: string) => {
    onNavigate('services');
    setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const next = () => setTestimonialIdx((i) => (i + 1) % clinic.reviews.length);
  const prev = () => setTestimonialIdx((i) => (i - 1 + clinic.reviews.length) % clinic.reviews.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-sky-400/5 blur-2xl" />
        </div>

        {/* Floating dental/medical background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Tooth */}
          <svg className="hero-particle hero-particle-1 w-8 h-8 text-sky-400/20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.5 2 7.5 3.5 6 5c-1 1-2 2.5-2 4.5 0 3 1 5 1.5 7 .5 2 .5 3.5 1.5 4.5.5.5 1 .5 1.5 0 .5-.5.5-1.5.5-2.5V17c0-1 .5-2 1.5-2s1.5 1 1.5 2v1.5c0 1 0 2 .5 2.5.5.5 1 .5 1.5 0 1-1 1-2.5 1.5-4.5S20 12.5 20 9.5c0-2-1-3.5-2-4.5C16.5 3.5 14.5 2 12 2z"/></svg>
          {/* Medical cross */}
          <svg className="hero-particle hero-particle-2 w-6 h-6 text-teal-400/20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8h-4V4a1 1 0 0 0-1-1H10a1 1 0 0 0-1 1v4H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/></svg>
          {/* Tooth large */}
          <svg className="hero-particle hero-particle-3 w-10 h-10 text-primary-300/15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.5 2 7.5 3.5 6 5c-1 1-2 2.5-2 4.5 0 3 1 5 1.5 7 .5 2 .5 3.5 1.5 4.5.5.5 1 .5 1.5 0 .5-.5.5-1.5.5-2.5V17c0-1 .5-2 1.5-2s1.5 1 1.5 2v1.5c0 1 0 2 .5 2.5.5.5 1 .5 1.5 0 1-1 1-2.5 1.5-4.5S20 12.5 20 9.5c0-2-1-3.5-2-4.5C16.5 3.5 14.5 2 12 2z"/></svg>
          {/* Heart */}
          <svg className="hero-particle hero-particle-4 w-7 h-7 text-teal-300/20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          {/* Medical cross small */}
          <svg className="hero-particle hero-particle-5 w-5 h-5 text-sky-300/25" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8h-4V4a1 1 0 0 0-1-1H10a1 1 0 0 0-1 1v4H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/></svg>
          {/* Pill / capsule */}
          <svg className="hero-particle hero-particle-6 w-8 h-8 text-teal-400/20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.22 11.29l6.36-6.36a4 4 0 0 1 5.66 5.66l-6.36 6.36a4 4 0 0 1-5.66-5.66zm1.41 1.42a2 2 0 0 0 2.83 2.83L11 13l-2.83-2.83-2.54 2.54zM12 10.17L14.83 13l1.54-1.54a2 2 0 0 0-2.83-2.83L12 10.17z"/></svg>
          {/* Tooth medium */}
          <svg className="hero-particle hero-particle-7 w-9 h-9 text-sky-400/15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.5 2 7.5 3.5 6 5c-1 1-2 2.5-2 4.5 0 3 1 5 1.5 7 .5 2 .5 3.5 1.5 4.5.5.5 1 .5 1.5 0 .5-.5.5-1.5.5-2.5V17c0-1 .5-2 1.5-2s1.5 1 1.5 2v1.5c0 1 0 2 .5 2.5.5.5 1 .5 1.5 0 1-1 1-2.5 1.5-4.5S20 12.5 20 9.5c0-2-1-3.5-2-4.5C16.5 3.5 14.5 2 12 2z"/></svg>
          {/* Shield / protection */}
          <svg className="hero-particle hero-particle-8 w-6 h-6 text-primary-300/20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z"/></svg>
          {/* Sparkle star */}
          <svg className="hero-particle hero-particle-9 w-5 h-5 text-teal-300/25" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
          {/* Heart small */}
          <svg className="hero-particle hero-particle-10 w-6 h-6 text-sky-300/20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          {/* Medical cross large */}
          <svg className="hero-particle hero-particle-11 w-10 h-10 text-teal-400/10" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8h-4V4a1 1 0 0 0-1-1H10a1 1 0 0 0-1 1v4H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/></svg>
          {/* Pill large */}
          <svg className="hero-particle hero-particle-12 w-9 h-9 text-primary-300/15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.22 11.29l6.36-6.36a4 4 0 0 1 5.66 5.66l-6.36 6.36a4 4 0 0 1-5.66-5.66zm1.41 1.42a2 2 0 0 0 2.83 2.83L11 13l-2.83-2.83-2.54 2.54zM12 10.17L14.83 13l1.54-1.54a2 2 0 0 0-2.83-2.83L12 10.17z"/></svg>
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="flex flex-col items-start gap-2 mb-6 animate-fade-in">
                {/* Open/Closed badge - visible on mobile only (desktop shows it in the top bar) */}
                <span
                  className={`lg:hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                    open
                      ? 'bg-green-500/20 border-green-400/40 text-green-300'
                      : 'bg-red-500/20 border-red-400/40 text-red-300'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                  {open ? 'Open Now' : 'Closed'}
                </span>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  CDCP Registered Provider - Direct Billing Available
                </div>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] mb-6 animate-fade-in-up">
                Your Smile,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-teal-300">
                  Our Passion
                </span>
              </h1>

              <p className="text-primary-100 text-base sm:text-lg leading-relaxed mb-8 animate-fade-in-up animation-delay-200">
                {clinic.name} is part of a connected group of three dental clinics serving Brampton, Mississauga, and the greater GTA. Choose the location that works best for your family and get gentle, modern care close to home.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10 animate-fade-in-up animation-delay-400">
                {['Accepting New Patients', 'Many Insurance Plans', '3 Convenient Locations', 'Walk-Ins Welcome'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-white/90 bg-white/10 border border-white/20 rounded-full px-3 sm:px-4 py-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animation-delay-600">
                <button
                  onClick={() => onNavigate('contact')}
                  className="group flex items-center justify-center gap-2 bg-white text-primary-800 hover:bg-primary-50 px-7 py-3.5 rounded-xl font-bold text-base shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={telHref(clinic.phone)}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-all hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-white/20 animate-fade-in-up animation-delay-800">
                {[
                  { value: clinic.yearsExperience, label: 'Years Experience' },
                  { value: clinic.patientCount, label: 'Happy Patients' },
                  { value: '3', label: 'Clinic Locations' },
                  { value: clinic.rating, label: 'Google Rating', icon: Star },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl sm:text-3xl font-bold text-white font-display flex items-center gap-1">
                      {s.value}
                      {s.icon && <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 fill-current" />}
                    </div>
                    <div className="text-primary-200 text-xs sm:text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - transparent orbital brand mark (hidden on mobile) */}
            <div className="hidden lg:flex justify-center relative">
              <div className="relative w-[420px] h-[420px] flex items-center justify-center">
                {/* Glow platform */}
                <div className="absolute inset-0 rounded-full bg-primary-400/20 blur-3xl scale-110" />

                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-8 rounded-full border border-white/10" />
                <div className="absolute inset-16 rounded-full border border-white/15" />

                {[0, 90, 180, 270].map((deg, i) => (
                  <div
                    key={`brand-orbit-${i}`}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      animation: `spin${i % 2 === 0 ? 'CW' : 'CCW'} ${11 + i * 2}s linear infinite`,
                      transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(176px)`,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full glass flex items-center justify-center shadow-lg"
                      style={{
                        transform: `rotate(-${deg}deg)`,
                        animation: `counterRotate${i % 2 === 0 ? 'CW' : 'CCW'} ${11 + i * 2}s linear infinite`,
                      }}
                    >
                      {[Shield, Star, CheckCircle, Smile].map((Icon, iconIndex) => (
                        iconIndex === i ? <Icon key={iconIndex} className="w-5 h-5 text-teal-200" /> : null
                      ))}
                    </div>
                  </div>
                ))}

                <div className="relative z-10 w-32 h-32 rounded-full bg-white shadow-2xl shadow-black/25 border border-white/60 flex items-center justify-center overflow-hidden">
                  <img
                    src="/brand-mark.png"
                    alt={`${clinic.name} logo mark`}
                    className="h-24 w-24 object-contain"
                  />
                </div>

                <div className="absolute top-4 right-12 sparkle-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z" fill="#7dd3fc" />
                  </svg>
                </div>
                <div className="absolute bottom-12 left-10 sparkle-4">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z" fill="#bae6fd" />
                  </svg>
                </div>

                {/* Floating cards */}
                <div className="absolute -left-20 top-10 glass rounded-xl p-3 animate-float shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-teal-500/30 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-teal-300" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">Insurance Billing</p>
                      <p className="text-white/70 text-xs">Direct & Hassle-free</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-20 bottom-16 glass rounded-xl p-3 animate-float animation-delay-400 shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-amber-400/30 flex items-center justify-center">
                      <Star className="w-4 h-4 text-amber-300 fill-current" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold flex items-center gap-1">
                        {clinic.rating}
                        <Star className="w-3.5 h-3.5 text-amber-300 fill-current" />
                        Rated
                      </p>
                      <p className="text-white/70 text-xs">Google Reviews</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-6 top-4 glass rounded-xl p-3 animate-float animation-delay-200 shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-green-400/30 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-300" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">CDCP Provider</p>
                      <p className="text-white/70 text-xs">Government program</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 -mb-px">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full">
            <path d="M0 60H1440V30C1200 0 960 0 720 30C480 60 240 60 0 30V60Z" fill="#171717" />
          </svg>
        </div>
      </section>

      {/* Marquee banner */}
      <div className="bg-neutral-900 py-3 overflow-hidden border-b border-neutral-800 -mt-px" style={{ marginTop: '-2px' }}>
        <div className="flex animate-marquee-fast sm:animate-marquee whitespace-nowrap">
          {[...offers, ...offers].map((o, i) => (
            <span key={i} className="mx-8 text-neutral-300 font-medium text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
              {o.text}
            </span>
          ))}
        </div>
      </div>

      {/* Location finder */}
      <section className="py-16 sm:py-20 bg-neutral-50 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <LocationFinder compact onNavigate={onNavigate} />
        </div>
      </section>

      {/* Services section */}
      <section ref={servicesRef} className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">What We Offer</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Complete Dental Care<br />
              <span className="text-primary-600">Across Three Locations</span>
            </h2>
            <p className="text-neutral-500 text-lg max-w-xl mx-auto">
              {clinicGroupMessage} Available services may vary by location; our team will confirm the best clinic for your visit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.title}
                  onClick={() => handleServiceNav(s.hash)}
                  className={`group text-left p-6 rounded-2xl border border-neutral-100 card-hover bg-white transition-all duration-700 ${
                    servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${s.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-neutral-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{s.description}</p>
                  <div className="flex items-center gap-1 text-primary-600 text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-primary-200 transition-all hover:-translate-y-0.5"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Insurance & Coverage */}
      <section className="py-16 sm:py-20 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
            <div>
              <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">
                Insurance & Coverage
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-5">
                Direct Billing Support Across All 3 Clinics
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                Across our connected group of dental clinics, we support CDCP, ODSP, and many private dental insurance plans. Our team can help review your coverage details, explain expected next steps, and direct you to the right clinic for your visit.
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed mb-7">
                Coverage varies by plan, patient eligibility, and treatment. We will help verify details before your appointment whenever possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-primary-200 transition-all hover:-translate-y-0.5"
                >
                  Ask About Coverage
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('insurance')}
                  className="inline-flex items-center justify-center gap-2 border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 text-neutral-800 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  Explore Insurance Options
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {coverageHighlights.map((item) => (
                <div key={item.title} className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CDCP Banner */}
      <section className="bg-gradient-to-r from-neutral-900 to-neutral-800 py-16 relative overflow-hidden border-y border-neutral-700/50">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.07) 1px, transparent 1px), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">Government Program</span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Canadian Dental Care Plan (CDCP)
              </h2>
              <p className="text-white/80 text-base sm:text-lg max-w-xl">
                We are a registered CDCP provider. Eligible patients may have reduced or no out-of-pocket costs for covered services, depending on their CDCP coverage level.
              </p>
            </div>
            <div className="shrink-0 flex flex-col gap-3 items-start w-full lg:w-auto">
              {['Reduced or no out-of-pocket costs may apply', 'Households under $90,000/year may qualify', 'Direct billing can simplify paperwork'].map((item) => (
                <span key={item} className="flex items-center gap-2 text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 text-teal-300 shrink-0" />
                  {item}
                </span>
              ))}
              <button
                onClick={() => onNavigate('insurance')}
                className="mt-2 bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg"
              >
                Review Coverage Options
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyRef} className="py-16 sm:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className={`transition-all duration-700 ${whyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">Why Choose Us</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 mb-5">
                Dental Care You Can<br />
                <span className="text-primary-600">Actually Trust</span>
              </h2>
              <p className="text-neutral-500 text-lg mb-8">
                We combine advanced technology with genuine compassion to ensure every visit is comfortable and efficient.
              </p>
              <div className="space-y-5">
                {features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.label} className="flex gap-4">
                      <div className="w-11 h-11 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900">{f.label}</h4>
                        <p className="text-neutral-500 text-sm">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right - Doctor card */}
            <div className={`transition-all duration-700 delay-200 ${whyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-100">
                <img
                  src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Dr. Nazia Rehman"
                  className="w-full h-64 object-cover object-top"
                />
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display font-bold text-2xl text-neutral-900">Dr. Nazia Rehman</h3>
                      <p className="text-primary-600 font-medium">Doctor of Dental Medicine</p>
                    </div>
                    <div className="flex">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className="w-4 h-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                    Dr. Rehman brings extensive clinical experience and a patient-focused approach to family, cosmetic, and restorative dentistry.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Cosmetic Dentistry', 'Root Canal Treatment', 'Emergency Dental Care', 'Crown & Bridge Work'].map((spec) => (
                      <span key={spec} className="text-xs bg-primary-50 text-primary-700 rounded-lg px-3 py-1.5 font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            {/* Google Reviews heading */}
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <GoogleLogo className="w-7 h-7" />
              <span className="text-neutral-700 font-semibold text-base">Google Verified Testimonials</span>
            </div>
            <h2 className="text-4xl font-bold text-neutral-900">
              Clients with a Reason to Smile
            </h2>
            {/* Overall rating row */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-neutral-800 font-bold text-lg">{clinic.rating}</span>
              <RatingStars value={Number(clinic.rating)} />
              <span className="text-neutral-400 text-sm">based on {clinic.reviewCount} Google reviews</span>
            </div>
          </div>

          <div className="relative">
            {/* Sliding container */}
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${testimonialIdx * 100}%)` }}
              >
                {clinic.reviews.map((t, i) => (
                  <div key={i} className="w-full shrink-0 bg-neutral-50 border border-neutral-100 p-8 lg:p-12">
                    {/* Stars */}
                    <div className="mb-5">
                      <RatingStars value={t.rating} />
                    </div>
                    <blockquote className="text-neutral-700 text-xl leading-relaxed mb-7 italic">
                      "{t.text}"
                    </blockquote>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {t.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">{t.name}</p>
                          <p className="text-neutral-400 text-sm">{t.date}</p>
                        </div>
                      </div>
                      {/* Google Verified badge */}
                      <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-full px-3 py-1.5 shadow-sm">
                        <GoogleLogo className="w-4 h-4" />
                        <span className="text-xs font-medium text-neutral-600">Google Verified</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {clinic.reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === testimonialIdx ? 'w-6 bg-primary-600' : 'w-2 bg-neutral-300 hover:bg-neutral-400'}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-600" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 sm:py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary-400/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-teal-400/15 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready for a Healthier Smile?
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            New and emergency patients are welcome across our connected group of three clinics. We accept CDCP, ODSP, and many major insurance plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="group flex items-center justify-center gap-2 bg-white text-primary-800 hover:bg-primary-50 px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment Online
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={telHref(clinic.phone)}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" />
              Call {clinic.phone}
            </a>
          </div>
          <p className="text-primary-200/70 text-sm mt-6">
            Canadian Dental Care Plan (CDCP) Accepted | Direct Insurance Billing Available
          </p>
        </div>
      </section>
    </div>
  );
}
