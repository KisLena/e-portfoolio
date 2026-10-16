import React from 'react';
import { PortfolioIntroduction } from '../data/portfolioData';
import { ArrowUp, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  intro: PortfolioIntroduction;
  onPrint: () => void;
}

export const Footer: React.FC<FooterProps> = ({ intro, onPrint }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#24364B] text-[#FAFAF7] py-16 border-t border-[#1E2D3E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#324B68]">
          {/* Brand & Identity (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#111827] text-white flex items-center justify-center font-serif text-base font-bold shadow-xs">
                E
              </span>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                {intro.title}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#E9EDF1]/80 leading-relaxed max-w-sm">
              Õpetaja kutsestandardile (tase 6) vastav professionaalse arengu e-portfoolio. Eneseanalüüs, tõendusmaterjalid ja haridusrobootika lõiming.
            </p>
            <div className="text-xs text-[#566A80]">
              {intro.institution} · {intro.authorName}
            </div>
          </div>

          {/* 5 Cards navigation (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-semibold text-[#FFD447] tracking-wider">
              Viis pädevusvaldkonda
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <a href="#card-mina-ise" className="hover:text-[#2563EB] transition-colors flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                <span>1. Mina ise (5 osapädevust)</span>
              </a>
              <a href="#card-enesehoid" className="hover:text-[#65B889] transition-colors flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#65B889]" />
                <span>2. Enesehoid (2 osapädevust)</span>
              </a>
              <a href="#card-oppija-toetamine" className="hover:text-[#E85D5D] transition-colors flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E85D5D]" />
                <span>3. Õppija toetamine (11 osapädevust)</span>
              </a>
              <a href="#card-organisatsioon" className="hover:text-[#FFD447] transition-colors flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FFD447]" />
                <span>4. Organisatsioon (8 osapädevust)</span>
              </a>
              <a href="#card-okosusteem" className="hover:text-[#16A34A] transition-colors flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span>5. Ökosüsteem (5 osapädevust)</span>
              </a>
            </div>
          </div>

          {/* Actions (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-semibold text-[#FFD447] tracking-wider">
              Kutsestandard ja eksport
            </h4>
            <p className="text-xs text-[#E9EDF1]/70 leading-relaxed">
              Vastavuses Haridus- ja Noorteameti ning Kutsekoja õpetaja kutsestandardiga.
            </p>
            <button
              onClick={onPrint}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#111827] hover:bg-[#27272A] rounded-lg transition-colors cursor-pointer text-center shadow-xs focus:ring-2 focus:ring-[#111827]"
            >
              Prindi / Salvesta PDF
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#566A80]">
          <div>
            © {new Date().getFullYear()} {intro.authorName}. Kõik õigused kaitstud. {intro.title}.
          </div>
          <div className="flex items-center gap-6">
            <span>Kutsestandard tase 6</span>
            <span aria-hidden="true">·</span>
            <span>Eesti Vabariik</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors ml-2 cursor-pointer"
            >
              <span>Algusesse</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
