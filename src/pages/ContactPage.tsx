import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Calendar, ExternalLink } from 'lucide-react';
import { clinic, clinics, sharedHours, telHref } from '../config/clinic';

const locations = [clinic, ...Object.values(clinics).filter((item) => item.id !== clinic.id)].map((item, index) => ({
  ...item,
  hours: sharedHours,
  primary: index === 0,
}));

const services = [
  'General Checkup & Cleaning',
  'Cosmetic Dentistry',
  'Teeth Whitening',
  'Dental Implants',
  'Restorative Dentistry',
  'Root Canal Treatment',
  'Wisdom Teeth Extraction',
  'Emergency Dental Care',
  'CDCP Consultation',
  'Pediatric Dentistry',
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

export default function ContactPage() {
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
    newPatient: '',
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
    const endpoint = import.meta.env.VITE_APPOINTMENT_FORM_ENDPOINT as string | undefined;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
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
        window.location.href = `mailto:${clinic.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }

      setSubmitted(true);
    } catch {
      setSubmitError('Sorry, we could not send the request right now. Please call the clinic or email us directly.');
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
            New and emergency patients always welcome. We look forward to welcoming you to our clinic.
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
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-neutral-900 mb-2">Request an Appointment</h2>
                <p className="text-neutral-500">Fill out the form and we'll contact you to confirm your appointment.</p>
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
                    <span className="text-primary-600 cursor-pointer hover:underline">Privacy Policy</span>.
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
                    <p className="text-teal-700 text-xs mt-1">Eligible CDCP patients may have reduced or no out-of-pocket costs for covered services. We can help with direct billing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All locations */}
      <section className="py-20 bg-neutral-50" id="locations">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Locations</span>
            <h2 className="font-display text-4xl font-bold text-neutral-900">
              Find a Clinic Near You
            </h2>
            <p className="text-neutral-500 mt-3">Three conveniently located dental clinics serving Mississauga, Brampton, and the greater GTA.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div key={loc.name} className={`bg-white rounded-2xl overflow-hidden border shadow-sm card-hover ${loc.primary ? 'border-primary-200 ring-2 ring-primary-100' : 'border-neutral-100'}`}>
                {/* Image */}
                <div
                  className="w-full h-48 bg-neutral-100 relative overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url("${loc.heroImage}")` }}
                  aria-label={loc.name}
                  role="img"
                >
                  {loc.primary && (
                    <div className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      Main Location
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-neutral-900 mb-4">{loc.name}</h3>
                  <div className="space-y-2.5 mb-5">
                    <div className="flex gap-2.5 items-start text-sm">
                      <MapPin className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-600">{loc.address}</span>
                    </div>
                    <div className="flex gap-2.5 items-center text-sm">
                      <Phone className="w-4 h-4 text-primary-500 shrink-0" />
                      <a href={`tel:${loc.phone.replace(/\D/g, '')}`} className="text-neutral-700 hover:text-primary-600 font-medium">
                        {loc.phone}
                      </a>
                    </div>
                    <div className="flex gap-2.5 items-center text-sm">
                      <Mail className="w-4 h-4 text-primary-500 shrink-0" />
                      <a href={`mailto:${loc.email}`} className="text-neutral-500 hover:text-primary-600 text-xs break-all">
                        {loc.email}
                      </a>
                    </div>
                    <div className="flex gap-2.5 items-start text-sm">
                      <Clock className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                      <div className="text-neutral-600 text-xs">
                        {loc.hours.map((h) => (
                          <p key={h.day}>{h.day}{h.time ? `: ${h.time}` : ''}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                  {loc.website && (
                    <a
                      href={loc.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                    >
                      Visit Website <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
