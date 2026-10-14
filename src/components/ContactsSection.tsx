import React, { useState } from 'react';
import { TeacherProfile } from '../data/teacherData';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Share2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

interface ContactsSectionProps {
  profile: TeacherProfile;
}

export const ContactsSection: React.FC<ContactsSectionProps> = ({ profile }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Вопрос по учебной программе');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contacts" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2">
            07. Обратная связь
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
            Контакты и приёмные часы
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Всегда открыта к профессиональному диалогу с коллегами, методическому сотрудничеству, общению с родителями и ответами на вопросы учащихся.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-amber-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                    Место работы и кабинет
                  </div>
                  <div className="text-sm font-semibold text-stone-900 mt-0.5">
                    {profile.school}
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5">
                    {profile.classroom} (главный корпус, 3 этаж)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                    Электронная почта
                  </div>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm font-mono font-medium text-stone-900 hover:text-amber-800 transition-colors mt-0.5 block"
                  >
                    {profile.email}
                  </a>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Ответ в течение 24 часов в рабочие дни
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                    Телефон кафедры
                  </div>
                  <div className="text-sm font-mono font-medium text-stone-900 mt-0.5">
                    {profile.phone}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Пн–Пт с 15:00 до 17:30
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                    Часы приёма родителей
                  </div>
                  <div className="text-sm font-semibold text-stone-900 mt-0.5">
                    Вторник: 15:30 — 17:00
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    По предварительной записи через сайт или журнал
                  </div>
                </div>
              </div>
            </div>

            {/* Telegram channel card */}
            <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                  Методический блог
                </span>
                <MessageCircle className="w-5 h-5 text-amber-300" />
              </div>
              <h4 className="font-serif font-bold text-white text-base mb-1">
                Канал «Слово и мысль | Заметки словесника»
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                Разборы трудных заданий ЕГЭ, списки внеклассного чтения, цитаты классиков и методические советы для коллег и старшеклассников.
              </p>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/15"
              >
                <span>Подписаться в Telegram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Direct message form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-8 rounded-2xl border border-stone-200/90 shadow-2xs">
            <h3 className="font-serif font-bold text-stone-900 text-xl mb-1">
              Написать сообщение педагогу
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Задайте интересующий вопрос по обучению, консультации или методическому материалу.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-serif font-bold mb-1">Сообщение отправлено!</h4>
                <p className="text-xs text-emerald-800">
                  Благодарим за обращение. Ответ поступит на указанный вами адрес электронной почты.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Петров"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Email для ответа *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ivan@mail.ru"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Тема обращения
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                  >
                    <option>Вопрос по учебной программе</option>
                    <option>Вопрос по домашнему заданию или оценкам</option>
                    <option>Методический запрос от коллеги</option>
                    <option>Организационный вопрос (родительский комитет)</option>
                    <option>Предложение о выступлении / семинаре</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Текст сообщения *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Подробно опишите ваш вопрос..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Отправить</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
