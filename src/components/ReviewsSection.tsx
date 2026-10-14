import React, { useState } from 'react';
import { ReviewItem, INITIAL_REVIEWS } from '../data/teacherData';
import { MessageSquare, Star, Quote, PlusCircle, CheckCircle, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Выпускник');
  const [year, setYear] = useState('Выпуск 2025');
  const [highlight, setHighlight] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      role: role.trim(),
      year: year.trim(),
      rating,
      text: text.trim(),
      highlight: highlight.trim() || text.trim().slice(0, 60) + '...',
    };

    setReviews([newRev, ...reviews]);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowAddModal(false);
      setAuthor('');
      setText('');
      setHighlight('');
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 bg-stone-100/50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2">
              06. Слова признательности
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
              Отзывы выпускников, родителей и коллег
            </h2>
            <p className="mt-3 text-stone-600 text-base leading-relaxed">
              Мнения тех, кто учился, сотрудничал и доверял образование своих детей на протяжении многих лет педагогической работы.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 text-xs font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg shadow-2xs whitespace-nowrap self-start md:self-auto cursor-pointer flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-amber-800" />
            <span>Оставить отзыв</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:border-amber-700/40 hover:shadow-xs transition-all"
            >
              <div>
                {/* Rating Stars & Year */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-stone-400">{rev.year}</span>
                </div>

                {/* Highlight Quote */}
                <h3 className="font-serif font-bold text-stone-900 text-base mb-3 leading-snug">
                  «{rev.highlight}»
                </h3>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic mb-6">
                  {rev.text}
                </p>
              </div>

              {/* Author attribution (No pill sandwich) */}
              <div className="pt-4 border-t border-stone-100">
                <div className="text-sm font-bold text-stone-900 font-serif">
                  {rev.author}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  {rev.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Add Review */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 relative">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">
                Оставить отзыв или слова благодарности
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Ваш отзыв будет отображен на сайте педагога.
              </p>

              {isSuccess ? (
                <div className="py-8 text-center text-emerald-800">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <p className="font-serif font-bold text-lg">Спасибо за тёплые слова!</p>
                  <p className="text-xs text-stone-500 mt-1">Отзыв успешно добавлен в портфолио.</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Ваше имя и фамилия *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Например: Дарья Морозова"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Статус / Роль
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                      >
                        <option>Выпускник</option>
                        <option>Родитель ученика</option>
                        <option>Ученик</option>
                        <option>Коллега-педагог</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Класс или год
                      </label>
                      <input
                        type="text"
                        placeholder="Выпуск 2024 / 10 «А»"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Ключевая мысль / заголовок
                    </label>
                    <input
                      type="text"
                      placeholder="Главное впечатление или воспоминание..."
                      value={highlight}
                      onChange={(e) => setHighlight(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Текст отзыва *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Напишите несколько искренних предложений..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg transition-colors cursor-pointer"
                    >
                      Опубликовать отзыв
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
