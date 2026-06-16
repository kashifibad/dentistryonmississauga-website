import { CalendarCheck, ClipboardList, FileText, MapPin, ShieldCheck } from 'lucide-react';
import { allClinics, clinic } from '../config/clinic';

interface FormsPageProps {
  onNavigate: (page: string) => void;
}

export default function FormsPage({ onNavigate }: FormsPageProps) {
  const goToContact = () => {
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formOptions = [
    {
      icon: ClipboardList,
      title: 'New Patient Intake',
      description:
        'Start here if this is your first visit. Share your contact details, preferred location, coverage information, and the reason for your visit so the clinic team can follow up prepared.',
      button: 'Start New Patient Intake',
    },
    {
      icon: CalendarCheck,
      title: 'Request an Appointment',
      description:
        'Use this path if you are an existing patient or know the service you need. Send your preferred day, time, location, and visit reason for the team to confirm.',
      button: 'Request Appointment',
    },
  ];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-neutral-950 via-primary-950 to-primary-800 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Patient Forms
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-5">
            Forms for {clinic.name}
          </h1>
          <p className="text-lg sm:text-xl text-primary-50 max-w-3xl mx-auto leading-relaxed">
            Choose the form path that fits your visit. Our team will review your request and follow up to confirm details before your appointment.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {formOptions.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3">{item.title}</h2>
                  <p className="text-neutral-600 leading-relaxed mb-6">{item.description}</p>
                  <button
                    onClick={goToContact}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    {item.button}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-6 sm:p-8">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8">
              <div>
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-3">Helpful Details to Have Ready</h2>
                <p className="text-neutral-600 leading-relaxed">
                  To help the team respond quickly, include your best phone number, preferred contact method, insurance or coverage details, and any urgent symptoms or timing needs.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {allClinics.map((item) => (
                  <div key={item.id} className="rounded-xl bg-white border border-neutral-200 p-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary-600 mt-1 shrink-0" />
                      <div>
                        <p className="font-semibold text-neutral-900 text-sm">{item.name}</p>
                        <p className="text-xs text-neutral-500 mt-1">{item.address}</p>
                        <p className="text-sm font-semibold text-neutral-800 mt-3">{item.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
