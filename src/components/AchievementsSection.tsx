import React, { useState } from 'react';
import { StudentAchievement, CertificateItem } from '../data/teacherData';
import { Award, Trophy, ZoomIn, X, Medal, ExternalLink, Calendar, CheckCircle } from 'lucide-react';

interface AchievementsSectionProps {
  studentAchievements: StudentAchievement[];
  certificates: CertificateItem[];
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  studentAchievements,
  certificates,
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'teacher'>('students');
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [selectedCertCategory, setSelectedCertCategory] = useState<string>('Все');

  const certCategories = ['Все', 'Награды и звания', 'Профессиональные конкурсы', 'Благодарности', 'Повышение квалификации'];

  const filteredCertificates = certificates.filter((c) =>
    selectedCertCategory === 'Все' ? true : c.category === selectedCertCategory
  );

  return (
    <section id="achievements" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2">
            03. Результативность и признание
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
            Достижения учеников и профессиональные награды
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Главный показатель работы учителя — интеллектуальные и личностные победы его воспитанников: призовые места на Всероссийской олимпиаде школьников, 100 баллов на ЕГЭ и поступление в ведущие университеты страны.
          </p>
        </div>

        {/* Tab switchers: Students achievements vs Teacher awards */}
        <div className="flex items-center gap-2 p-1.5 bg-stone-200/80 rounded-xl mb-8 max-w-md">
          <button
            onClick={() => setActiveTab('students')}
            className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer text-center ${
              activeTab === 'students'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Успехи учеников (Олимпиады и ЕГЭ)
          </button>
          <button
            onClick={() => setActiveTab('teacher')}
            className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer text-center ${
              activeTab === 'teacher'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Дипломы и грамоты педагога
          </button>
        </div>

        {activeTab === 'students' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 3-in-a-row grid on desktop, complying with reference 7 (Portfolio) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentAchievements.map((st) => (
                <div
                  key={st.id}
                  className="p-6 bg-white rounded-xl border border-stone-200 shadow-2xs hover:border-amber-700/40 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                      <span className="font-mono text-amber-800 font-semibold">{st.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{st.grade}</span>
                      <span aria-hidden="true">·</span>
                      <span>{st.discipline}</span>
                    </div>

                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-lg font-serif font-bold text-stone-900">
                        {st.studentName}
                      </h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200/70 shrink-0">
                        {st.result}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-stone-800 mb-2">
                      {st.competition}
                    </p>

                    <div className="text-xs text-stone-500 mb-4">
                      Уровень: {st.stage}
                    </div>

                    {st.projectTitle && (
                      <div className="text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-100 italic">
                        «{st.projectTitle}»
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                    <span>Подготовка: Е.Н. Кислякова</span>
                    <Medal className="w-4 h-4 text-amber-600" />
                  </div>
                </div>
              ))}
            </div>

            {/* Aggregated statistics table / summary banner */}
            <div className="p-6 bg-stone-900 text-stone-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                  Сводная статистика за 5 лет
                </div>
                <h4 className="text-lg font-serif font-bold text-white mb-1">
                  100% подтверждение баллов и успешное поступление
                </h4>
                <p className="text-xs text-stone-300 max-w-xl">
                  Выпускники гимназии становятся студентами филологических, журналистских, лингвистических и культурологических факультетов МГУ, НИУ ВШЭ, СПбГУ, МГИМО и Литературного института им. Горького.
                </p>
              </div>
              <div className="flex items-center gap-6 shrink-0 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-300">
                    89.4
                  </div>
                  <div className="text-xs text-stone-400">
                    средний балл ЕГЭ
                  </div>
                </div>
                <div className="h-8 w-px bg-stone-800" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                    7
                  </div>
                  <div className="text-xs text-stone-400">
                    стобалльников
                  </div>
                </div>
                <div className="h-8 w-px bg-stone-800" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-300">
                    46
                  </div>
                  <div className="text-xs text-stone-400">
                    призёров ВсОШ
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'teacher' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Category filter tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl max-w-2xl">
              {certCategories.map((cCat) => (
                <button
                  key={cCat}
                  onClick={() => setSelectedCertCategory(cCat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCertCategory === cCat
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cCat}
                </button>
              ))}
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCertificates.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCertificate(cert)}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-amber-700/50 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="aspect-4/3 relative bg-stone-100 overflow-hidden">
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="p-2.5 rounded-full bg-white/90 text-stone-900 shadow-sm">
                        <ZoomIn className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span className="text-amber-800 font-semibold">{cert.category}</span>
                        <span className="font-mono">{cert.year}</span>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-stone-900 line-clamp-2 mb-2 group-hover:text-amber-950">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-2">
                        {cert.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-stone-100 text-xs text-stone-500 font-medium">
                      {cert.issuer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fullscreen Lightbox / Certificate Detail Modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-3xl w-full border border-stone-200 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-stone-800 hover:bg-stone-100 shadow-md transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="max-h-[50vh] overflow-hidden rounded-xl border border-stone-200 mb-6 bg-stone-100 flex items-center justify-center">
                  <img
                    src={selectedCertificate.imageUrl}
                    alt={selectedCertificate.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[50vh] w-auto object-contain mx-auto"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span className="font-semibold text-amber-800">{selectedCertificate.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{selectedCertificate.year} год</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-2">
                  {selectedCertificate.title}
                </h3>

                <p className="text-sm text-stone-700 leading-relaxed mb-4">
                  {selectedCertificate.description}
                </p>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                  <strong className="text-stone-800">Организация-эмитент:</strong> {selectedCertificate.issuer}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
