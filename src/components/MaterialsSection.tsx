import React, { useState } from 'react';
import { MaterialItem } from '../data/teacherData';
import {
  Search,
  Download,
  Eye,
  FileText,
  FileCheck,
  Presentation,
  BookOpen,
  Filter,
  CheckCircle2,
  X,
  FileDown,
} from 'lucide-react';

interface MaterialsSectionProps {
  materials: MaterialItem[];
  onAddNewMaterial?: () => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({
  materials: initialMaterials,
  onAddNewMaterial,
}) => {
  const [materialsList, setMaterialsList] = useState<MaterialItem[]>(initialMaterials);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewMaterial, setPreviewMaterial] = useState<MaterialItem | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const categories = [
    'Все',
    'Русский язык',
    'Литература',
    'ОГЭ и ЕГЭ',
    'Внеурочная деятельность',
    'Родителям',
  ];

  const filteredMaterials = materialsList.filter((mat) => {
    const matchesCategory =
      selectedCategory === 'Все' || mat.category === selectedCategory;
    const matchesQuery =
      mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.grade.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleDownload = (material: MaterialItem) => {
    // Increment download counter
    setMaterialsList((prev) =>
      prev.map((item) =>
        item.id === material.id
          ? { ...item, downloads: item.downloads + 1 }
          : item
      )
    );

    // Create a real text file content representing the curriculum document
    const content = `МЕТОДИЧЕСКАЯ РАЗРАБОТКА
Автор: Кислякова Елена Николаевна, Учитель высшей категории
ГБОУ Академическая гимназия № 1505

НАИМЕНОВАНИЕ: ${material.title}
Категория: ${material.category}
Класс / Аудитория: ${material.grade}
Тип материала: ${material.type} (${material.format})
Дата публикации: ${material.date}

АННОТАЦИЯ:
${material.summary}

ЦЕЛИ И ЗАДАЧИ:
${material.objectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

СТРУКТУРНЫЕ ЭЛЕМЕНТЫ И ЭТАПЫ РАБОТЫ:
${material.keyPoints.map((kp, i) => `— ${kp}`).join('\n')}

-----------------------------------------------------
Документ сгенерирован с официального портфолио педагога.
Кабинет литературы № 314. Электронная почта: kislyakova.lena@gmail.com
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${material.title.slice(0, 35).replace(/[^a-zA-Zа-яА-Я0-9]/g, '_')}.${material.format.toLowerCase() === 'pdf' ? 'txt' : 'txt'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotice(`Файл «${material.title.slice(0, 40)}...» успешно сохранён`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF':
        return <FileCheck className="w-4 h-4 text-rose-600" />;
      case 'PPTX':
        return <Presentation className="w-4 h-4 text-amber-600" />;
      default:
        return <FileText className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <section id="materials" className="py-20 bg-stone-100/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with editorial numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2">
              02. Открытая база знаний
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
              Методическая копилка и дидактические материалы
            </h2>
            <p className="mt-3 text-stone-600 text-base leading-relaxed">
              Авторские технологические карты уроков по ФГОС, сборники заданий для подготовки к ОГЭ и ЕГЭ, рабочие тетради и сценарии открытых мероприятий в свободном доступе для коллег, учеников и родителей.
            </p>
          </div>

          {onAddNewMaterial && (
            <button
              onClick={onAddNewMaterial}
              className="px-4 py-2.5 text-xs font-medium text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg shadow-2xs whitespace-nowrap self-start md:self-auto cursor-pointer"
            >
              + Добавить разработку
            </button>
          )}
        </div>

        {/* Download notification banner if active */}
        {downloadNotice && (
          <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{downloadNotice}</span>
            </div>
            <button
              onClick={() => setDownloadNotice(null)}
              className="text-emerald-700 hover:text-emerald-900 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter Bar & Search: Single line controls with segmented tabs */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-8">
          {/* Segmented category filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Поиск по теме, классу или слову..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition-all text-stone-900 placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Materials Grid */}
        {filteredMaterials.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-600 font-medium">По заданным критериям материалы не найдены.</p>
            <button
              onClick={() => {
                setSelectedCategory('Все');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-amber-800 font-semibold underline hover:text-amber-900"
            >
              Сбросить фильтры поиска
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((mat) => (
              <div
                key={mat.id}
                className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs hover:border-stone-400 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                    <span className="font-semibold text-amber-900">{mat.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{mat.grade}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{mat.format} ({mat.fileSize})</span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug mb-3 group-hover:text-amber-950 transition-colors">
                    {mat.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-6">
                    {mat.summary}
                  </p>
                </div>

                {/* Footer and Interactive actions */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div className="text-xs text-stone-400 font-mono">
                    {mat.downloads} скачиваний
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewMaterial(mat)}
                      className="px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                      title="Предпросмотр структуры урока"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Обзор</span>
                    </button>

                    <button
                      onClick={() => handleDownload(mat)}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-amber-900 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      title="Скачать методический материал"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Скачать</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Material Detail Preview */}
        {previewMaterial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 relative">
              <button
                onClick={() => setPreviewMaterial(null)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-800 p-1 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span className="text-amber-800 font-semibold">{previewMaterial.category}</span>
                <span aria-hidden="true">·</span>
                <span>{previewMaterial.grade}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{previewMaterial.format}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-4 pr-6">
                {previewMaterial.title}
              </h3>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 mb-6">
                <div className="text-xs uppercase font-semibold text-stone-500 tracking-wider mb-1">
                  Аннотация разработки
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {previewMaterial.summary}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 mb-2">
                    Планируемые результаты и цели урока:
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600 list-disc list-inside">
                    {previewMaterial.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-stone-900 mb-2">
                    Структурные элементы и этапы работы:
                  </h4>
                  <div className="space-y-2">
                    {previewMaterial.keyPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div className="text-xs text-stone-500">
                  Дата публикации: {previewMaterial.date}
                </div>
                <button
                  onClick={() => {
                    handleDownload(previewMaterial);
                    setPreviewMaterial(null);
                  }}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Скачать {previewMaterial.format}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
