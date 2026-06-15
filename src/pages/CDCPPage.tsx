import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle,
  ClipboardCheck,
  CreditCard,
  FileText,
  HeartHandshake,
  Phone,
  Shield,
} from 'lucide-react';
import { clinic, clinicGroupMessage, telHref } from '../config/clinic';

interface InsurancePageProps {
  onNavigate: (page: string) => void;
}

const privateInsurancePlans = [
  'Canada Life',
  'Sun Life',
  'Manulife',
  'GreenShield',
  'Blue Cross',
  'Desjardins',
  'Industrial Alliance',
  'Equitable',
  'Beneva',
  'ClaimSecure',
  'TELUS Health eClaims',
  'Pacific Blue Cross',
];

const coverageCards = [
  {
    id: 'cdcp',
    icon: Shield,
    title: 'Canadian Dental Care Plan (CDCP)',
    subtitle: 'Government dental coverage for eligible Canadian residents',
    body: `${clinic.name} welcomes eligible CDCP patients and can help with direct billing for covered services. Coverage can include diagnostic, preventive, restorative, endodontic, periodontal, crowns, dentures, oral surgery, and sedation categories depending on the patient's approval and program rules.`,
    highlights: ['Registered CDCP provider support', 'Direct billing help where available', 'Coverage questions before your visit'],
  },
  {
    id: 'odsp',
    icon: HeartHandshake,
    title: 'ODSP Dental Benefits',
    subtitle: 'Support for eligible Ontario Disability Support Program patients',
    body: 'If you receive ODSP dental benefits, our team can review your available documentation and help confirm what may be covered before treatment begins. Bring your ODSP dental card, benefit letter, or coverage details to your appointment.',
    highlights: ['ODSP coverage review', 'Claim and billing guidance', 'Clear next steps before treatment'],
  },
  {
    id: 'private-insurance',
    icon: CreditCard,
    title: 'Private Dental Insurance',
    subtitle: 'Employer, individual, and family dental benefit plans',
    body: 'We accept many major dental insurance plans and can submit many claims directly to reduce paperwork for patients. Coverage varies by plan, so our team can help review your plan details, estimate patient responsibility, and request a pre-determination when needed.',
    highlights: ['Many major plans accepted', 'Direct insurance billing', 'Pre-determination support when useful'],
  },
];

const bringItems = [
  'Insurance card or digital benefits card',
  'Plan member, certificate, or group number',
  'Plan holder name and date of birth',
  'Employer or benefits administrator name if available',
  'CDCP, ODSP, or government benefit letter/card',
  'Any estimate or treatment note you want us to review',
];

export default function InsurancePage({ onNavigate }: InsurancePageProps) {
  return (
    <div>
      <div className="hero-gradient py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Insurance & Direct Billing
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-4">
              Dental Insurance, CDCP & ODSP Support
            </h1>
            <p className="text-primary-100 text-lg mb-8 max-w-3xl">
              {clinicGroupMessage} We help patients understand CDCP, ODSP, and many private dental insurance plans so booking a dental visit feels simpler and clearer.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-2 bg-white text-primary-800 hover:bg-primary-50 px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-all hover:-translate-y-0.5"
              >
                Ask About Coverage
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={telHref(clinic.phone)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                Call {clinic.phone}
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40H1440V20C1200 0 960 0 720 20C480 40 240 40 0 20V40Z" fill="white" />
          </svg>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Plans Accepted
            </span>
            <h2 className="font-display text-4xl font-bold text-neutral-900 mb-4">
              Coverage Help Across Our Three Clinics
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Dental coverage can be confusing. Our team can help you understand what information to bring, whether direct billing may be available, and which clinic is best for your appointment.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {coverageCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.id}
                  id={card.id}
                  className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 scroll-mt-28"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">{card.title}</h3>
                  <p className="text-primary-700 text-sm font-semibold mb-4">{card.subtitle}</p>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-5">{card.body}</p>
                  <div className="space-y-2">
                    {card.highlights.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                        <CheckCircle className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
            <div>
              <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">
                Private Insurance
              </span>
              <h2 className="font-display text-4xl font-bold text-neutral-900 mb-5">
                Many Major Insurance Plans Accepted
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-5">
                Patients often ask whether we accept their dental insurance. In most cases, our team can work with major Canadian dental benefit providers and submit claims electronically or directly where the plan allows it.
              </p>
              <div className="bg-white border border-neutral-100 rounded-2xl p-5">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    Insurance acceptance does not guarantee payment. Coverage, limits, deductibles, frequencies, and patient portions vary by plan. For larger treatment plans, a pre-determination may be recommended.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <Building2 className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-neutral-900">Common Dental Benefit Providers</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {privateInsurancePlans.map((plan) => (
                  <div
                    key={plan}
                    className="rounded-xl border border-primary-100 bg-primary-50/60 text-primary-800 px-4 py-3 text-sm font-semibold text-center"
                  >
                    {plan}
                  </div>
                ))}
              </div>
              <p className="text-neutral-500 text-xs mt-5">
                Do not see your provider listed? Share your plan details with us and we can help confirm next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="bg-neutral-50 rounded-3xl border border-neutral-100 p-8">
              <div className="flex items-center gap-3 mb-5">
                <ClipboardCheck className="w-6 h-6 text-teal-600" />
                <h2 className="font-display text-3xl font-bold text-neutral-900">What to Bring</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {bringItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                    <CheckCircle className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">
                How We Help
              </span>
              <h2 className="font-display text-4xl font-bold text-neutral-900 mb-5">
                Clear Answers Before Your Visit
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Review your coverage details',
                    desc: 'Tell us whether you have CDCP, ODSP, employer benefits, private insurance, or no insurance, and we will guide the next step.',
                  },
                  {
                    title: 'Submit many claims directly',
                    desc: 'Where your plan allows it, we can help reduce paperwork by submitting claims directly or electronically.',
                  },
                  {
                    title: 'Confirm the right clinic',
                    desc: 'If a specific service, coverage question, or location matters, our team can help direct you to the best clinic for your visit.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-teal-600 to-primary-700 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Have Questions About Your Dental Coverage?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Share your plan details in the appointment request form or call us. We will help you understand the next step before your visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center justify-center gap-2 bg-white text-primary-800 hover:bg-primary-50 px-8 py-4 rounded-xl font-bold text-base shadow-xl transition-all hover:-translate-y-0.5"
            >
              Request Appointment
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={telHref(clinic.phone)}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all"
            >
              <Phone className="w-5 h-5" />
              Call {clinic.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
