import { Award, Heart, Users, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { clinic } from '../config/clinic';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const values = [
  { icon: Heart, title: 'Compassionate Care', desc: 'Every patient is treated with genuine care, empathy, and respect. Your comfort is our highest priority.' },
  { icon: Award, title: 'Clinical Excellence', desc: 'Continuous education and advanced training ensure we deliver the highest standard of dental care.' },
  { icon: Users, title: 'Family-Centered', desc: 'We\'re proud to care for patients of all ages — from children\'s first visit to seniors\' ongoing care.' },
  { icon: Star, title: 'Honest & Transparent', desc: 'We provide clear treatment plans and honest recommendations, putting your long-term oral health first.' },
];

const credentials = [
  'Member of Royal College of Dental Surgeons of Ontario',
  'Advanced Training in Cosmetic & Restorative Dentistry',
  'CDCP (Canadian Dental Care Plan) Registered Provider',
  'Extensive Clinical Experience',
  'Continuous Professional Development & Education',
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div>
      {/* Page header */}
      <div className="hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">About Us</span>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-4">
            Meet Our Team
          </h1>
          <p className="text-primary-200 text-lg max-w-2xl mx-auto">
            Dedicated professionals committed to transforming your smile and improving your oral health with expertise and compassion.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40H1440V20C1200 0 960 0 720 20C480 40 240 40 0 20V40Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Clinic story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Story</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 mb-5">
                {clinic.shortName}'s Trusted<br />
                <span className="text-primary-600">Dental Clinic</span>
              </h2>
              <p className="text-neutral-600 text-base leading-relaxed mb-5">
                {clinic.name} was built around a clear mission: to provide professional, compassionate dental care to the communities we serve. We believe every patient deserves exceptional oral healthcare in a warm, welcoming environment.
              </p>
              <p className="text-neutral-600 text-base leading-relaxed mb-8">
                Our clinic is equipped with the latest dental technology to ensure the most accurate diagnoses and comfortable treatment experiences. From digital X-rays to modern restorative materials, we invest in the tools that make a real difference in your care.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: clinic.yearsExperience, label: 'Years Experience' },
                  { value: clinic.patientCount, label: 'Happy Patients' },
                  { value: '3', label: 'Locations' },
                  { value: `${clinic.rating}★`, label: 'Google Rating' },
                ].map((s) => (
                  <div key={s.label} className="bg-primary-50 rounded-2xl p-5 text-center">
                    <div className="text-3xl font-bold font-display text-primary-700">{s.value}</div>
                    <div className="text-neutral-500 text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern dental clinic"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-neutral-100">
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="font-semibold text-neutral-900 text-sm">{clinic.rating} on Google</p>
                <p className="text-neutral-400 text-xs">Verified Reviews</p>
              </div>
              <div className="absolute -top-6 -left-6 bg-primary-600 rounded-2xl shadow-xl p-5 text-white">
                <div className="text-2xl font-bold font-display">CDCP</div>
                <p className="text-primary-200 text-xs">Registered Provider</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Values</span>
            <h2 className="font-display text-4xl font-bold text-neutral-900">What Drives Us Every Day</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-2xl p-6 border border-neutral-100 card-hover text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{v.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctor profile */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">Meet the Doctor</span>
            <h2 className="font-display text-4xl font-bold text-neutral-900">Expert Care with a Personal Touch</h2>
          </div>

          <div className="bg-gradient-to-br from-neutral-50 to-primary-50 rounded-3xl overflow-hidden border border-primary-100">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Doctor image */}
              <div className="lg:col-span-2">
                <img
                  src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Dr. Nazia Rehman"
                  className="w-full h-full object-cover object-top min-h-[400px]"
                />
              </div>

              {/* Doctor info */}
              <div className="lg:col-span-3 p-10 lg:p-14 flex flex-col justify-center">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 text-amber-400 fill-current" />)}
                </div>
                <h3 className="font-display text-4xl font-bold text-neutral-900 mb-1">Dr. Nazia Rehman</h3>
                <p className="text-primary-600 font-semibold text-lg mb-5">Doctor of Dental Medicine — Lead Dentist</p>
                <p className="text-neutral-600 leading-relaxed mb-5">
                  Dr. Rehman is proficient in all aspects of dentistry and has a particular interest in cosmetic dentistry, root canal treatments, wisdom teeth extractions, and crown & bridge work.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-7">
                  She is passionate about helping patients achieve a functional and aesthetic smile, and takes a gentle, patient-focused approach that has earned her a loyal following of patients across Mississauga and Brampton.
                </p>
                <div className="space-y-2.5 mb-7">
                  {credentials.map((c) => (
                    <div key={c} className="flex gap-2.5 items-start">
                      <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                      <span className="text-neutral-700 text-sm">{c}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="self-start flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
                >
                  Book with Dr. Rehman
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">Modern Technology</span>
              <h2 className="font-display text-4xl font-bold text-neutral-900 mb-5">
                State-of-the-Art<br />
                <span className="text-primary-600">Dental Equipment</span>
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-8">
                We invest in the latest dental technology to provide you with the most accurate, comfortable, and effective treatment possible.
              </p>
              <div className="space-y-4">
                {[
                  { name: 'Digital X-Rays', desc: 'Up to 90% less radiation than traditional X-rays with superior image quality' },
                  { name: 'Intraoral Cameras', desc: 'See exactly what we see — clear images for better understanding of your treatment' },
                  { name: 'Sterilization Protocols', desc: 'Hospital-grade sterilization and infection control for your safety' },
                  { name: 'Comfortable Operatories', desc: 'Modern, fully-equipped treatment rooms designed for your comfort' },
                ].map((t) => (
                  <div key={t.name} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-neutral-800 text-sm">{t.name}: </span>
                      <span className="text-neutral-500 text-sm">{t.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/6812561/pexels-photo-6812561.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern dental equipment"
                className="w-full h-80 object-cover rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 hero-gradient">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Come Meet the Team
          </h2>
          <p className="text-primary-200 mb-8">
            We'd love to welcome you to our clinic. Book your first visit today.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="group inline-flex items-center gap-2 bg-white text-primary-800 hover:bg-primary-50 px-8 py-4 rounded-xl font-bold text-base shadow-xl transition-all hover:-translate-y-0.5"
          >
            Book Appointment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
