import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import InsurancePage from './pages/CDCPPage';
import FormsPage from './pages/FormsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import { clinic } from './config/clinic';

type Page = 'home' | 'services' | 'insurance' | 'forms' | 'about' | 'contact' | 'privacy';

const pagePaths: Record<Page, string> = {
  home: '/',
  services: '/services',
  insurance: '/insurance',
  forms: '/forms',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
};

const pathPages: Record<string, Page> = {
  '/': 'home',
  '/services': 'services',
  '/insurance': 'insurance',
  '/cdcp': 'insurance',
  '/forms': 'forms',
  '/about': 'about',
  '/contact': 'contact',
  '/privacy': 'privacy',
};

const getPageFromLocation = () => pathPages[window.location.pathname] || 'home';

export default function App() {
  const [page, setPage] = useState<Page>(() => getPageFromLocation());

  useEffect(() => {
    document.title = clinic.metaTitle;

    const setMeta = (selector: string, value: string) => {
      const element = document.head.querySelector(selector);
      if (element) element.setAttribute('content', value);
    };

    setMeta('meta[name="description"]', clinic.metaDescription);
    setMeta('meta[property="og:title"]', clinic.metaTitle);
    setMeta('meta[property="og:description"]', clinic.metaDescription);
    setMeta('meta[property="og:image"]', `${window.location.origin}/brand-logo.png`);
    setMeta('meta[name="twitter:title"]', clinic.metaTitle);
    setMeta('meta[name="twitter:description"]', clinic.metaDescription);
    setMeta('meta[name="twitter:image"]', `${window.location.origin}/brand-logo.png`);
  }, []);

  useEffect(() => {
    const handlePopState = () => setPage(getPageFromLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (newPage: string) => {
    const nextPage = (pagePaths[newPage as Page] ? newPage : 'home') as Page;
    setPage(nextPage);

    const nextPath = pagePaths[nextPage];
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'insurance':
        return <InsurancePage onNavigate={handleNavigate} />;
      case 'forms':
        return <FormsPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={page} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
