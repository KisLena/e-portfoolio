import React from 'react';
import { TeacherProfile } from '../data/teacherData';
import { ArrowDown, Award, BookOpen, Calendar, GraduationCap, Download, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  profile: TeacherProfile;
  onOpenBooking: () => void;
  onExploreMaterials: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onOpenBooking,
  onExploreMaterials,
}) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-b from-stone-100/70 via-stone-50 to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean unboxed kicker with typographic separators (No pill badges) */}
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-stone-500 uppercase tracking-wider mb-4">
              <span className="text-amber-800 font-semibold">{profile.category}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{profile.school}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{profile.classroom}</span>
            </div>

            {/* Oversized editorial headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-stone-900 tracking-tight leading-[1.15] mb-5 [text-wrap:balance]">
              {profile.fullName}
            </h1>

            {/* Subheading / Professional title */}
            <p className="text-lg sm:text-xl text-stone-700 font-medium mb-6">
              {profile.role}
            </p>

            {/* Pedagogical Motto Quote */}
            <div className="relative pl-5 py-2 mb-8 border-l-2 border-amber-700/60 bg-amber-50/40 rounded-r-lg">
              <blockquote className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                {profile.motto}
              </blockquote>
              <div className="mt-2 text-xs text-stone-500 font-sans uppercase tracking-wider">
                Педагогическое кредо
              </div>
            </div>

            {/* Highlights list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm text-stone-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>Эксперт предметной комиссии ФИПИ по проверке ЕГЭ</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>Победитель конкурса «Учитель года» в номинации мастерства</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>Наставник победителей Всероссийской олимпиады</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>Автор 18 публикаций и дидактических пособий</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreMaterials}
                className="px-6 py-3.5 text-sm font-semibold text-stone-50 bg-stone-900 hover:bg-amber-900 rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Методическая копилка</span>
              </button>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Calendar className="w-4 h-4 text-stone-600" />
                <span>Записаться на консультацию</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative subtle photo frame border */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-200/50 via-stone-200/40 to-stone-100 rounded-2xl transform -rotate-1" />
              
              <div className="relative overflow-hidden rounded-2xl bg-stone-200 shadow-xl border border-stone-200/80 aspect-4/3 sm:aspect-4/3 lg:aspect-3/4">
                <img
                  src={profile.photoUrl}
                  alt={profile.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Scrim overlay at bottom for legible badge text */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent text-white">
                  <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                    {profile.honors}
                  </div>
                  <div className="text-sm font-medium text-stone-100 leading-snug">
                    {profile.school} · Кабинет литературы
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width quantitative proof strip placed below the split */}
        <div className="mt-16 pt-10 border-t border-stone-200/90 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-2xs">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 font-mono tabular-nums">
              {profile.experienceYears}+
            </div>
            <div className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
              лет педагогического стажа
            </div>
            <div className="text-xs text-stone-400 mt-1">
              высшая квалификация
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-2xs">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 font-mono tabular-nums">
              {profile.avgExamScore}
            </div>
            <div className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
              средний балл ЕГЭ выпускников
            </div>
            <div className="text-xs text-stone-400 mt-1">
              7 стобалльников за 5 лет
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-2xs">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 font-mono tabular-nums">
              {profile.olympiadWinnersCount}
            </div>
            <div className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
              призеров и победителей олимпиад
            </div>
            <div className="text-xs text-stone-400 mt-1">
              ВсОШ и олимпиады I уровня
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-2xs">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 font-mono tabular-nums">
              {profile.publicationsCount}
            </div>
            <div className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
              авторских методических трудов
            </div>
            <div className="text-xs text-stone-400 mt-1">
              статьи, пособия и КИМы
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
