import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/teacherData';
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookCheck,
  Printer,
} from 'lucide-react';

export const InteractiveQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);

  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
    setStudentName('');
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <section id="quiz" className="py-20 bg-stone-100/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2">
            04. Интерактивная мастерская
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
            Экспресс-тренажёр по культуре речи и словесности
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Проверьте себя в пяти ключевых вопросах из банка заданий ЕГЭ и олимпиадных тестов. После прохождения можно получить именной электронный сертификат грамотности.
          </p>
        </div>

        {/* Quiz Sandbox Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden max-w-3xl mx-auto">
          {!quizCompleted ? (
            <div className="p-6 sm:p-10">
              {/* Progress Bar & Header */}
              <div className="flex items-center justify-between gap-4 mb-6 text-xs text-stone-500">
                <span className="font-semibold text-amber-800">
                  {currentQuestion.topic}
                </span>
                <span className="font-mono">
                  Вопрос {currentIdx + 1} из {QUIZ_QUESTIONS.length}
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full bg-stone-100 h-1.5 rounded-full mb-8 overflow-hidden">
                <div
                  className="bg-amber-700 h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentIdx + (isAnswerSubmitted ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mb-6 leading-snug">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, idx) => {
                  let optionStyles = 'border-stone-200 bg-white hover:border-stone-400 text-stone-800';

                  if (selectedAnswer === idx && !isAnswerSubmitted) {
                    optionStyles = 'border-amber-700 bg-amber-50/70 text-amber-950 ring-1 ring-amber-700';
                  }

                  if (isAnswerSubmitted) {
                    if (idx === currentQuestion.correctIndex) {
                      optionStyles = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-medium';
                    } else if (selectedAnswer === idx) {
                      optionStyles = 'border-rose-500 bg-rose-50 text-rose-950';
                    } else {
                      optionStyles = 'border-stone-100 bg-stone-50/50 text-stone-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyles}`}
                    >
                      <span>{option}</span>
                      {isAnswerSubmitted && idx === currentQuestion.correctIndex && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {isAnswerSubmitted && selectedAnswer === idx && idx !== currentQuestion.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Educational Explanation Feedback Box */}
              {isAnswerSubmitted && (
                <div className={`p-4 rounded-xl border mb-6 text-xs sm:text-sm leading-relaxed animate-in fade-in ${
                  selectedAnswer === currentQuestion.correctIndex
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50/80 border-rose-200 text-rose-900'
                }`}>
                  <div className="font-semibold mb-1 flex items-center gap-1.5">
                    {selectedAnswer === currentQuestion.correctIndex ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-700" />
                        <span>Верно! Отличная филологическая зоркость</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-700" />
                        <span>Обратите внимание на правило:</span>
                      </>
                    )}
                  </div>
                  <p className="text-stone-700 mt-1">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <div className="text-xs text-stone-400">
                  Правильных ответов: <span className="font-mono font-bold text-stone-700">{score}</span>
                </div>

                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedAnswer === null}
                    className={`px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                      selectedAnswer === null
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-stone-900 text-white hover:bg-amber-900 cursor-pointer shadow-xs'
                    }`}
                  >
                    Проверить ответ
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>{currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Следующий вопрос' : 'Итоги теста'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results & Certificate Generation Stage */
            <div className="p-8 sm:p-10 text-center animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                Тестирование завершено!
              </h3>

              <p className="text-sm text-stone-600 mb-6">
                Ваш результат: <strong className="text-stone-900 font-mono text-base">{score}</strong> из <strong className="text-stone-900 font-mono text-base">{QUIZ_QUESTIONS.length}</strong> баллов ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
              </p>

              {/* Printable Certificate Preview */}
              <div className="p-6 bg-stone-50 border border-stone-200 rounded-xl mb-6 text-left max-w-lg mx-auto print:border-2 print:border-stone-800">
                <div className="text-center pb-4 border-b border-stone-200 mb-4">
                  <div className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">
                    ГБОУ «Академическая гимназия № 1505» · Кабинет словесности
                  </div>
                  <h4 className="text-lg font-serif font-bold text-stone-900 mt-1">
                    СЕРТИФИКАТ ГРАМОТНОСТИ
                  </h4>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Введите имя и фамилию для сертификата:
                  </label>
                  <input
                    type="text"
                    placeholder="Например: Иван Смирнов, 10 «А»"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
                  />
                </div>

                <div className="text-xs text-stone-600 space-y-1.5 pt-2">
                  <p>
                    Настоящим подтверждается успешное прохождение экспресс-теста по нормам русского языка и литературоведению.
                  </p>
                  <div className="flex justify-between pt-2 border-t border-stone-200 text-stone-500 font-mono text-[11px]">
                    <span>Преподаватель: Е.Н. Кислякова</span>
                    <span>Результат: {score}/{QUIZ_QUESTIONS.length}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Пройти заново</span>
                </button>

                <button
                  onClick={handlePrintCertificate}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Распечатать / Сохранить сертификат</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
