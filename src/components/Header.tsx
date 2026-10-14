import React, { useState, useEffect } from 'react';
import { Menu, X, Edit3, Printer, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenEditIntro: () => void;
  onPrint: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEditIntro,
  onPrint,
  activeSection = 'intro',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentActive, setCurrentActive] = useState(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection based on section scroll
      const sections = [
        'intro',
        'card-mina-ise',
        'card-enesehoid',
        'card-oppija-toetamine',
        'card-organisatsioon',
        'card-okosusteem',
        'evidence',
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setCurrentActive(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'intro', label: 'Avaleht', href: '#intro' },
    { id: 'card-mina-ise', label: '1. Mina ise', href: '#card-mina-ise' },
    { id: 'card-enesehoid', label: '2. Enesehoid', href: '#card-enesehoid' },
    { id: 'card-oppija-toetamine', label: '3. Õppija toetamine', href: '#card-oppija-toetamine' },
    { id: 'card-organisatsioon', label: '4. Organisatsioon', href: '#card-organisatsioon' },
    { id: 'card-okosusteem', label: '5. Ökosüsteem', href: '#card-okosusteem' },
    { id: 'evidence', label: 'Tõendid', href: '#evidence' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 bg-white ${
        isScrolled
          ? 'border-b border-[#E9EDF1] shadow-xs'
          : 'border-b border-[#E9EDF1]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-18">
          {/* Zone 1: Single element brand title: «Elena Galanina / e-portfoolio» */}
          <a
            href="#intro"
            className="flex items-center gap-2.5 text-[#24364B] font-serif text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap shrink-0 hover:text-[#111827] transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-[#111827] text-white flex items-center justify-center font-serif text-base font-bold shadow-xs">
              E
            </span>
            <span>Elena Galanina / e-portfoolio</span>
          </a>

          {/* Zone 2: Navigation with yellow (#FFD447) active highlight */}
          <nav className="hidden xl:flex items-center gap-2 text-sm font-medium text-[#566A80]">
            {navLinks.map((link) => {
              const isActive = currentActive === link.id;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setCurrentActive(link.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 relative font-medium ${
                    isActive
                      ? 'text-[#24364B] font-semibold bg-[#FFD447]/30 border-b-2 border-[#FFD447]'
                      : 'text-[#566A80] hover:text-[#24364B] hover:bg-[#FAFAF7]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#FFD447] rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary action (blue #111827) + secondary button (white with dark border) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onPrint}
              title="Prindi või salvesta PDF portfoolio"
              className="px-3 py-2 text-xs font-medium text-[#24364B] bg-white hover:bg-[#FAFAF7] border border-[#24364B]/30 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer focus:ring-2 focus:ring-[#111827]"
            >
              <Printer className="w-3.5 h-3.5 text-[#566A80]" />
              <span className="hidden sm:inline">Prindi PDF</span>
            </button>

            {/* Main Action Button: Blue (#111827) with white text */}
            <button
              onClick={onOpenEditIntro}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#111827] hover:bg-[#27272A] rounded-lg shadow-xs hover:shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer focus:ring-2 focus:ring-[#111827]"
            >
              <Edit3 className="w-3.5 h-3.5 text-white" />
              <span>Muuda sissejuhatust</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#24364B] hover:bg-[#FAFAF7] rounded-lg cursor-pointer"
              aria-label="Menüü"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#E9EDF1] bg-white px-4 pt-2 pb-6 shadow-md animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentActive === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setCurrentActive(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-[#24364B] bg-[#FFD447]/30 font-semibold'
                      : 'text-[#566A80] hover:text-[#24364B] hover:bg-[#FAFAF7]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#FFD447]" />
                  )}
                </a>
              );
            })}
            <div className="pt-3 border-t border-[#E9EDF1] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEditIntro();
                }}
                className="w-full py-2.5 text-sm font-semibold text-center text-white bg-[#111827] hover:bg-[#27272A] rounded-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-white" />
                <span>Muuda sissejuhatust</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPrint();
                }}
                className="w-full py-2 text-xs font-medium text-center text-[#24364B] bg-white border border-[#24364B]/30 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#FAFAF7]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Prindi portfoolio (PDF)</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
