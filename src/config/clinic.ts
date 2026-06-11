export type ClinicId = 'mississauga' | 'countryside' | 'ridgeway';

export interface ClinicConfig {
  id: ClinicId;
  name: string;
  shortName: string;
  headerLine1: string;
  headerLine2: string;
  domain: string;
  cityLine: string;
  serviceArea: string;
  address: string;
  phone: string;
  fax?: string;
  email: string;
  rating: string;
  reviewCount: number;
  reviews: ClinicReview[];
  yearsExperience: string;
  patientCount: string;
  heroImage: string;
  website?: string;
  primary?: boolean;
  metaTitle: string;
  metaDescription: string;
}

export interface ClinicReview {
  name: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
}

export const sharedHours = [
  { day: 'Monday - Friday', time: '11:00 AM - 8:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 5:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export const clinics: Record<ClinicId, ClinicConfig> = {
  mississauga: {
    id: 'mississauga',
    name: 'Dentistry on Mississauga',
    shortName: 'Mississauga',
    headerLine1: 'DENTISTRY',
    headerLine2: 'ON MISSISSAUGA',
    domain: 'dentistryonmississauga.com',
    cityLine: "Mississauga and Brampton's trusted dental clinic",
    serviceArea: 'Mississauga, Brampton, and the greater GTA',
    address: '65 Montpelier St, Unit E104, Brampton, ON L6Y 6H4',
    phone: '905-872-1100',
    fax: '905-458-6388',
    email: 'dentistryonmississauga@gmail.com',
    rating: '4.6',
    reviewCount: 56,
    reviews: [
      {
        name: 'Joseph Ssebuliba',
        initials: 'JS',
        rating: 5,
        date: '3 months ago',
        text: 'The epitome of excellence in dentistry. A welcoming ambience, caring support staff, and experienced dentists made for a lasting impression.',
      },
      {
        name: 'Manjeet',
        initials: 'M',
        rating: 5,
        date: '6 months ago',
        text: 'Dr. Nazia and her team are truly exceptional. Her professionalism is evident in every aspect of her work.',
      },
      {
        name: 'Ali Seo',
        initials: 'AS',
        rating: 5,
        date: '5 months ago',
        text: 'I had a wonderful experience. The staff was professional, friendly, and made me feel comfortable from start to finish.',
      },
      {
        name: 'Hussain Khadim Alrab',
        initials: 'HK',
        rating: 5,
        date: '9 months ago',
        text: 'From the front desk to the dental team, everyone was friendly and welcoming during my first visit.',
      },
      {
        name: 'Farah Zeeshan',
        initials: 'FZ',
        rating: 5,
        date: '5 months ago',
        text: 'I am really happy with the services provided by Dr. Nazia and her team. They are extremely professional.',
      },
      {
        name: 'Antonio Ricci',
        initials: 'AR',
        rating: 5,
        date: '9 months ago',
        text: 'Dr. Nazia is truly exceptional. Her professionalism shines through and she made the visit comfortable.',
      },
      {
        name: 'Tyra Nakayiwa',
        initials: 'TN',
        rating: 5,
        date: '6 months ago',
        text: 'I absolutely loved it there. The visit was quick and I could see good results.',
      },
      {
        name: 'Miguel Bertrand',
        initials: 'MB',
        rating: 5,
        date: 'a year ago',
        text: 'A positive dental experience after moving to Brampton, with care that made the visit feel worthwhile.',
      },
      {
        name: 'Anamika Giri',
        initials: 'AG',
        rating: 5,
        date: 'a year ago',
        text: 'Amazing experience with doctors and staff. They do not do unnecessary procedures, and I am very happy with the service.',
      },
      {
        name: 'Sahil Kamboj',
        initials: 'SK',
        rating: 5,
        date: '2 years ago',
        text: 'Dr. Nazia and Gurleen were very nice and patient with me. I had a good experience with my wisdom tooth extraction.',
      },
    ],
    yearsExperience: '15+',
    patientCount: '5000+',
    heroImage: '/Dentistry-on-Mississauga.webp',
    website: 'https://dentistryonmississauga.com/',
    primary: true,
    metaTitle: 'Dentistry on Mississauga | Family Dental Clinic in Brampton and Mississauga',
    metaDescription: 'Dentistry on Mississauga provides family, cosmetic, restorative, emergency, and CDCP dental care for patients in Brampton, Mississauga, and the GTA.',
  },
  countryside: {
    id: 'countryside',
    name: 'Countryside Dental Clinic',
    shortName: 'Countryside',
    headerLine1: 'COUNTRYSIDE',
    headerLine2: 'DENTAL CLINIC',
    domain: 'countrysidedentalclinic.com',
    cityLine: "Brampton's trusted dental clinic",
    serviceArea: 'Brampton and the greater GTA',
    address: '150 Yellow Avens Blvd, Brampton, ON L6R 0M5',
    phone: '905-458-6588',
    fax: '905-458-6388',
    email: 'csdentalclinic@gmail.com',
    rating: '4.5',
    reviewCount: 19,
    reviews: [
      {
        name: 'Kashif Ibad',
        initials: 'KI',
        rating: 5,
        date: 'recently',
        text: 'Very happy with my visit. Everyone was friendly from the front desk to the dentist and made sure I understood what was going on.',
      },
      {
        name: 'Sandra Pieri',
        initials: 'SP',
        rating: 5,
        date: 'a year ago',
        text: 'The reception team is warm, welcoming, and always ready to help. The entire staff is professional, kind, and caring.',
      },
      {
        name: 'Victoria Mactavish',
        initials: 'VM',
        rating: 5,
        date: '4 years ago',
        text: 'I came in terrified and in pain, and the team helped make the experience much easier than I expected.',
      },
      {
        name: 'Folay S',
        initials: 'FS',
        rating: 5,
        date: '3 years ago',
        text: 'I have been going to this office for over 10 years. The team is friendly and helped improve my smile.',
      },
      {
        name: 'Maaid Abdullah',
        initials: 'MA',
        rating: 5,
        date: '5 years ago',
        text: 'The receptionists, hygienists, assistants, and doctors look after me in a professional and comforting manner.',
      },
      {
        name: 'Asim Muhammad',
        initials: 'AM',
        rating: 5,
        date: '3 years ago',
        text: 'This place is amazing. The calm atmosphere and excellent staff made me feel satisfied throughout my appointment.',
      },
      {
        name: 'Gurnoor Deol',
        initials: 'GD',
        rating: 5,
        date: '6 years ago',
        text: 'I came in for a cleaning and had one of the best dental experiences I have had.',
      },
      {
        name: 'Salih Abdullah',
        initials: 'SA',
        rating: 5,
        date: '2 years ago',
        text: 'Dr. Nazia Rehman is a great dentist.',
      },
      {
        name: 'Madiha Maryam',
        initials: 'MM',
        rating: 5,
        date: '13 minutes ago',
        text: 'The staff was very kind and the dentist explained everything nicely before starting. The place was clean and welcoming.',
      },
      {
        name: 'Khurshid A. Siddiqui',
        initials: 'KS',
        rating: 5,
        date: '3 days ago',
        text: 'Great service.',
      },
    ],
    yearsExperience: '15+',
    patientCount: '5000+',
    heroImage: '/Country-Side-Dental.png',
    website: 'https://countrysidedentalclinic.com/',
    metaTitle: 'Countryside Dental Clinic | Family Dental Clinic in Brampton',
    metaDescription: 'Countryside Dental Clinic provides family, cosmetic, restorative, emergency, and CDCP dental care for patients in Brampton and the GTA.',
  },
  ridgeway: {
    id: 'ridgeway',
    name: 'Dentistry on Ridgeway',
    shortName: 'Ridgeway',
    headerLine1: 'DENTISTRY',
    headerLine2: 'ON RIDGEWAY',
    domain: 'dentistryonridgeway.com',
    cityLine: "Mississauga's trusted dental clinic",
    serviceArea: 'Mississauga and the greater GTA',
    address: '3465 Platinum Dr, Unit 76, Mississauga, ON L5M 2S1',
    phone: '905-820-0900',
    email: 'dentistryonridgeway@gmail.com',
    rating: '5.0',
    reviewCount: 22,
    reviews: [
      {
        name: 'Wajid Khan',
        initials: 'WK',
        rating: 5,
        date: '3 months ago',
        text: 'I visited with my whole family and had an exceptional experience with both the doctor and the receptionist.',
      },
      {
        name: 'Mandeep Singh',
        initials: 'MS',
        rating: 5,
        date: 'a year ago',
        text: 'It was a great experience with Dr. Warsi and helpful to understand the treatment first.',
      },
      {
        name: 'Saud Amin',
        initials: 'SA',
        rating: 5,
        date: 'a year ago',
        text: 'One of the best places for dental treatment.',
      },
      {
        name: 'Samina Zafar',
        initials: 'SZ',
        rating: 5,
        date: '3 days ago',
        text: 'Good dentistry.',
      },
      {
        name: 'Sumreen Ishaq',
        initials: 'SI',
        rating: 5,
        date: '3 days ago',
        text: 'Amazing experience.',
      },
      {
        name: 'Simranjeet Kaur',
        initials: 'SK',
        rating: 5,
        date: '3 days ago',
        text: 'Very good experience.',
      },
      {
        name: 'Siddiqa Ana Anam',
        initials: 'SA',
        rating: 5,
        date: '3 days ago',
        text: 'Great work.',
      },
      {
        name: 'Kusum Sharma',
        initials: 'KS',
        rating: 5,
        date: '3 days ago',
        text: 'Fabulous.',
      },
      {
        name: 'Simranjeet Kaur',
        initials: 'SK',
        rating: 5,
        date: '3 days ago',
        text: 'Very good service and I recommend them for next time.',
      },
      {
        name: 'Pak-Canadian Mom Cooking',
        initials: 'PC',
        rating: 5,
        date: '3 days ago',
        text: 'Best doctor ever.',
      },
    ],
    yearsExperience: '15+',
    patientCount: '5000+',
    heroImage: '/Dentistry-on-Ridgeway.webp',
    website: 'https://dentistryonridgeway.com/',
    metaTitle: 'Dentistry on Ridgeway | Family Dental Clinic in Mississauga',
    metaDescription: 'Dentistry on Ridgeway provides family, cosmetic, restorative, emergency, and CDCP dental care for patients in Mississauga and the GTA.',
  },
};

const selectedClinicId = (import.meta.env.VITE_CLINIC_ID as ClinicId | undefined) || 'mississauga';

export const clinic = clinics[selectedClinicId] || clinics.mississauga;

export const otherClinics = Object.values(clinics).filter((item) => item.id !== clinic.id);

export function telHref(phone: string) {
  return `tel:+1${phone.replace(/\D/g, '')}`;
}
