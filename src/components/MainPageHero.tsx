import React, { useState, useEffect } from 'react';
import { RobotMascot } from './RobotMascot';
import { CompetencyCard } from '../data/portfolioData';
import {
  User,
  Sparkles,
  GraduationCap,
  Users,
  Network,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface MainPageHeroProps {
  cards: CompetencyCard[];
  onOpenCard: (card: CompetencyCard) => void;
  introText: string;
  onUpdateIntroText: (text: string) => void;
}

export const MainPageHero: React.FC<MainPageHeroProps> = ({
  cards,
  onOpenCard,
  introText,
  onUpdateIntroText,
}) => {
  const [text, setText] = useState(introText);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    setText(introText);
  }, [introText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    onUpdateIntroText(val);
    setSaveStatus('Salvestatud');
    const timer = setTimeout(() => setSaveStatus(null), 2000);
    return () => clearTimeout(timer);
  };

  const getSectionIcon = (id: string) => {
    switch (id) {
      case 'mina-ise':
        return <User className="w-5 h-5 text-white" />;
      case 'enesehoid':
        return <Sparkles className="w-5 h-5 text-white" />;
      case 'oppija-toetamine':
        return <GraduationCap className="w-5 h-5 text-white" />;
      case 'organisatsioon':
        return <Users className="w-5 h-5 text-white" />;
      case 'okosusteem':
        return <Network className="w-5 h-5 text-white" />;
      default:
        return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP HERO SPLIT: Left title & editable intro, Right Robot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Heading, Subtitle and Editable Textarea */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Title in 2 lines: Elena Galanina / e-portfoolio */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#24364B] tracking-tight leading-[1.1] mb-5">
              <div>Elena Galanina</div>
              <div>e-portfoolio</div>
            </h1>

            {/* Editable Introduction Textarea */}
            <div className="relative">
              <textarea
                value={text}
                onChange={handleTextChange}
                rows={5}
                placeholder="Tutvustan siin ennast ja oma professionaalset teekonda õpetajana."
                className="w-full p-4 rounded-xl border border-[#E9EDF1] bg-white text-[#24364B] text-sm sm:text-base leading-relaxed focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/20 focus:outline-hidden transition-all shadow-2xs resize-y"
              />

              {/* Status indicator */}
              <div className="flex items-center justify-between text-xs text-[#566A80] mt-1.5 px-1">
                <span className="italic text-[11px]">
                  Tekst on otse redigeeritav ja salvestub automaatselt
                </span>
                {saveStatus && (
                  <span className="text-[#65B889] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{saveStatus}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Milo Robot Mascot */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <RobotMascot size="md" />
          </div>
        </div>

        {/* 5 CARDS IN A ROW (EXACT LAYOUT FROM SCREENSHOT) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative pt-2 group flex flex-col"
            >
              {/* «Шипы» (3 rounded studs above the top border in section color) */}
              <div className="flex items-end gap-1.5 pl-5 -mb-px">
                <span
                  className="w-4 h-2 rounded-t-sm transition-transform group-hover:-translate-y-0.5"
                  style={{ backgroundColor: card.color }}
                />
                <span
                  className="w-4 h-2 rounded-t-sm transition-transform group-hover:-translate-y-0.5"
                  style={{ backgroundColor: card.color }}
                />
                <span
                  className="w-4 h-2 rounded-t-sm transition-transform group-hover:-translate-y-0.5"
                  style={{ backgroundColor: card.color }}
                />
              </div>

              {/* Card Container: Pure white, rounded-2xl, gray border */}
              <div
                onClick={() => onOpenCard(card)}
                className="bg-white rounded-2xl border border-[#E9EDF1] shadow-2xs overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#111827]/40 flex-1 flex flex-col justify-between cursor-pointer"
              >
                {/* Thick top stripe in section color */}
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: card.color }}
                />

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Icon Container with colored background */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white mb-4 shadow-2xs transition-transform group-hover:scale-105"
                      style={{ backgroundColor: card.color }}
                    >
                      {getSectionIcon(card.id)}
                    </div>

                    {/* Card Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#24364B] leading-tight mb-2 group-hover:text-[#111827] transition-colors">
                      {card.title}
                    </h3>
                  </div>

                  {/* «Ava →» Button in darker shade of section color */}
                  <div className="pt-4 mt-2">
                    <span
                      className="font-bold text-xs sm:text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      style={{ color: card.darkColor }}
                    >
                      <span>Ava →</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
