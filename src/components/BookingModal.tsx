import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Mail, MessageSquare, Download } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  classroom: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  classroom,
}) => {
  const [role, setRole] = useState<'Родитель' | 'Ученик' | 'Коллега'>('Родитель');
  const [topic, setTopic] = useState('Успеваемость и текущие оценки');
  const [date, setDate] = useState('2026-10-20');
  const [time, setTime] = useState('15:30');
  const [name, setName] = useState('');
  const [studentInfo, setStudentInfo] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `КТ-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketId(generatedId);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-stone-100/80 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-lg sm:text-xl">
              Запись на педагогическую консультацию
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {classroom} · Приёмные часы по расписанию
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                  Кем вы являетесь?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Родитель', 'Ученик', 'Коллега'] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        role === r
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consultation Topic */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Тема консультации
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                >
                  <option>Успеваемость и текущие оценки</option>
                  <option>Подготовка к ОГЭ / ЕГЭ (выбор стратегии)</option>
                  <option>Олимпиадная подготовка и спецкурсы</option>
                  <option>Исследовательский проект и конференция</option>
                  <option>Вопросы адаптации и классного руководства</option>
                  <option>Методический обмен опытом для коллег</option>
                </select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Желаемая дата
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Удобное время
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  >
                    <option>15:00 (Очно)</option>
                    <option>15:30 (Очно)</option>
                    <option>16:00 (Очно)</option>
                    <option>16:30 (Очно)</option>
                    <option>17:00 (Дистанционно / Сферум)</option>
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Ваше ФИО *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Иванова Ольга Петровна"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Ученик и класс
                  </label>
                  <input
                    type="text"
                    placeholder="Иван Иванов, 10 «А»"
                    value={studentInfo}
                    onChange={(e) => setStudentInfo(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Телефон для связи *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Электронная почта / Telegram
                  </label>
                  <input
                    type="text"
                    placeholder="example@mail.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Комментарий или конкретный вопрос
                </label>
                <textarea
                  rows={2}
                  placeholder="Опишите кратко, какие вопросы вы хотели бы обсудить на встрече..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg shadow-xs cursor-pointer transition-colors"
                >
                  Подтвердить запись
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation Ticket */
            <div className="text-center py-4 space-y-5 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-serif font-bold text-stone-900">
                  Запись успешно подтверждена!
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Номер талона консультации: <strong className="font-mono text-stone-800">{ticketId}</strong>
                </p>
              </div>

              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Заявитель:</span>
                  <span className="font-medium text-stone-900">{name} ({role})</span>
                </div>
                {studentInfo && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Ученик:</span>
                    <span className="font-medium text-stone-900">{studentInfo}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-500">Тема:</span>
                  <span className="font-medium text-stone-900">{topic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Дата и время:</span>
                  <span className="font-mono font-bold text-amber-900">{date} в {time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Место:</span>
                  <span className="text-stone-900">{classroom}</span>
                </div>
              </div>

              <p className="text-xs text-stone-500">
                Уведомление и напоминание отправлены на указанные контакты. При необходимости изменения времени вы можете связаться по почте.
              </p>

              <button
                onClick={handleReset}
                className="w-full py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              >
                Закрыть окно
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
