import { Shield, ArrowRight } from 'lucide-react';
import { clinic } from '../config/clinic';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
}

export default function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  return (
    <div>
      <div className="hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">Legal</span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-primary-200 text-lg max-w-2xl mx-auto">
            How we collect, use, and protect your personal information.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40H1440V20C1200 0 960 0 720 20C480 40 240 40 0 20V40Z" fill="white" />
          </svg>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8 p-4 bg-primary-50 rounded-xl border border-primary-100">
            <Shield className="w-6 h-6 text-primary-600 shrink-0" />
            <p className="text-primary-800 text-sm">
              Last updated: January 1, 2025. {clinic.name} is committed to protecting your privacy and personal health information in compliance with Ontario's PHIPA and PIPEDA.
            </p>
          </div>

          <div className="prose prose-neutral max-w-none">
            {[
              {
                title: '1. Information We Collect',
                content: `We collect personal and health information that you voluntarily provide to us, including but not limited to: your name, date of birth, address, phone number, email address, health card number, insurance information, dental and medical history, and treatment records.

We may also collect information automatically when you visit our website, such as your IP address, browser type, and pages visited, through standard web analytics tools.`,
              },
              {
                title: '2. How We Use Your Information',
                content: `Your personal and health information is used primarily for the following purposes:
• To provide and manage your dental care and treatment
• To communicate appointment reminders, follow-up care, and health-related information
• To process insurance claims and billing (including CDCP direct billing)
• To comply with our legal and regulatory obligations
• To improve our clinical services and patient experience`,
              },
              {
                title: '3. How We Share Your Information',
                content: `We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:
• With other healthcare providers involved in your care (with your consent)
• With insurance carriers, CDCP/Sun Life, and ODSP for billing purposes
• When required by law, court order, or regulatory authority
• With our administrative staff and technology service providers who are bound by confidentiality agreements`,
              },
              {
                title: '4. Protection of Your Information',
                content: `We implement appropriate physical, administrative, and technical safeguards to protect your personal information from unauthorized access, use, or disclosure. Our dental management software and electronic health records are protected by industry-standard encryption and access controls.`,
              },
              {
                title: '5. Retention of Records',
                content: `We retain patient records for a minimum of 10 years following the last entry, or until a minor patient turns 28, in accordance with the Royal College of Dental Surgeons of Ontario regulations.`,
              },
              {
                title: '6. Your Rights',
                content: `You have the right to:
• Access your personal health information held by our clinic
• Request corrections to inaccurate information
• Withdraw consent for non-essential uses of your information (this will not affect your dental care)
• Lodge a complaint with the Office of the Privacy Commissioner of Canada or the Information and Privacy Commissioner of Ontario`,
              },
              {
                title: '7. Cookies & Website Analytics',
                content: `Our website may use cookies and analytics tools to improve your browsing experience. You may disable cookies in your browser settings; however, some features of the website may not function correctly without them.`,
              },
              {
                title: '8. Contact Our Privacy Officer',
                content: `If you have questions or concerns about our privacy practices, or wish to make a request regarding your personal information, please contact:

${clinic.name}
Privacy Officer
Email: ${clinic.email}
Phone: ${clinic.phone}
${clinic.fax ? `Fax: ${clinic.fax}` : ''}`,
              },
            ].map((section) => (
              <div key={section.title} className="mb-10">
                <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">{section.title}</h2>
                <div className="text-neutral-600 text-base leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-neutral-100 pt-8">
            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              Have questions? Contact us
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
