import React, { useState } from 'react';
import { TeacherProfile } from '../data/teacherData';
import { X, Save, RotateCcw, CheckCircle } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TeacherProfile;
  onSave: (updatedProfile: TeacherProfile) => void;
  onReset: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<TeacherProfile>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'experienceYears' ||
        name === 'schoolYears' ||
        name === 'avgExamScore' ||
        name === 'olympiadWinnersCount' ||
        name === 'publicationsCount'
          ? Number(value) || 0
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-stone-100/90 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-lg">
              Редактор портфолио педагога
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Персонализируйте данные, квалификацию, статистику и контакты
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          {savedSuccess ? (
            <div className="py-12 text-center text-emerald-800 animate-in fade-in">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <h4 className="text-lg font-serif font-bold">Изменения сохранены!</h4>
              <p className="text-xs text-stone-500 mt-1">Портфолио обновлено.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ФИО полностью *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Краткое имя для шапки *
                  </label>
                  <input
                    type="text"
                    name="shortName"
                    required
                    value={formData.shortName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Должность и предмет *
                </label>
                <input
                  type="text"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Квалификационная категория
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Звание / Почётный статус
                  </label>
                  <input
                    type="text"
                    name="honors"
                    value={formData.honors}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Учебное заведение
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Номер кабинета
                  </label>
                  <input
                    type="text"
                    name="classroom"
                    value={formData.classroom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Педагогическое кредо
                </label>
                <textarea
                  name="motto"
                  rows={2}
                  value={formData.motto}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Методическая тема
                </label>
                <textarea
                  name="methodologyTopic"
                  rows={2}
                  value={formData.methodologyTopic}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              {/* Stats Numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Стаж (лет)
                  </label>
                  <input
                    type="number"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 text-sm bg-white border border-stone-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Ср. балл ЕГЭ
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="avgExamScore"
                    value={formData.avgExamScore}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 text-sm bg-white border border-stone-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Олимпиадники
                  </label>
                  <input
                    type="number"
                    name="olympiadWinnersCount"
                    value={formData.olympiadWinnersCount}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 text-sm bg-white border border-stone-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Публикации
                  </label>
                  <input
                    type="number"
                    name="publicationsCount"
                    value={formData.publicationsCount}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 text-sm bg-white border border-stone-300 rounded font-mono"
                  />
                </div>
              </div>

              {/* Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Телефон
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onReset();
                    onClose();
                  }}
                  className="px-3.5 py-2 text-xs font-medium text-stone-500 hover:text-stone-800 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Сбросить к образцу</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Сохранить данные</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
