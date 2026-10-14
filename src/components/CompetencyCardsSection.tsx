import React, { useState } from 'react';
import { CompetencyCard, SubCompetency } from '../data/portfolioData';
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Heart,
  Users,
  Building,
  Globe2,
  Search,
  Plus,
  Minus,
  FileText,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface CompetencyCardsSectionProps {
  cards: CompetencyCard[];
  onSelectCompetency: (card: CompetencyCard, item: SubCompetency) => void;
  onOpenCardDetails: (card: CompetencyCard) => void;
  onAddEvidenceDirectly?: (card: CompetencyCard, item: SubCompetency) => void;
}

export const CompetencyCardsSection: React.FC<CompetencyCardsSectionProps> = ({
  cards,
  onSelectCompetency,
  onOpenCardDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const getCardIcon = (id: string) => {
    switch (id) {
      case 'mina-ise':
        return <BookOpen className="w-5 h-5" />;
      case 'enesehoid':
        return <Heart className="w-5 h-5" />;
      case 'oppija-toetamine':
        return <Users className="w-5 h-5" />;
      case 'organisatsioon':
        return <Building className="w-5 h-5" />;
      case 'okosusteem':
        return <Globe2 className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const filteredCards = cards.filter((card) => {
    if (activeFilter !== 'all' && card.id !== activeFilter) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const matchesCard =
      card.title.toLowerCase().includes(query) ||
      card.description.toLowerCase().includes(query);
    const matchesItems = card.items.some(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.reflection.toLowerCase().includes(query) ||
        item.evidence.some((e) => e.toLowerCase().includes(query))
    );
    return matchesCard || matchesItems;
  });

  return (
    <section id="cards-overview" className="py-20 bg-[#FAFAF7] border-b border-[#E9EDF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#111827] uppercase tracking-widest mb-2">
              Õpetaja kutsestandard · Viis põhipädevust
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#24364B] tracking-tight [text-wrap:balance]">
              Pädevuskaardid ja tõendusmaterjalid
            </h2>
            <p className="mt-3 text-[#566A80] text-base leading-relaxed">
              Igal kaardil on oma värvimärk: ülariba, roboti-stiilis шипы ja värviline ikoon. Klõpsake nupul <strong>«Ava →»</strong> või osapädevusel täismahus refleksiooni ja tõendite avamiseks.
            </p>
          </div>

          {/* Quick search input */}
          <div className="relative min-w-[280px] sm:min-w-[340px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#566A80]" />
            <input
              type="text"
              placeholder="Otsi pädevust, märksõna või tõendit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-[#E9EDF1] rounded-lg text-[#24364B] placeholder:text-[#566A80] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Filter Segmented Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#E9EDF1] rounded-xl mb-12 max-w-fit shadow-2xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-[#111827] text-white shadow-xs'
                : 'text-[#566A80] hover:text-[#24364B] hover:bg-[#FAFAF7]'
            }`}
          >
            Kõik 5 kaarti (31 osapädevust)
          </button>
          {cards.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveFilter(c.id)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeFilter === c.id
                  ? 'text-white shadow-xs'
                  : 'text-[#566A80] hover:text-[#24364B] hover:bg-[#FAFAF7]'
              }`}
              style={{
                backgroundColor: activeFilter === c.id ? c.color : undefined,
                color: activeFilter === c.id && c.id === 'organisatsioon' ? '#24364B' : undefined,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: c.color }}
              />
              <span>{c.number}. {c.title}</span>
            </button>
          ))}
        </div>

        {/* The 5 Cards */}
        <div className="space-y-12">
          {filteredCards.map((card) => {
            return (
              <div
                id={`card-${card.id}`}
                key={card.id}
                className="relative pt-3"
              >
                {/* 1. ШИПЫ (Decorative Lego/robot studs above the top edge) */}
                <div className="flex items-end gap-2.5 pl-8 -mb-px">
                  <span
                    className="w-6 h-3 rounded-t-md shadow-xs transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: card.color }}
                  />
                  <span
                    className="w-6 h-3 rounded-t-md shadow-xs transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: card.color }}
                  />
                  <span
                    className="w-6 h-3 rounded-t-md shadow-xs transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: card.color }}
                  />
                  <span
                    className="w-6 h-3 rounded-t-md shadow-xs transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: card.color }}
                  />
                  <span
                    className="w-6 h-3 rounded-t-md shadow-xs transition-transform hover:-translate-y-0.5 hidden sm:inline-block"
                    style={{ backgroundColor: card.color }}
                  />
                  <span
                    className="w-6 h-3 rounded-t-md shadow-xs transition-transform hover:-translate-y-0.5 hidden sm:inline-block"
                    style={{ backgroundColor: card.color }}
                  />
                </div>

                {/* Card Container: Pure white card with gray border (#E9EDF1) */}
                <div className="bg-white rounded-2xl border border-[#E9EDF1] shadow-2xs overflow-hidden transition-all hover:border-[#111827]/40">
                  {/* 2. ТОЛСТАЯ ВЕРХНЯЯ ПОЛОСКА (Thick top border in section color) */}
                  <div
                    className="h-2.5 w-full"
                    style={{ backgroundColor: card.color }}
                  />

                  {/* Card Header Strip */}
                  <div className="p-6 sm:p-8 border-b border-[#E9EDF1] flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
                    <div className="flex items-start gap-4">
                      {/* 3. ФОН ИКОНКИ (Icon background in section color) */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                        style={{
                          backgroundColor: card.color,
                          color: card.id === 'organisatsioon' ? '#24364B' : '#FFFFFF',
                        }}
                      >
                        {getCardIcon(card.id)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#566A80] mb-1">
                          <span
                            className="font-mono font-bold"
                            style={{ color: card.darkColor }}
                          >
                            Valdkond 0{card.number}
                          </span>
                          <span aria-hidden="true" className="text-[#E9EDF1]">·</span>
                          <span>{card.subtitle}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#24364B] tracking-tight">
                          {card.number}. {card.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#566A80] mt-1 max-w-2xl leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {/* Actions and «Ava →» Button */}
                    <div className="flex items-center gap-4 shrink-0 self-start md:self-center">
                      <span className="text-xs font-mono font-semibold text-[#566A80] bg-[#FAFAF7] px-3 py-1.5 rounded-lg border border-[#E9EDF1] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#65B889]" />
                        <span>{card.items.length}/{card.items.length} pädevust</span>
                      </span>

                      {/* НАДПИСЬ «Ava →» окрашена в более тёмный оттенок того же цвета */}
                      <button
                        onClick={() => onOpenCardDetails(card)}
                        className="px-4 py-2 text-xs sm:text-sm font-bold rounded-lg border border-[#E9EDF1] bg-white hover:bg-[#FAFAF7] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs group focus:ring-2 focus:ring-[#111827]"
                        style={{ color: card.darkColor }}
                      >
                        <span>Ava →</span>
                      </button>
                    </div>
                  </div>

                  {/* Sub-competencies List */}
                  <div className="p-6 sm:p-8 bg-white">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#566A80] mb-4 flex items-center justify-between">
                      <span>Valdkonna osapädevused:</span>
                      <span className="text-[11px] text-[#566A80] font-normal">
                        Klõpsake osapädevusel või ikoonil [+] detailseks vaateks
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {card.items.map((item, idx) => {
                        const isExpanded = Boolean(expandedItems[item.id]);

                        return (
                          <div
                            key={item.id}
                            onClick={() => onSelectCompetency(card, item)}
                            className="p-4 sm:p-5 rounded-xl border border-[#E9EDF1] bg-white hover:bg-[#FAFAF7] hover:border-[#111827]/40 transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
                          >
                            <div>
                              <div className="flex items-center justify-between text-xs text-[#566A80] mb-2">
                                <span className="font-mono text-xs font-medium">
                                  {card.number}.{idx + 1}
                                </span>

                                <div className="flex items-center gap-2">
                                  <span className="text-[#65B889] flex items-center gap-1 text-[11px] font-medium">
                                    <CheckCircle2 className="w-3 h-3 text-[#65B889]" />
                                    <span>Tõendatud</span>
                                  </span>

                                  {/* Значок «+/–» у сворачиваемых блоков (СИНИЙ #111827) */}
                                  <button
                                    onClick={(e) => toggleExpand(e, item.id)}
                                    className="p-1 rounded text-[#111827] hover:bg-[#111827]/10 transition-colors"
                                    title={isExpanded ? 'Ahenda' : 'Laienda'}
                                  >
                                    {isExpanded ? (
                                      <Minus className="w-3.5 h-3.5 text-[#111827]" />
                                    ) : (
                                      <Plus className="w-3.5 h-3.5 text-[#111827]" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              <h4 className="text-sm font-semibold text-[#24364B] group-hover:text-[#111827] transition-colors leading-snug mb-2">
                                {item.name}
                              </h4>

                              <p className="text-xs text-[#566A80] line-clamp-2 leading-relaxed mb-3">
                                {item.reflection}
                              </p>

                              {/* Expanded Inline Evidence Container: Uses light blue (#EAF4FC) ONLY for evidence! */}
                              {isExpanded && (
                                <div className="mt-3 pt-3 border-t border-[#E9EDF1] space-y-2 animate-in fade-in">
                                  <div className="text-[11px] font-semibold text-[#24364B]">
                                    Tõendusmaterjalid:
                                  </div>
                                  {item.evidence.map((ev, i) => (
                                    <div
                                      key={i}
                                      className="p-2.5 rounded-lg bg-[#EAF4FC] border border-[#111827]/20 text-xs text-[#24364B] flex items-start gap-2"
                                    >
                                      <FileText className="w-3.5 h-3.5 text-[#111827] shrink-0 mt-0.5" />
                                      <span className="leading-snug">{ev}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Card Footer with Evidence count and colored Ava */}
                            <div className="pt-3 mt-3 border-t border-[#E9EDF1] flex items-center justify-between text-[11px] text-[#566A80]">
                              <span>{item.evidence.length} tõendusmaterjali</span>
                              <span
                                className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                                style={{ color: card.darkColor }}
                              >
                                <span>Ava →</span>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
