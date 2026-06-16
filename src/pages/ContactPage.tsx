import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Calendar, Shield } from 'lucide-react';
import { clinic, clinics, clinicGroupMessage, telHref } from '../config/clinic';
import LocationFinder from '../components/LocationFinder';

const services = [
  'General Checkup & Cleaning',
  'Preventive & Family Dentistry',
  'Emergency Dental Care',
  'Tooth Pain / Root Canal Consultation',
  'Cosmetic Dentistry',
  'Teeth Whitening',
  'Dental Implants / Missing Teeth Consultation',
  'Restorative Dentistry',
  'Crowns, Bridges, or Dentures',
  'Extractions / Oral Surgery Consultation',
  'Gum Health / Periodontal Care',
  'Clear Aligner / Orthodontic Consultation',
  'Night Guard / Sports Guard / Dental Appliance',
  'Insurance / Coverage Consultation',
  'Other',
];

const coverageTypes = [
  'CDCP (Canadian Dental Care Plan)',
  'ODSP',
  'Private Dental Insurance',
  'Employer Benefits',
  'No Insurance (Self-pay)',
  'Not sure / Need help confirming',
  'Other',
];

type ContactFormMode = 'default' | 'new-patient' | 'appointment';

const getContactFormMode = (): ContactFormMode => {
  const mode = new URLSearchParams(window.location.search).get('form');
  return mode === 'new-patient' || mode === 'appointment' ? mode : 'default';
};

const formModeContent = {
  default: {
    badge: 'Appointment Request',
    title: 'Request an Appointment',
    description: "Fill out the form and we'll contact you to confirm your appointment.",
  },
  'new-patient': {
    badge: 'New Patient Intake',
    title: 'Start Your New Patient Intake',
    description: 'Tell us about your first visit, preferred location, coverage details, and dental concern so our team can follow up prepared.',
  },
  appointment: {
    badge: 'Appointment Request',
    title: 'Request an Appointment',
    description: 'Send your preferred location, contact details, service request, and timing so our team can confirm the appointment.',
  },
};

const appointmentFormEndpoint = (import.meta.env.VITE_APPOINTMENT_FORM_ENDPOINT as string | undefined)?.trim();
const web3FormsAccessKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined)?.trim();
const web3FormsEndpoint = 'https://api.web3forms.com/submit';

export default function ContactPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [formMode] = useState<ContactFormMode>(() => getContactFormMode());
  const activeFormContent = formModeContent[formMode];
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: clinic.name,
    preferredContact: '',
    urgency: '',
    service: '',
    date: '',
    time: '',
    message: '',
    coverageType: '',
    insuranceProvider: '',
    policyHolder: '',
    coverageNotes: '',
    newPatient: formMode === 'new-patient' ? 'yes' : formMode === 'appointment' ? 'no' : '',
    appointmentFor: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError('');

    const body = [
      `Clinic: ${clinic.name}`,
      `Preferred location: ${form.location || clinic.name}`,
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Preferred contact method: ${form.preferredContact || 'Not specified'}`,
      `New patient: ${form.newPatient || 'Not specified'}`,
      `Appointment for: ${form.appointmentFor || 'Not specified'}`,
      `Urgency: ${form.urgency || 'Not specified'}`,
      '',
      'Coverage details:',
      `Coverage type: ${form.coverageType || 'Not specified'}`,
      `Insurance provider / plan: ${form.insuranceProvider || 'Not specified'}`,
      `Policy holder relationship: ${form.policyHolder || 'Not specified'}`,
      `Coverage notes: ${form.coverageNotes || 'None provided'}`,
      '',
      'Appointment details:',
      `Service: ${form.service}`,
      `Preferred date: ${form.date || 'Not specified'}`,
      `Preferred time: ${form.time || 'Not specified'}`,
      '',
      'Additional notes:',
      form.message || 'None provided',
    ].join('\n');

    const subject = `Appointment request - ${clinic.name}`;

    try {
      if (web3FormsAccessKey) {
        const patientName = `${form.firstName} ${form.lastName}`.trim();
        const response = await fetch(web3FormsEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3FormsAccessKey,
            subject,
            from_name: clinic.name,
            name: patientName,
            email: form.email,
            replyto: form.email,
            phone: form.phone,
            botcheck: '',
            clinic: clinic.name,
            preferred_location: form.location || clinic.name,
            preferred_contact_method: form.preferredContact || 'Not specified',
            new_patient: form.newPatient || 'Not specified',
            appointment_for: form.appointmentFor || 'Not specified',
            urgency: form.urgency || 'Not specified',
            service: form.service,
            preferred_date: form.date || 'Not specified',
            preferred_time: form.time || 'Not specified',
            coverage_type: form.coverageType || 'Not specified',
            insurance_provider_or_plan: form.insuranceProvider || 'Not specified',
            policy_holder_relationship: form.policyHolder || 'Not specified',
            coverage_notes: form.coverageNotes || 'None provided',
            additional_notes: form.message || 'None provided',
            message: body,
          }),
        });

        const result = await response.json().catch(() => null);

        if (!response.ok || result?.success === false) {
          throw new Error(result?.message || 'Appointment request failed');
        }
      } else if (appointmentFormEndpoint) {
        const response = await fetch(appointmentFormEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clinicId: clinic.id,
            clinicName: clinic.name,
            clinicEmail: clinic.email,
            submittedAt: new Date().toISOString(),
            subject,
            message: body,
            patient: {
              firstName: form.firstName,
              lastName: form.lastName,
              email: form.email,
              phone: form.phone,
              preferredContact: form.preferredContact,
              newPatient: form.newPatient,
              appointmentFor: form.appointmentFor,
            },
            appointment: {
              preferredLocation: form.location,
              urgency: form.urgency,
              service: form.service,
              preferredDate: form.date,
              preferredTime: form.time,
              notes: form.message,
            },
            coverage: {
              type: form.coverageType,
              provider: form.insuranceProvider,
              policyHolderRelationship: form.policyHolder,
              notes: form.coverageNotes,
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Appointment request failed');
        }
      } else {
        throw new Error('Missing form email configuration');
      }

      setSubmitted(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      setSubmitError(message || 'Sorry, we could not send the request right now. Please call the clinic or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">Get in Touch</span>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-4">
            Book Your Appointment
          </h1>
          <p className="text-primary-200 text-lg max-w-2xl mx-auto">
            {clinicGroupMessage} Choose the location that works best for you and our team will help confirm the right visit.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40H1440V20C1200 0 960 0 720 20C480 40 240 40 0 20V40Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Main contact section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-14">
            {/* Left: form */}
            <div className="lg:col-span-3" id="appointment-form">
              <div className="mb-8">
                <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-700 mb-3">
                  {activeFormContent.badge}
                </span>
                <h2 className="font-display text-3xl font-bold text-neutral-900 mb-2">{activeFormContent.title}</h2>
                <p className="text-neutral-500">{activeFormContent.description}</p>
              </div>

              {submitted ? (
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-teal-900 mb-2">Request Received!</h3>
                  <p className="text-teal-700 mb-6">
                    Thank you, {form.firstName}! We've received your appointment request and will call or email you within one business day to confirm.
                  </p>
                  <p className="text-teal-600 text-sm mb-5">
                    For immediate assistance, call us at{' '}
                    <a href={telHref(clinic.phone)} className="font-bold hover:underline">{clinic.phone}</a>
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-teal-700 text-sm font-medium hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Jane"
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Smith"
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@example.com"
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="(905) 000-0000"
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Location + contact preference */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Preferred Location</label>
                      <select
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:border-primary-400 transition-colors bg-white"
                      >
                        {Object.values(clinics).map((item) => (
                          <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Preferred Contact Method</label>
                      <select
                        name="preferredContact"
                        value={form.preferredContact}
                        onChange={handleChange}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:border-primary-400 transition-colors bg-white"
                      >
                        <option value="">Select...</option>
                        <option value="phone">Phone call</option>
                        <option value="text">Text message</option>
                        <option value="email">Email</option>
                        <option value="any">Any method is fine</option>
                      </select>
                    </div>
                  </div>

                  {/* New patient + appointment context */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Are you a new patient?</label>
                      <select
                        name="newPatient"
                        value={form.newPatient}
                        onChange={handleChange}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:border-primary-400 transition-colors bg-white"
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes, new patient</option>
                        <option value="no">No, existing patient</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Appointment For</label>
                      <select
                        name="appointmentFor"
                        value={form.appointmentFor}
                        onChange={handleChange}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:border-primary-400 transition-colors bg-white"
                      >
                        <option value="">Select...</option>
                        <option value="adult">Adult</option>
                        <option value="child">Child</option>
                        <option value="family">Multiple family members</option>
                      </select>
                    </div>
                  </div>

                  {/* Urgency */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">How soon do you need care?</label>
                    <select
                      name="urgency"
                      value={form.urgency}
                      onChange={handleChange}
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:border-primary-400 transition-colors bg-white"
                    >
                      <option value="">Select urgency...</option>
                      <option value="routine">Routine / preventive visit</option>
                      <option value="soon">Soon - discomfort or concern</option>
                      <option value="urgent">Urgent - pain, swelling, broken tooth, or dental emergency</option>
                      <option value="not-sure">Not sure</option>
                    </select>
                    <p className="text-xs text-neutral-400 mt-1.5">For severe swelling, trouble breathing, uncontrolled bleeding, or a medical emergency, call 911.</p>
                  </div>

                  {/* Coverage */}
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 space-y-4">
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-sm">Insurance / Coverage Details</h3>
                      <p className="text-xs text-neutral-500 mt-1">This helps the front desk prepare before calling you. Please do not enter full policy numbers or sensitive medical history here.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Coverage Type</label>
                        <select
                          name="coverageType"
                          value={form.coverageType}
                          onChange={handleChange}
                          className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:border-primary-400 transition-colors bg-white"
                        >
                          <option value="">Select...</option>
                          {coverageTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Insurance Provider / Plan Name</label>
                        <input
                          type="text"
                          name="insuranceProvider"
                          value={form.insuranceProvider}
                          onChange={handleChange}
                          placeholder="Example: Sun Life, Manulife, Green Shield"
                          className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary-400 transition-colors bg-white"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Policy Holder Relationship</label>
                        <select
                          name="policyHolder"
                          value={form.policyHolder}
                          onChange={handleChange}
                          className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:border-primary-400 transition-colors bg-white"
                        >
                          <option value="">Select...</option>
                          <option value="self">Self</option>
                          <option value="spouse">Spouse / partner</option>
                          <option value="parent">Parent / guardian</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Coverage Notes</label>
                        <input
                          type="text"
                          name="coverageNotes"
                          value={form.coverageNotes}
                          onChange={handleChange}
                          placeholder="Employer plan, CDCP details, or questions"
                          className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary-400 transition-colors bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Service Required *</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:border-primary-400 transition-colors bg-white"
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <p className="text-xs text-neutral-400 mt-1.5">
                      Available services may vary by location. If you need a specific treatment, our team will confirm the best clinic for your visit.
                    </p>
                  </div>

                  {/* Preferred date/time */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Preferred Date</label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:border-primary-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Preferred Time</label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:border-primary-400 transition-colors bg-white"
                      >
                        <option value="">Select a time...</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>1:00 PM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                        <option>4:00 PM</option>
                        <option>5:00 PM</option>
                        <option>6:00 PM</option>
                        <option>7:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Additional Notes</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Please describe your dental concerns, symptoms, or any other relevant information..."
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-primary-200 transition-all hover:-translate-y-0.5 disabled:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Request Appointment
                      </>
                    )}
                  </button>

                  {submitError && (
                    <p className="text-sm text-red-600 text-center">{submitError}</p>
                  )}

                  <p className="text-xs text-neutral-400 text-center">
                    By submitting, you agree to our{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate ? onNavigate('privacy') : window.location.assign('/privacy')}
                      className="text-primary-600 cursor-pointer hover:underline"
                    >
                      Privacy Policy
                    </button>
                    .
                    We'll respond within one business day.
                  </p>
                </form>
              )}
            </div>

            {/* Right: contact info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Primary location */}
              <div className="bg-primary-600 rounded-2xl p-6 text-white">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-200" />
                  {clinic.name}
                  <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">Main</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <MapPin className="w-4 h-4 text-primary-200 shrink-0 mt-0.5" />
                    <span className="text-primary-100 text-sm">{clinic.address}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Phone className="w-4 h-4 text-primary-200 shrink-0" />
                    <a href={telHref(clinic.phone)} className="text-white font-semibold text-sm hover:underline">{clinic.phone}</a>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Mail className="w-4 h-4 text-primary-200 shrink-0" />
                    <a href={`mailto:${clinic.email}`} className="text-primary-100 text-xs hover:underline break-all">
                      {clinic.email}
                    </a>
                  </div>
                  <div className="flex gap-3 items-start pt-1">
                    <Clock className="w-4 h-4 text-primary-200 shrink-0 mt-0.5" />
                    <div className="text-sm text-primary-100">
                      <p>Mon-Fri: 11:00 AM - 8:00 PM</p>
                      <p>Saturday: 10:00 AM - 5:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance support */}
              <div className="bg-white rounded-2xl p-5 border border-primary-100 shadow-sm">
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Insurance & Coverage Help</h4>
                    <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                      We support CDCP, ODSP, and many private dental insurance plans. Share your coverage details in the appointment form and our team can help with direct billing questions before your visit.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {['CDCP registered', 'ODSP support', 'Private insurance', 'Self-pay questions'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-neutral-600 bg-neutral-50 rounded-lg px-3 py-2">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                <h4 className="font-semibold text-neutral-900 mb-4">Quick Contact</h4>
                <div className="space-y-3">
                  <a
                    href={telHref(clinic.phone)}
                    className="flex items-center gap-3 bg-white border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 rounded-xl p-3.5 transition-colors group"
                  >
                    <Phone className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900 group-hover:text-primary-700">Call Us Now</p>
                      <p className="text-xs text-neutral-500">{clinic.phone}</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${clinic.email}`}
                    className="flex items-center gap-3 bg-white border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 rounded-xl p-3.5 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900 group-hover:text-primary-700">Email Us</p>
                      <p className="text-xs text-neutral-500">We reply within 1 business day</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-xl p-3.5">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm font-medium text-teal-900">Walk-Ins Welcome</p>
                      <p className="text-xs text-teal-600">No appointment needed for emergencies</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CDCP note */}
              <div className="bg-gradient-to-br from-sky-50 to-teal-50 border border-sky-200 rounded-2xl p-5">
                <div className="flex gap-2.5">
                  <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-teal-900 text-sm">CDCP Patients Welcome</p>
                    <p className="text-teal-700 text-xs mt-1">Eligible CDCP patients may have reduced or no out-of-pocket costs for covered services. We can help with direct billing and coverage questions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All locations */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <LocationFinder showMaps />
        </div>
      </section>
    </div>
  );
}
