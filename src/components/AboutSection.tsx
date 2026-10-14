import React, { useState } from 'react';
import {
  TeacherProfile,
  EducationItem,
  QualificationCourse,
  TeachingTechnology,
} from '../data/teacherData';
import {
  GraduationCap,
  Award,
  Sparkles,
  BookMarked,
  Clock,
  Building2,
  FileCheck2,
  CheckCircle,
} from 'lucide-react';

interface AboutSectionProps {
  profile: TeacherProfile;
  education: EducationItem[];
  courses: QualificationCourse[];
  technologies: TeachingTechnology[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  profile,
  education,
  courses,
  technologies,
}) => {
  const [activeTab, setActiveTab] = useState<'education' | 'courses' | 'technologies' | 'philosophy'>('education');

  return (
    <section id="about" className="py-20 bg-stone-50 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with editorial numbering */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2">
            01. Визитная карточка педагога
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
            Образование, квалификация и методическая концепция
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Педагогическая деятельность строится на сочетании фундаментальных традиций классического филологического образования и передовых интерактивных методик работы с текстом.
          </p>
        </div>

        {/* Tab switcher: Interactive segmented controls */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-200/70 rounded-xl mb-10 max-w-2xl">
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'education'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Базовое образование
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'courses'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Повышение квалификации
          </button>
          <button
            onClick={() => setActiveTab('technologies')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'technologies'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Педагогические технологии
          </button>
          <button
            onClick={() => setActiveTab('philosophy')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'philosophy'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Методическая тема
          </button>
        </div>

        {/* Tab Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {activeTab === 'education' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {education.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white rounded-xl border border-stone-200 shadow-2xs hover:border-amber-700/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 mb-2">
                      <span className="font-mono text-amber-800 font-semibold">{item.year}</span>
                      {item.honors && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-medium">{item.honors}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">
                      {item.institution}
                    </h3>
                    <div className="text-sm font-medium text-stone-700 mb-3">
                      {item.faculty} · {item.specialty}
                    </div>
                    <p className="text-sm text-stone-600 bg-stone-50 p-3.5 rounded-lg border border-stone-100">
                      <strong className="text-stone-800 font-semibold">Присвоенная квалификация:</strong> {item.qualification}
                    </p>
                  </div>
                ))}

                <div className="p-6 bg-amber-50/50 rounded-xl border border-amber-200/60">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-900 mb-2">
                    Стаж и квалификационный статус
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Высшая квалификационная категория подтверждена решением аттестационной комиссии Департамента образования и науки (приказ № 412/АК, действует бессрочно в соответствии с новым порядком аттестации). Общий педагогический стаж — {profile.experienceYears} лет.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-2">
                  Курсы за последние 3 года (общий объём: более 280 академических часов)
                </div>
                {courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                        <span className="font-mono font-bold text-amber-800">{course.year} год</span>
                        <span aria-hidden="true">·</span>
                        <span>{course.hours} ак. часов</span>
                      </div>
                      <h4 className="text-base font-semibold text-stone-900 mb-1">
                        {course.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600">
                        {course.provider}
                      </p>
                    </div>
                    <div className="text-xs font-mono text-stone-400 bg-stone-50 px-3 py-1.5 rounded-md border border-stone-100 shrink-0 self-start">
                      № {course.certificateNumber}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'technologies' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
                {technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-base font-serif font-bold text-stone-900 mb-2">
                        {tech.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                        {tech.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
                      <span className="font-semibold text-amber-900">Применение:</span> {tech.practicalUse}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                    Методическая тема самообразования
                  </h3>
                  <p className="text-base text-stone-800 leading-relaxed bg-stone-50 p-4 rounded-lg border border-stone-200/80">
                    «{profile.methodologyTopic}»
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">
                    Ключевые принципы взаимодействия с учениками
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-stone-100 bg-stone-50/50">
                      <div className="text-sm font-bold text-stone-900 mb-1">
                        1. Субъект-субъектный диалог
                      </div>
                      <p className="text-xs text-stone-600">
                        Ученик — не пассивный приёмник информации, а соавтор урока и исследователь художественного слова.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-stone-100 bg-stone-50/50">
                      <div className="text-sm font-bold text-stone-900 mb-1">
                        2. Ситуация гарантированного успеха
                      </div>
                      <p className="text-xs text-stone-600">
                        Поощрение даже малых побед, бережная коррекция ошибок и устранение психологических барьеров перед аудиторией.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-stone-100 bg-stone-50/50">
                      <div className="text-sm font-bold text-stone-900 mb-1">
                        3. Метапредметная связь
                      </div>
                      <p className="text-xs text-stone-600">
                        Изучение литературы в контексте всеобщей истории, музыки, философии, архитектуры и современного медиапространства.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-stone-100 bg-stone-50/50">
                      <div className="text-sm font-bold text-stone-900 mb-1">
                        4. Академическая честность
                      </div>
                      <p className="text-xs text-stone-600">
                        Обучение глубокой самостоятельной работе с источниками, этике цитирования и аргументации позиции.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Visual photo of classroom & quick info card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-xl overflow-hidden border border-stone-200 bg-white shadow-2xs">
              <div className="aspect-16/10 overflow-hidden relative">
                <img
                  src={profile.heroClassroomUrl}
                  alt="Кабинет литературы и словесности"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs text-white font-medium">
                    Кабинет литературы № 314 · Академическая гимназия
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-base font-serif font-bold text-stone-900 mb-2">
                  Образовательное пространство
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Кабинет оснащён интерактивной панелью, филологической библиотекой (более 1 200 томов классики и литературоведения), зоной для литературных гостиных и читательского клуба.
                </p>
                <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100">
                  <span>Оснащённость по ФГОС: 100%</span>
                  <span className="font-mono text-amber-800 font-semibold">Wi-Fi / МЭШ</span>
                </div>
              </div>
            </div>

            {/* Quick credentials badge card */}
            <div className="p-5 bg-stone-900 text-stone-100 rounded-xl shadow-xs">
              <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-2">
                Аттестационный лист
              </div>
              <div className="text-sm font-medium mb-3">
                {profile.category} по должности «Учитель»
              </div>
              <div className="text-xs text-stone-300 space-y-1.5 pt-3 border-t border-stone-800">
                <div className="flex justify-between">
                  <span>Педагогический стаж:</span>
                  <span className="font-mono text-white font-semibold">{profile.experienceYears} лет</span>
                </div>
                <div className="flex justify-between">
                  <span>В данном учреждении:</span>
                  <span className="font-mono text-white font-semibold">{profile.schoolYears} лет</span>
                </div>
                <div className="flex justify-between">
                  <span>Классное руководство:</span>
                  <span className="text-amber-200">10 «А» класс</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
