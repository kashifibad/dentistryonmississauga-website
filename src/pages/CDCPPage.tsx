import { CheckCircle, ArrowRight, Phone, AlertCircle, DollarSign, FileText, Users } from 'lucide-react';
import { clinic, telHref } from '../config/clinic';

interface CDCPPageProps {
  onNavigate: (page: string) => void;
}

export default function CDCPPage({ onNavigate }: CDCPPageProps) {
  return (
    <div>
      {/* Header */}
      <div className="hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">Government Program</span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-4">
              Canadian Dental Care Plan
            </h1>
            <p className="text-primary-200 text-lg mb-8">
              The federal government's Canadian Dental Care Plan (CDCP) helps make dental care more accessible for eligible Canadians. {clinic.name} is a registered CDCP provider.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-2 bg-white text-primary-800 hover:bg-primary-50 px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-all hover:-translate-y-0.5"
              >
                Check Eligibility
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

      {/* What is CDCP */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">About the Program</span>
              <h2 className="font-display text-4xl font-bold text-neutral-900 mb-5">
                What is the CDCP?
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-5">
                The Canadian Dental Care Plan (CDCP) is a federal government program designed to help uninsured Canadians access dental care. The program provides coverage for a wide range of essential dental services for eligible individuals and families.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                As a registered CDCP provider, {clinic.name} can bill the program directly on your behalf. Eligible patients may have reduced or no out-of-pocket costs for covered services, depending on their coverage level.
              </p>
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-teal-900">We are a Registered CDCP Provider</p>
                    <p className="text-teal-700 text-sm mt-1">We accept CDCP patients and can help with direct billing for eligible covered services.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: DollarSign, title: 'Reduced Costs May Apply', desc: 'Eligible patients may have reduced or no out-of-pocket costs for covered services', color: 'bg-teal-50 text-teal-600' },
                { icon: Users, title: 'Families Qualify', desc: 'Household income under $90,000/year may be eligible', color: 'bg-sky-50 text-sky-600' },
                { icon: FileText, title: 'Direct Billing', desc: 'We bill the program directly to simplify paperwork', color: 'bg-blue-50 text-blue-600' },
                { icon: CheckCircle, title: 'Wide Coverage', desc: 'Cleanings, fillings, extractions, root canals and more', color: 'bg-primary-50 text-primary-600' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl ${item.color.split(' ')[0]} flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${item.color.split(' ')[1]}`} />
                    </div>
                    <h4 className="font-semibold text-neutral-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-neutral-500 text-xs">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">Eligibility</span>
            <h2 className="font-display text-4xl font-bold text-neutral-900 mb-4">Who Qualifies for CDCP?</h2>
            <p className="text-neutral-500">You may be eligible for the Canadian Dental Care Plan if you meet all of the following criteria:</p>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-neutral-100">
              <h3 className="font-semibold text-neutral-900 mb-5">Eligibility Requirements</h3>
              <div className="space-y-4">
                {[
                  { check: true, text: 'You are a Canadian resident with a valid social insurance number (SIN)' },
                  { check: true, text: 'You filed a tax return in the previous year' },
                  { check: true, text: 'You do not have access to dental benefits through employment, a pension, or a government-sponsored program' },
                  { check: true, text: 'Your adjusted family net income is under $90,000 per year' },
                  { check: null, text: 'Note: Coverage levels depend on your income bracket (full, 60%, or 40%)' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    {item.check === true && <CheckCircle className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />}
                    {item.check === null && <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}
                    <span className={`text-sm ${item.check === null ? 'text-amber-700 font-medium' : 'text-neutral-700'}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8">
              <h3 className="font-semibold text-neutral-900 mb-5">Income Thresholds & Coverage</h3>
              <div className="space-y-3">
                {[
                  { income: 'Under $70,000', coverage: '100% coverage', color: 'bg-teal-50 border-teal-200 text-teal-800' },
                  { income: '$70,000 – $79,999', coverage: '60% coverage', color: 'bg-sky-50 border-sky-200 text-sky-800' },
                  { income: '$80,000 – $89,999', coverage: '40% coverage', color: 'bg-blue-50 border-blue-200 text-blue-800' },
                  { income: '$90,000 and above', coverage: 'Not eligible', color: 'bg-neutral-50 border-neutral-200 text-neutral-500' },
                ].map((row) => (
                  <div key={row.income} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${row.color}`}>
                    <span className="font-medium text-sm">Annual household income: {row.income}</span>
                    <span className="font-bold text-sm">{row.coverage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Covered services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">Coverage Details</span>
            <h2 className="font-display text-4xl font-bold text-neutral-900">Services Covered by CDCP</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Preventive Care', items: ['Dental cleanings & polishing', 'Fluoride treatments', 'X-rays and examinations', 'Sealants for children'] },
              { title: 'Restorative Care', items: ['Dental fillings (cavity repair)', 'Root canal treatment', 'Tooth extractions', 'Emergency dental care'] },
              { title: 'Other Services', items: ['Dentures (full and partial)', 'Scaling for gum disease', 'Sports mouthguards (children)', 'Oral surgery consultations'] },
            ].map((cat) => (
              <div key={cat.title} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                <h4 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-500 inline-block" />
                  {cat.title}
                </h4>
                <ul className="space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex gap-2 items-start text-sm text-neutral-600">
                      <CheckCircle className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 max-w-3xl mx-auto">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm">
                <strong>Note:</strong> Coverage details and eligible procedures may be updated by the government. Contact us or visit{' '}
                <a href="https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                  Canada.ca
                </a>{' '}
                for the most current information on covered services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">Getting Started</span>
            <h2 className="font-display text-4xl font-bold text-neutral-900">How to Use Your CDCP Benefits</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '01',
                title: 'Verify Your Eligibility',
                desc: 'Visit Canada.ca or call Service Canada at 1-833-537-4342 to confirm your CDCP eligibility and coverage level. You can also ask us to help you verify.',
              },
              {
                step: '02',
                title: 'Register for the CDCP',
                desc: 'If eligible, Sun Life (the CDCP administrator) will send you a welcome letter with instructions to register online, by phone, or through a Service Canada agent.',
              },
              {
                step: '03',
                title: 'Book an Appointment with Us',
                desc: `Call ${clinic.name} at ${clinic.phone} or book online. Let us know you are a CDCP patient and we can help guide the next steps.`,
              },
              {
                step: '04',
                title: 'We Bill Directly',
                desc: 'Bring your CDCP member card to your appointment. We submit claims directly to Sun Life to help simplify the process.',
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-5 bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white font-bold text-sm flex items-center justify-center shrink-0 font-display">
                  {s.step}
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">{s.title}</h4>
                  <p className="text-neutral-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-primary-700 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to Use Your CDCP Benefits?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Reduced or no out-of-pocket costs may apply for eligible covered services. Book your appointment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center justify-center gap-2 bg-white text-primary-800 hover:bg-primary-50 px-8 py-4 rounded-xl font-bold text-base shadow-xl transition-all hover:-translate-y-0.5"
            >
              Book Appointment
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
