import React, { useState } from 'react';
import { PortfolioIntroduction } from '../data/portfolioData';
import { RobotMascot } from './RobotMascot';
import {
  Edit3,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  School,
  Mail,
  User,
  Quote,
  Sparkles,
} from 'lucide-react';

interface IntroductionHeroProps {
  intro: PortfolioIntroduction;
  onSaveIntro: (updatedIntro: PortfolioIntroduction) => void;
  onResetIntro: () => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}

export const IntroductionHero: React.FC<IntroductionHeroProps> = ({
  intro,
  onSaveIntro,
  onResetIntro,
  isEditing,
  setIsEditing,
}) => {
  const [formData, setFormData] = useState<PortfolioIntroduction>({ ...intro });
  const [saveAlert, setSaveAlert] = useState(false);
  const [showStorageNotice, setShowStorageNotice] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSaveIntro(formData);
      setSaveAlert(true);
      setTimeout(() => {
        setSaveAlert(false);
        setIsEditing(false);
      }, 1200);
    } catch (err) {
      setShowStorageNotice(true);
    }
  };

  const handleCancel = () => {
    setFormData({ ...intro });
    setIsEditing(false);
  };

  return (
    <section id="intro" className="pt-28 pb-16 md:pt-36 md:pb-20 bg-[#FAFAF7] border-b border-[#E9EDF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Storage notice banner on light yellow plate (#FFF8DD / #FFD447) */}
        {showStorageNotice && (
          <div className="mb-6 p-4 bg-[#FFF8DD] border border-[#FFD447] text-[#7A5B00] rounded-xl flex items-center justify-between text-xs sm:text-sm animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#C99E10] shrink-0" />
              <span>
                Hoiatus: Kohalik salvestusruum (localStorage) pole hetkel kättesaadav. Muudatused kehtivad selle seansi vältel.
              </span>
            </div>
            <button
              onClick={() => setShowStorageNotice(false)}
              className="text-[#7A5B00] hover:underline font-bold text-xs ml-3"
            >
              ✕
            </button>
          </div>
        )}

        {/* Unboxed Metadata Kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#566A80] uppercase tracking-wider mb-3">
          <span className="text-[#111827] font-bold">{intro.qualification}</span>
          <span aria-hidden="true" className="text-[#E9EDF1]">·</span>
          <span>{intro.institution}</span>
          <span aria-hidden="true" className="text-[#E9EDF1]">·</span>
          <span className="font-mono text-[#566A80]">{intro.updatedAt}</span>
        </div>

        {/* Requested Main Title: «Elena Galanina / e-portfoolio» */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#24364B] tracking-tight [text-wrap:balance]">
            {intro.title}
          </h1>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="self-start sm:self-auto px-4 py-2 text-xs font-semibold text-[#24364B] bg-white hover:bg-[#FAFAF7] border border-[#24364B]/30 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap focus:ring-2 focus:ring-[#111827]"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#111827]" />
            <span>{isEditing ? 'Sulge toimetaja' : 'Muuda sissejuhatust'}</span>
          </button>
        </div>

        {/* Subtitle in muted dark blue */}
        <p className="text-base sm:text-xl font-medium text-[#566A80] mb-8 max-w-3xl">
          {intro.subtitle}
        </p>

        {/* Editable Form or Polished Reader Presentation */}
        {isEditing ? (
          <form
            onSubmit={handleSave}
            className="p-6 sm:p-8 bg-white rounded-2xl border border-[#111827] shadow-sm space-y-6 animate-in fade-in duration-200 mb-10"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E9EDF1]">
              <div className="flex items-center gap-2 text-[#24364B] font-serif font-bold text-lg">
                <Edit3 className="w-5 h-5 text-[#111827]" />
                <span>Sissejuhatuse toimetamine</span>
              </div>
              <span className="text-xs text-[#566A80]">
                Muudatused salvestatakse koheselt
              </span>
            </div>

            {/* Success message: Green (#65B889) */}
            {saveAlert && (
              <div className="p-3.5 bg-[#65B889]/15 border border-[#65B889] text-[#2C6E48] text-xs sm:text-sm rounded-lg flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#65B889]" />
                <span className="font-semibold">Salvestatud! Sissejuhatus edukalt uuendatud.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#24364B] mb-1">
                  Portfoolio pealkiri
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#E9EDF1] rounded-lg text-[#24364B] font-serif font-bold focus:border-[#111827] focus:ring-1 focus:ring-[#111827] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#24364B] mb-1">
                  Alapealkiri
                </label>
                <input
                  type="text"
                  name="subtitle"
                  required
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#E9EDF1] rounded-lg text-[#24364B] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#24364B] mb-1">
                Sissejuhatav tekst / Pöördumine *
              </label>
              <textarea
                name="leadText"
                required
                rows={4}
                value={formData.leadText}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E9EDF1] rounded-lg text-[#24364B] leading-relaxed focus:border-[#111827] focus:ring-1 focus:ring-[#111827] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#24364B] mb-1">
                Pedagoogiline kreedo ja moto
              </label>
              <textarea
                name="motto"
                rows={2}
                value={formData.motto}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#E9EDF1] rounded-lg text-[#24364B] italic focus:border-[#111827] focus:ring-1 focus:ring-[#111827] focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#24364B] mb-1">
                  Õppeasutus
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#E9EDF1] rounded-lg text-[#24364B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#24364B] mb-1">
                  Kvalifikatsioonitase
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#E9EDF1] rounded-lg text-[#24364B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#24364B] mb-1">
                  Kontakt (e-post)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#E9EDF1] rounded-lg text-[#24364B] font-mono"
                />
              </div>
            </div>

            {/* Actions: Save is Blue, Cancel is White with dark border, Reset is Red border/text */}
            <div className="pt-4 border-t border-[#E9EDF1] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  onResetIntro();
                  setIsEditing(false);
                }}
                className="px-3.5 py-2 text-xs font-medium text-[#E85D5D] hover:bg-[#E85D5D]/10 border border-[#E85D5D] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Lähtesta algolekusse</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-xs font-medium text-[#24364B] bg-white border border-[#24364B]/30 hover:bg-[#FAFAF7] rounded-lg transition-colors cursor-pointer"
                >
                  Tühista
                </button>

                {/* Primary save button: Blue (#111827) with white text */}
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#111827] hover:bg-[#27272A] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs focus:ring-2 focus:ring-[#111827]"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvesta</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Reader Mode: White cards on warm white background with Robot mascot */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Left 8 cols: Editorial Lead and Motto */}
            <div className="lg:col-span-8 bg-white p-7 sm:p-9 rounded-2xl border border-[#E9EDF1] shadow-2xs space-y-6">
              <div>
                <div className="text-xs font-semibold text-[#111827] uppercase tracking-widest mb-3">
                  Sissejuhatus ja pedagoogiline visioon
                </div>
                <p className="text-base sm:text-lg text-[#24364B] leading-relaxed font-sans">
                  {intro.leadText}
                </p>
              </div>

              {/* Pedagogical Motto Container */}
              <div className="p-5 bg-[#FAFAF7] rounded-xl border-l-4 border-[#111827]">
                <blockquote className="font-serif italic text-base text-[#24364B] leading-relaxed">
                  {intro.motto}
                </blockquote>
                <div className="mt-2 text-xs font-medium text-[#566A80] uppercase tracking-wider">
                  — Elena Galanina, pedagoogiline kreedo
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#566A80]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#65B889]" />
                  <span>5 põhipädevust</span>
                </span>
                <span aria-hidden="true" className="text-[#E9EDF1]">·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#65B889]" />
                  <span>31 osapädevust</span>
                </span>
                <span aria-hidden="true" className="text-[#E9EDF1]">·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#65B889]" />
                  <span>Kõik tõendid kinnitatud</span>
                </span>
              </div>
            </div>

            {/* Right 4 cols: Teacher Profile Summary Card with Milo Robot Mascot */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Profile Card */}
              <div className="bg-white p-6 rounded-2xl border border-[#E9EDF1] shadow-2xs space-y-4">
                <div className="flex items-center gap-3.5 pb-4 border-b border-[#E9EDF1]">
                  <div className="w-12 h-12 rounded-xl bg-[#24364B] text-white flex items-center justify-center font-serif text-xl font-bold shrink-0">
                    EG
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#24364B] text-base">
                      {intro.authorName}
                    </h3>
                    <p className="text-xs text-[#566A80] font-medium">
                      {intro.role}
                    </p>
                  </div>
                </div>

                <div className="text-xs space-y-2 text-[#566A80]">
                  <div className="flex justify-between">
                    <span>Kool:</span>
                    <span className="font-medium text-[#24364B] text-right">{intro.institution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard:</span>
                    <span className="font-medium text-[#24364B] text-right">Õpetaja tase 7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>E-post:</span>
                    <a href={`mailto:${intro.email}`} className="font-mono text-[#111827] hover:underline">
                      {intro.email}
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E9EDF1]">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-2 text-xs font-semibold text-[#24364B] bg-white border border-[#24364B]/30 hover:bg-[#FAFAF7] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#111827]" />
                    <span>Muuda andmeid ja teksti</span>
                  </button>
                </div>
              </div>

              {/* Robot Mascot interactive spotlight */}
              <div className="bg-white p-5 rounded-2xl border border-[#E9EDF1] shadow-2xs flex flex-col items-center text-center">
                <div className="text-xs font-semibold text-[#566A80] uppercase tracking-wider mb-2">
                  Õppelabori maskott
                </div>
                <RobotMascot size="sm" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
