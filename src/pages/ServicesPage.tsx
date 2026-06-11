import { ArrowRight, CheckCircle, Phone, Calendar } from 'lucide-react';
import { clinic, telHref } from '../config/clinic';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const services = [
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    subtitle: 'Transform Your Smile',
    image: 'https://images.pexels.com/photos/3779706/pexels-photo-3779706.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Cosmetic dentistry focuses on the appearance of your teeth, gums, and overall smile. Our cosmetic procedures are designed to enhance your confidence and give you a radiant smile you\'ll love to show off.',
    treatments: [
      { name: 'Teeth Whitening', desc: 'Professional whitening options designed around your goals and assessed by the dental team' },
      { name: 'Porcelain Veneers', desc: 'Ultra-thin ceramic shells that cover imperfections and create a perfect, natural-looking smile' },
      { name: 'Dental Bonding', desc: 'Tooth-colored resin applied to repair chips, cracks, or gaps for a seamless result' },
      { name: 'Smile Makeovers', desc: 'Comprehensive treatment plans combining multiple procedures to achieve your dream smile' },
      { name: 'Gum Contouring', desc: 'Reshaping the gum line to improve proportions and create a balanced, aesthetically pleasing smile' },
    ],
    color: 'from-sky-500 to-blue-600',
    lightBg: 'bg-sky-50',
    textColor: 'text-sky-700',
    borderColor: 'border-sky-200',
  },
  {
    id: 'restorative',
    title: 'Restorative Dentistry',
    subtitle: 'Rebuild & Strengthen',
    image: 'https://images.pexels.com/photos/18662954/pexels-photo-18662954.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Restorative dentistry repairs and replaces damaged, decayed, or missing teeth to restore both function and aesthetics. We use the latest materials and techniques to ensure lasting results.',
    treatments: [
      { name: 'Dental Crowns', desc: 'Custom-made caps that cover damaged teeth, restoring their shape, strength, and appearance' },
      { name: 'Dental Bridges', desc: 'Fixed prosthetics that replace one or more missing teeth, anchored to adjacent healthy teeth' },
      { name: 'Dentures', desc: 'Full or partial removable appliances replacing missing teeth for improved function and aesthetics' },
      { name: 'Dental Fillings', desc: 'Tooth-colored composite or amalgam fillings that repair cavities and restore tooth integrity' },
      { name: 'Inlays & Onlays', desc: 'Custom porcelain or composite restorations for larger cavities that preserve more natural tooth structure' },
    ],
    color: 'from-teal-500 to-emerald-600',
    lightBg: 'bg-teal-50',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-200',
  },
  {
    id: 'general',
    title: 'General Dentistry',
    subtitle: 'Prevention & Maintenance',
    image: 'https://images.pexels.com/photos/3845735/pexels-photo-3845735.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'General dentistry forms the foundation of good oral health. Regular visits help prevent problems before they start, saving you time, discomfort, and money in the long run.',
    treatments: [
      { name: 'Professional Cleanings', desc: 'Thorough removal of plaque and tartar that regular brushing can\'t reach, protecting against gum disease' },
      { name: 'Dental X-Rays', desc: 'Digital X-rays with minimal radiation exposure, providing detailed images of teeth and jaw structure' },
      { name: 'Oral Examinations', desc: 'Comprehensive assessments to detect cavities, gum disease, oral cancer, and other concerns early' },
      { name: 'Root Canal Treatment', desc: 'Pain-relieving treatment that removes infected pulp and saves a tooth from extraction' },
      { name: 'Tooth Extractions', desc: 'Gentle removal of severely damaged or impacted teeth, including wisdom teeth' },
    ],
    color: 'from-blue-500 to-cyan-600',
    lightBg: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    subtitle: 'Brighter, Whiter Smile',
    image: 'https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Our professional teeth whitening treatments deliver dramatically brighter results compared to over-the-counter products. We offer both in-office and take-home options to fit your lifestyle.',
    treatments: [
      { name: 'In-Office Whitening', desc: 'Professional whitening treatment planned around your goals and assessed by the dental team' },
      { name: 'Take-Home Kits', desc: 'Custom-fitted whitening trays and professional-grade gel for gradual whitening at your convenience' },
      { name: 'Free Whitening Offer', desc: 'New patients receive complimentary teeth whitening — ask us about our special offers' },
      { name: 'Sensitive Teeth Formula', desc: 'Specially formulated whitening options for patients with sensitivity concerns' },
    ],
    color: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    subtitle: 'Permanent Tooth Replacement',
    image: 'https://images.pexels.com/photos/6501853/pexels-photo-6501853.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Dental implants are a natural-looking option for replacing missing teeth. Ask our team whether implants may be right for you.',
    treatments: [
      { name: 'Single Tooth Implants', desc: 'A titanium post placed in the jawbone topped with a custom crown that matches your natural teeth' },
      { name: 'Implant-Supported Bridges', desc: 'Multiple missing teeth replaced with a bridge anchored by implants for maximum stability' },
      { name: 'All-on-4 Implants', desc: 'Full arch restoration using just four strategically placed implants, often completed in a single day' },
      { name: 'Implant Consultation', desc: 'Comprehensive evaluation including 3D imaging to determine your candidacy and customize your treatment plan' },
    ],
    color: 'from-rose-500 to-pink-600',
    lightBg: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
  },
  {
    id: 'emergency',
    title: 'Emergency Dental Care',
    subtitle: 'Here When You Need Us',
    image: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Dental emergencies don\'t follow a schedule. We welcome walk-in and emergency patients and will do our best to see you the same day to relieve pain and address urgent dental issues.',
    treatments: [
      { name: 'Severe Toothache', desc: 'Immediate assessment and pain relief for sudden or persistent dental pain' },
      { name: 'Broken or Chipped Teeth', desc: 'Urgent repair of fractured teeth to prevent further damage and restore your smile' },
      { name: 'Knocked-Out Teeth', desc: 'Emergency reimplantation — time is critical, call us immediately if you lose a tooth' },
      { name: 'Lost Fillings or Crowns', desc: 'Same-day replacement or temporary protection for lost restorations' },
      { name: 'Dental Abscess', desc: 'Urgent treatment of painful infections to prevent spread and provide relief' },
    ],
    color: 'from-[#7f1d1d] to-[#9f2020]',
    lightBg: 'bg-[#fdf2f2]',
    textColor: 'text-[#7f1d1d]',
    borderColor: 'border-[#f5c6c6]',
  },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div>
      {/* Page header */}
      <div className="hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="inline-block bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">Our Services</span>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-4">
            Comprehensive Dental Care
          </h1>
          <p className="text-primary-200 text-lg max-w-2xl mx-auto">
            From your first cleaning to a complete smile transformation — we offer everything your family needs under one roof.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40H1440V20C1200 0 960 0 720 20C480 40 240 40 0 20V40Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Quick nav */}
      <div className="bg-white border-b border-neutral-100 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto gap-0 py-0 scrollbar-hide">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="shrink-0 px-4 py-4 text-sm font-medium text-neutral-600 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-500 transition-all whitespace-nowrap"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Service sections */}
      <div className="bg-white">
        {services.map((service, idx) => (
          <section
            key={service.id}
            id={service.id}
            className={`py-20 ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center ${idx % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
                {/* Image */}
                <div className={`${idx % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20`} />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block ${service.lightBg} ${service.textColor} text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full`}>
                        {service.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${idx % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <h2 className="font-display text-4xl font-bold text-neutral-900 mb-3">{service.title}</h2>
                  <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${service.color} mb-5`} />
                  <p className="text-neutral-600 text-base leading-relaxed mb-8">{service.description}</p>

                  <div className="space-y-4 mb-8">
                    {service.treatments.map((t) => (
                      <div key={t.name} className="flex gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-neutral-800 text-sm">{t.name}: </span>
                          <span className="text-neutral-500 text-sm">{t.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => onNavigate('contact')}
                      className={`flex items-center gap-2 bg-gradient-to-r ${service.color} text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5`}
                    >
                      <Calendar className="w-4 h-4" />
                      Book a Consultation
                    </button>
                    <a
                      href={telHref(clinic.phone)}
                      className="flex items-center gap-2 border border-neutral-200 hover:border-primary-300 text-neutral-700 hover:text-primary-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Emergency banner */}
      <section className="py-12" style={{ backgroundColor: '#7f1d1d' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-white font-bold text-2xl mb-2">Dental Emergency?</h3>
          <p className="mb-5" style={{ color: 'rgba(255,220,220,0.9)' }}>We accept walk-in patients and handle emergencies promptly. Call us now.</p>
          <a
            href={telHref(clinic.phone)}
            className="inline-flex items-center gap-2 bg-white px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg transition-all hover:-translate-y-0.5"
            style={{ color: '#7f1d1d' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fdf2f2')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
          >
            <Phone className="w-5 h-5" />
            {clinic.phone}
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-200 text-lg mb-8">
            Book your appointment today and take the first step toward a healthier, more beautiful smile.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="group inline-flex items-center gap-2 bg-white text-primary-800 hover:bg-primary-50 px-8 py-4 rounded-xl font-bold text-base shadow-xl transition-all hover:-translate-y-0.5"
          >
            Book Your Appointment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
