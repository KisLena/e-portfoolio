import React, { useState } from 'react';
import { CompetencyCard } from '../data/portfolioData';
import {
  FileCheck2,
  FolderOpen,
  Download,
  Search,
  CheckCircle2,
  Printer,
  FileText,
} from 'lucide-react';

interface EvidenceSummarySectionProps {
  cards: CompetencyCard[];
  onPrint: () => void;
}

export const EvidenceSummarySection: React.FC<EvidenceSummarySectionProps> = ({
  cards,
  onPrint,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string>('all');
  const [evidenceSearch, setEvidenceSearch] = useState('');

  // Collect all evidence items with their associated sub-competency and card
  const allEvidence = cards.flatMap((card) =>
    card.items.flatMap((item) =>
      item.evidence.map((ev, i) => ({
        id: `${item.id}-ev-${i}`,
        cardId: card.id,
        cardNumber: card.number,
        cardTitle: card.title,
        cardColor: card.color,
        cardDarkColor: card.darkColor,
        competencyName: item.name,
        evidenceText: ev,
      }))
    )
  );

  const filteredEvidence = allEvidence.filter((item) => {
    if (selectedCardId !== 'all' && item.cardId !== selectedCardId) return false;
    if (!evidenceSearch.trim()) return true;
    const query = evidenceSearch.toLowerCase();
    return (
      item.evidenceText.toLowerCase().includes(query) ||
      item.competencyName.toLowerCase().includes(query) ||
      item.cardTitle.toLowerCase().includes(query)
    );
  });

  return (
    <section id="evidence" className="py-20 bg-[#FAFAF7] border-b border-[#E9EDF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#111827] uppercase tracking-widest mb-2">
              Dokumentatsioon ja kinnitused
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#24364B] tracking-tight [text-wrap:balance]">
              Tõendusmaterjalide koondtabel
            </h2>
            <p className="mt-3 text-[#566A80] text-base leading-relaxed">
              Tõendusmaterjalid on esile toodud helesinisel taustal (<strong>#EAF4FC</strong>), et need eristuksid selgelt valgel lehel.
            </p>
          </div>

          <button
            onClick={onPrint}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-[#111827] hover:bg-[#27272A] rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer self-start md:self-auto focus:ring-2 focus:ring-[#111827]"
          >
            <Printer className="w-4 h-4 text-white" />
            <span>Ekspordi koondaruanne (PDF)</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#E9EDF1] rounded-xl shadow-2xs">
            <button
              onClick={() => setSelectedCardId('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCardId === 'all'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-[#566A80] hover:text-[#24364B] hover:bg-[#FAFAF7]'
              }`}
            >
              Kõik tõendid ({allEvidence.length})
            </button>
            {cards.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCardId(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedCardId === c.id
                    ? 'text-white shadow-xs'
                    : 'text-[#566A80] hover:text-[#24364B] hover:bg-[#FAFAF7]'
                }`}
                style={{
                  backgroundColor: selectedCardId === c.id ? c.color : undefined,
                  color: selectedCardId === c.id && c.id === 'organisatsioon' ? '#24364B' : undefined,
                }}
              >
                <span>{c.number}. {c.title}</span>
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#566A80]" />
            <input
              type="text"
              placeholder="Filtreeri tõendeid..."
              value={evidenceSearch}
              onChange={(e) => setEvidenceSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E9EDF1] rounded-lg text-[#24364B] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Evidence List using #EAF4FC background cards! */}
        <div className="space-y-3">
          {filteredEvidence.map((ev, index) => (
            <div
              key={ev.id}
              className="p-4 sm:p-5 rounded-xl border border-[#111827]/25 bg-[#EAF4FC] hover:border-[#111827] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-lg bg-white border border-[#111827]/20 text-[#111827] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  {index + 1}
                </span>

                <div>
                  <div className="flex items-center gap-2 text-xs text-[#566A80] mb-0.5">
                    <span
                      className="font-semibold font-mono"
                      style={{ color: ev.cardDarkColor }}
                    >
                      {ev.cardNumber}. {ev.cardTitle}
                    </span>
                    <span aria-hidden="true" className="text-[#111827]/30">·</span>
                    <span className="text-[#24364B] font-medium">{ev.competencyName}</span>
                  </div>

                  <h4 className="text-sm font-semibold text-[#24364B] flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#111827] shrink-0" />
                    <span>{ev.evidenceText}</span>
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0 text-xs font-mono text-[#65B889] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#65B889]" />
                <span>Kinnitatud</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
