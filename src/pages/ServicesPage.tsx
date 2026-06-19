import { ArrowRight, Calendar, CheckCircle, Phone } from 'lucide-react';
import { clinic, clinicGroupMessage, telHref } from '../config/clinic';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const services = [
  {
    id: 'preventive',
    title: 'Preventive & Family Dentistry',
    subtitle: 'Care for Every Age',
    image: 'https://images.pexels.com/photos/3845735/pexels-photo-3845735.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Preventive dental care helps families stay ahead of tooth decay, gum concerns, and unexpected dental problems. Our connected clinic group supports children, adults, and seniors with routine care close to home.',
    treatments: [
      { name: 'Dental exams and cleanings', desc: 'Routine checkups, professional cleanings, and personalized oral hygiene guidance' },
      { name: 'Digital X-rays', desc: 'Diagnostic imaging used when clinically appropriate to help assess teeth and supporting structures' },
      { name: 'Fluoride and sealants', desc: 'Preventive options that may be recommended for children, teens, or cavity-prone patients' },
      { name: 'Family dentistry', desc: 'Friendly care for kids, adults, parents, and seniors across our three clinic locations' },
    ],
    color: 'from-sky-500 to-blue-600',
    lightBg: 'bg-sky-50',
    textColor: 'text-sky-700',
  },
  {
    id: 'emergency',
    title: 'Emergency Dental Care',
    subtitle: 'Urgent Dental Support',
    image: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Dental pain and urgent concerns can happen suddenly. Our clinics treat tooth pain, swelling, broken teeth, lost restorations, and possible infection concerns as high-priority requests. Call 911 for trouble breathing or swallowing, uncontrolled bleeding, major trauma, chest pain, fainting, or swelling spreading toward the throat, neck, or eye.',
    treatments: [
      { name: 'Tooth pain and swelling', desc: 'High-priority assessment requests for sudden, severe, or persistent dental pain' },
      { name: 'Possible infection or abscess concerns', desc: 'Prompt callback guidance for swelling, bad taste, pus, feverish feeling, or worsening pain' },
      { name: 'Chipped, broken, or knocked-out teeth', desc: 'Urgent next-step guidance and care options where appropriate' },
      { name: 'Lost crowns or fillings', desc: 'Support for loose, broken, or missing restorations' },
      { name: 'Emergency red flags', desc: 'Call 911 for trouble breathing or swallowing, uncontrolled bleeding, major trauma, fainting, chest pain, or swelling spreading to the neck, throat, or eye' },
    ],
    color: 'from-red-700 to-red-800',
    lightBg: 'bg-red-50',
    textColor: 'text-red-700',
  },
  {
    id: 'restorative',
    title: 'Restorative Dentistry',
    subtitle: 'Repair & Rebuild',
    image: 'https://images.pexels.com/photos/18662954/pexels-photo-18662954.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Restorative dentistry helps repair damaged teeth, replace missing teeth, and restore chewing comfort. Our team can confirm the right clinic and treatment path for your needs.',
    treatments: [
      { name: 'Fillings', desc: 'Treatment for cavities and minor tooth damage using materials selected for your case' },
      { name: 'Crowns and bridges', desc: 'Restorations used to strengthen damaged teeth or replace missing teeth where appropriate' },
      { name: 'Inlays and onlays', desc: 'Conservative restorative options for larger areas of tooth structure loss' },
      { name: 'Dentures and partial dentures', desc: 'Removable tooth replacement options for missing teeth' },
    ],
    color: 'from-teal-500 to-emerald-600',
    lightBg: 'bg-teal-50',
    textColor: 'text-teal-700',
  },
  {
    id: 'root-canal',
    title: 'Root Canal Treatment & Tooth Pain Relief',
    subtitle: 'Save Natural Teeth',
    image: 'https://images.pexels.com/photos/3779697/pexels-photo-3779697.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'When a tooth becomes infected or painful, root canal treatment may help relieve discomfort and preserve the natural tooth. The dental team will assess your symptoms and explain your options.',
    treatments: [
      { name: 'Tooth pain assessment', desc: 'Clinical evaluation for sensitivity, infection, swelling, or persistent discomfort' },
      { name: 'Root canal treatment', desc: 'Treatment to remove infected inner tissue and protect the tooth when appropriate' },
      { name: 'Post-treatment restoration', desc: 'Follow-up restorative care such as a filling or crown, depending on the tooth' },
    ],
    color: 'from-blue-500 to-cyan-600',
    lightBg: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    subtitle: 'Smile Confidence',
    image: 'https://images.pexels.com/photos/3779706/pexels-photo-3779706.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Cosmetic dentistry focuses on improving the look of your smile while keeping your oral health in mind. Ask our team which cosmetic options are available and appropriate at your preferred location.',
    treatments: [
      { name: 'Teeth whitening', desc: 'Professional whitening guidance and options based on your smile goals' },
      { name: 'Dental bonding', desc: 'Tooth-colored resin used to improve small chips, gaps, or uneven edges' },
      { name: 'Veneer consultations', desc: 'Smile-enhancing porcelain or composite options where suitable' },
      { name: 'Smile consultations', desc: 'A practical conversation about goals, timing, budget, and treatment options' },
    ],
    color: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50',
    textColor: 'text-amber-700',
  },
  {
    id: 'implants',
    title: 'Dental Implants & Missing Teeth',
    subtitle: 'Replace Missing Teeth',
    image: 'https://images.pexels.com/photos/6501853/pexels-photo-6501853.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Missing teeth can affect chewing, confidence, and long-term oral health. Our team can discuss replacement options, including implant-supported solutions where appropriate.',
    treatments: [
      { name: 'Missing tooth consultations', desc: 'Review your goals, health history, and options for replacing one or more teeth' },
      { name: 'Implant-supported options', desc: 'Implant consultations and planning where clinically appropriate' },
      { name: 'Bridges or dentures', desc: 'Alternative tooth replacement options depending on your needs and preferences' },
    ],
    color: 'from-rose-500 to-pink-600',
    lightBg: 'bg-rose-50',
    textColor: 'text-rose-700',
  },
  {
    id: 'extractions',
    title: 'Extractions & Oral Surgery Consults',
    subtitle: 'When Removal Is Needed',
    image: 'https://images.pexels.com/photos/6812458/pexels-photo-6812458.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'When a tooth cannot be saved or is causing problems, an extraction may be recommended. The team will explain your options and help plan the next step.',
    treatments: [
      { name: 'Simple extractions', desc: 'Removal of teeth when clinically necessary' },
      { name: 'Wisdom tooth concerns', desc: 'Assessment for painful, crowded, or impacted wisdom teeth' },
      { name: 'Oral surgery consultations', desc: 'Guidance on next steps, referrals, or location-specific availability' },
    ],
    color: 'from-violet-500 to-purple-600',
    lightBg: 'bg-violet-50',
    textColor: 'text-violet-700',
  },
  {
    id: 'gum-health',
    title: 'Gum Health / Periodontal Care',
    subtitle: 'Protect Your Foundation',
    image: 'https://images.pexels.com/photos/6627572/pexels-photo-6627572.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Healthy gums support healthy teeth. If you notice bleeding, tenderness, bad breath, or gum recession, our team can help assess your gum health and recommend next steps.',
    treatments: [
      { name: 'Gum health assessments', desc: 'Evaluation for bleeding gums, inflammation, pocketing, or recession' },
      { name: 'Deep cleaning guidance', desc: 'Scaling or periodontal maintenance may be recommended depending on clinical findings' },
      { name: 'Home care planning', desc: 'Practical guidance to support healthier gums between visits' },
    ],
    color: 'from-emerald-500 to-green-600',
    lightBg: 'bg-emerald-50',
    textColor: 'text-emerald-700',
  },
  {
    id: 'clear-aligners',
    title: 'Clear Aligner / Orthodontic Consultations',
    subtitle: 'Straighter Smile Options',
    image: 'https://images.pexels.com/photos/6528907/pexels-photo-6528907.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'If you are interested in straighter teeth, ask our team about clear aligner or orthodontic options. Availability and suitability may vary by case and location.',
    treatments: [
      { name: 'Clear aligner consultations', desc: 'A conversation about whether aligner treatment may be suitable for your goals' },
      { name: 'Bite and spacing concerns', desc: 'Assessment for crowding, gaps, or bite-related questions' },
      { name: 'Treatment planning', desc: 'The team can confirm available options and whether a referral is recommended' },
    ],
    color: 'from-indigo-500 to-blue-600',
    lightBg: 'bg-indigo-50',
    textColor: 'text-indigo-700',
  },
  {
    id: 'guards',
    title: 'Guards & Dental Appliances',
    subtitle: 'Protect Your Teeth',
    image: 'https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Dental appliances may help protect teeth from grinding, sports impact, or other concerns. The team can confirm what is available and appropriate for your case.',
    treatments: [
      { name: 'Night guards', desc: 'Custom options may be recommended for grinding or clenching' },
      { name: 'Sports guards', desc: 'Protective appliances for sports and active lifestyles' },
      { name: 'Snoring or grinding appliances', desc: 'Ask the clinic what appliance options are available and clinically appropriate' },
    ],
    color: 'from-cyan-500 to-sky-600',
    lightBg: 'bg-cyan-50',
    textColor: 'text-cyan-700',
  },
  {
    id: 'coverage',
    title: 'CDCP, IFHP, ODSP, Insurance & Direct Billing',
    subtitle: 'Coverage Support',
    image: 'https://images.pexels.com/photos/7088526/pexels-photo-7088526.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Dental coverage can be confusing. Our team helps patients understand CDCP, IFHP/refugee health coverage, ODSP, insurance, and direct billing options so the appointment process feels simpler.',
    treatments: [
      { name: 'CDCP patients welcome', desc: 'We help eligible patients navigate covered services and next steps' },
      { name: 'IFHP / refugee coverage support', desc: 'Eligible patients can bring IFHP documentation so our team can help review coverage questions' },
      { name: 'Direct insurance billing', desc: 'We can bill many insurance plans directly to reduce paperwork' },
      { name: 'ODSP support', desc: 'Ask our team about ODSP-related dental coverage and documentation' },
      { name: 'Location guidance', desc: 'We can help you choose the clinic that best fits your location and care needs' },
    ],
    color: 'from-slate-700 to-slate-900',
    lightBg: 'bg-slate-50',
    textColor: 'text-slate-700',
  },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div>
      <div className="hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="inline-block bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">Our Services</span>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-4">
            Dental Care Across Three Clinics
          </h1>
          <p className="text-primary-200 text-lg max-w-3xl mx-auto">
            {clinicGroupMessage} Available services may vary by location. If you need a specific treatment, our team will confirm the best clinic for your visit.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40H1440V20C1200 0 960 0 720 20C480 40 240 40 0 20V40Z" fill="white" />
          </svg>
        </div>
      </div>

      <div className="bg-white border-b border-neutral-100 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto gap-0 py-0 scrollbar-hide">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="shrink-0 px-4 py-4 text-sm font-medium text-neutral-600 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-500 transition-all whitespace-nowrap"
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center ${index % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={`${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
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

                <div className={`${index % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <h2 className="font-display text-4xl font-bold text-neutral-900 mb-3">{service.title}</h2>
                  <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${service.color} mb-5`} />
                  <p className="text-neutral-600 text-base leading-relaxed mb-8">{service.description}</p>

                  <div className="space-y-4 mb-8">
                    {service.treatments.map((treatment) => (
                      <div key={treatment.name} className="flex gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-neutral-800 text-sm">{treatment.name}: </span>
                          <span className="text-neutral-500 text-sm">{treatment.desc}</span>
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

      <section className="py-12" style={{ backgroundColor: '#7f1d1d' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-white font-bold text-2xl mb-2">Dental Emergency?</h3>
          <p className="mb-5" style={{ color: 'rgba(255,220,220,0.9)' }}>
            We treat dental pain, swelling, broken teeth, lost crowns or fillings, and possible infection concerns as high-priority requests. Call 911 for trouble breathing or swallowing, uncontrolled bleeding, major trauma, chest pain, fainting, or swelling spreading toward the throat, neck, or eye.
          </p>
          <a
            href={telHref(clinic.phone)}
            className="inline-flex items-center gap-2 bg-white px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg transition-all hover:-translate-y-0.5"
            style={{ color: '#7f1d1d' }}
          >
            <Phone className="w-5 h-5" />
            {clinic.phone}
          </a>
        </div>
      </section>

      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Choose the Right Clinic for Your Visit
          </h2>
          <p className="text-primary-200 text-lg mb-8">
            Not sure which location is closest? Our Contact page can open Google Maps directions for all three clinics from your address or postal code.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="group inline-flex items-center gap-2 bg-white text-primary-800 hover:bg-primary-50 px-8 py-4 rounded-xl font-bold text-base shadow-xl transition-all hover:-translate-y-0.5"
          >
            Find a Location
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
