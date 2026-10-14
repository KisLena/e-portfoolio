import React, { useState } from 'react';
import { ScheduleDay, INITIAL_SCHEDULE } from '../data/teacherData';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  CalendarDays,
  FileCheck,
  Send,
} from 'lucide-react';

interface ScheduleSectionProps {
  onOpenBookingModal: () => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  onOpenBookingModal,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const activeDay: ScheduleDay = INITIAL_SCHEDULE[selectedDayIndex];

  return (
    <section id="schedule" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2">
              05. Организация учебного процесса
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
              Расписание уроков и приёмные часы
            </h2>
            <p className="mt-3 text-stone-600 text-base leading-relaxed">
              График учебных занятий, элективных курсов, работы олимпиадного кружка «Олимп словесности» и консультационных часов для учащихся и родителей на текущее полугодие.
            </p>
          </div>

          <button
            onClick={onOpenBookingModal}
            className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg shadow-xs transition-colors flex items-center gap-2 whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>Записаться на консультацию</span>
          </button>
        </div>

        {/* Day Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
          {INITIAL_SCHEDULE.map((day, idx) => (
            <button
              key={day.dayName}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                selectedDayIndex === idx
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <span className="font-mono font-bold text-amber-400">{day.shortDay}</span>
              <span>{day.dayName}</span>
            </button>
          ))}
        </div>

        {/* Main Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Lessons List (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
            <div className="p-5 bg-stone-100/70 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                Учебные занятия: {activeDay.dayName}
              </h3>
              <span className="text-xs text-stone-500 font-mono">
                {activeDay.lessons.length} уроков
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {activeDay.lessons.map((lesson, idx) => (
                <div
                  key={idx}
                  className="p-5 hover:bg-stone-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center font-mono font-semibold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span className="font-mono font-medium">{lesson.time}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-amber-900">{lesson.grade}</span>
                        <span aria-hidden="true">·</span>
                        <span>{lesson.room}</span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-stone-900">
                        {lesson.subject}
                      </h4>
                      {lesson.topic && (
                        <p className="text-xs text-stone-600 mt-1">
                          Тема: {lesson.topic}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono text-stone-400 bg-stone-50 px-2.5 py-1 rounded border border-stone-100">
                      Гимназический план
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consultations & Office Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
              <h3 className="font-serif font-bold text-stone-900 text-base mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-700" />
                <span>Консультации в этот день</span>
              </h3>

              {activeDay.consultations.length > 0 ? (
                <div className="space-y-4">
                  {activeDay.consultations.map((c, i) => (
                    <div
                      key={i}
                      className="p-4 bg-amber-50/40 rounded-xl border border-amber-200/60 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-900">
                        <span>{c.time}</span>
                        <span className="text-[11px] font-sans font-normal text-stone-500">
                          {c.format}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-stone-900">
                        {c.purpose}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-500 italic">
                  В этот день регулярных консультаций не запланировано. Возможна индивидуальная запись.
                </p>
              )}
            </div>

            {/* Quick consultation guidelines card */}
            <div className="p-6 bg-stone-900 text-stone-100 rounded-2xl shadow-xs space-y-3">
              <h4 className="text-sm font-serif font-bold text-amber-300">
                Памятка для родителей
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Индивидуальные встречи по вопросам успеваемости и адаптации проводятся по предварительной записи во вторник (15:30 — 17:00).
              </p>
              <div className="pt-3 border-t border-stone-800 flex justify-between items-center text-xs">
                <span className="text-stone-400">Кабинет:</span>
                <span className="text-stone-200 font-medium">№ 314 (3 этаж)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
