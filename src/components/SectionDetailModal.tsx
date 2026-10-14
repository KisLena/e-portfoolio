import React, { useState } from 'react';
import { CompetencyCard, SubCompetency } from '../data/portfolioData';
import {
  X,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Plus,
  Trash2,
  Save,
  Edit2,
  ArrowRight,
  Printer,
  Sparkles,
} from 'lucide-react';

interface SectionDetailModalProps {
  card: CompetencyCard | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateCardItems: (cardId: string, updatedItems: SubCompetency[]) => void;
}

export const SectionDetailModal: React.FC<SectionDetailModalProps> = ({
  card,
  isOpen,
  onClose,
  onUpdateCardItems,
}) => {
  if (!isOpen || !card) return null;

  const [items, setItems] = useState<SubCompetency[]>(card.items);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [newEvidenceInputs, setNewEvidenceInputs] = useState<Record<string, string>>({});
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  const handleReflectionChange = (itemId: string, text: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, reflection: text } : it))
    );
  };

  const handleAddEvidence = (itemId: string) => {
    const text = newEvidenceInputs[itemId]?.trim();
    if (!text) return;

    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId ? { ...it, evidence: [...it.evidence, text] } : it
      )
    );
    setNewEvidenceInputs((prev) => ({ ...prev, [itemId]: '' }));
    setSaveNotification('Tõendusmaterjal lisatud!');
    setTimeout(() => setSaveNotification(null), 2000);
  };

  const handleRemoveEvidence = (itemId: string, evidenceIndex: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? { ...it, evidence: it.evidence.filter((_, idx) => idx !== evidenceIndex) }
          : it
      )
    );
  };

  const handleSaveAll = () => {
    onUpdateCardItems(card.id, items);
    setEditingItemId(null);
    setSaveNotification('Kõik muudatused salvestatud!');
    setTimeout(() => setSaveNotification(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#24364B]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-[#E9EDF1] shadow-2xl overflow-hidden relative max-h-[94vh] flex flex-col">
        {/* Top Section Color Stripe with Spikes */}
        <div className="relative pt-2">
          <div className="flex items-end gap-2 pl-6 -mb-px">
            <span className="w-5 h-2 rounded-t-sm" style={{ backgroundColor: card.color }} />
            <span className="w-5 h-2 rounded-t-sm" style={{ backgroundColor: card.color }} />
            <span className="w-5 h-2 rounded-t-sm" style={{ backgroundColor: card.color }} />
          </div>
          <div className="h-2 w-full" style={{ backgroundColor: card.color }} />
        </div>

        {/* Modal Header */}
        <div className="p-6 bg-white border-b border-[#E9EDF1] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Иконка в заголовке окрашена в цвет раздела */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs text-white"
              style={{
                backgroundColor: card.color,
                color: card.id === 'organisatsioon' ? '#24364B' : '#FFFFFF',
              }}
            >
              <FileText className="w-6 h-6" />
            </div>

            <div>
              <div className="text-xs text-[#566A80] mb-0.5">
                Valdkond 0{card.number} · {card.subtitle}
              </div>
              <h2 className="font-serif font-bold text-[#24364B] text-2xl sm:text-3xl tracking-tight">
                {card.number}. {card.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-[#566A80] hover:text-[#24364B] hover:bg-[#FAFAF7] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 bg-white">
          {/* Notification banner if saved: Green (#65B889) */}
          {saveNotification && (
            <div className="p-3.5 bg-[#65B889]/15 border border-[#65B889] text-[#2C6E48] text-xs sm:text-sm rounded-lg flex items-center gap-2 animate-in fade-in sticky top-0 z-10 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#65B889]" />
              <span className="font-semibold">{saveNotification}</span>
            </div>
          )}

          <div className="text-xs text-[#566A80] bg-[#FAFAF7] p-4 rounded-xl border border-[#E9EDF1] leading-relaxed">
            {card.description}
          </div>

          {/* Sub-competencies List */}
          <div className="space-y-6">
            {items.map((subItem, index) => {
              const isEditingThis = editingItemId === subItem.id;

              return (
                <div
                  key={subItem.id}
                  className="rounded-2xl border border-[#E9EDF1] bg-white overflow-hidden shadow-2xs"
                >
                  {/* Шипы над блоком подпункта в цвет раздела */}
                  <div className="flex items-end gap-1.5 pl-6 pt-2 -mb-px">
                    <span className="w-4 h-1.5 rounded-t-sm" style={{ backgroundColor: card.color }} />
                    <span className="w-4 h-1.5 rounded-t-sm" style={{ backgroundColor: card.color }} />
                  </div>
                  <div className="h-1 w-full" style={{ backgroundColor: card.color }} />

                  {/* Sub-item Header */}
                  <div className="p-5 border-b border-[#E9EDF1] bg-[#FAFAF7]/50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-[#E9EDF1]"
                        style={{ color: card.darkColor }}
                      >
                        {card.number}.{index + 1}
                      </span>
                      <h4 className="font-bold text-base text-[#24364B]">
                        {subItem.name}
                      </h4>
                    </div>

                    <button
                      onClick={() =>
                        setEditingItemId(isEditingThis ? null : subItem.id)
                      }
                      className="px-3 py-1.5 text-xs font-semibold text-[#24364B] bg-white border border-[#24364B]/30 hover:bg-[#FAFAF7] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-[#111827]" />
                      <span>{isEditingThis ? 'Valmis' : 'Muuda'}</span>
                    </button>
                  </div>

                  {/* Sub-item Content */}
                  <div className="p-5 sm:p-6 space-y-5">
                    {/* 1. Self-reflection */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#24364B] mb-2 flex items-center justify-between">
                        <span>Eneseanalüüs ja refleksioon:</span>
                        <span className="text-[#65B889] text-[11px] font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#65B889]" />
                          <span>Pädevus kinnitatud</span>
                        </span>
                      </div>

                      {isEditingThis ? (
                        <textarea
                          rows={4}
                          value={subItem.reflection}
                          onChange={(e) =>
                            handleReflectionChange(subItem.id, e.target.value)
                          }
                          className="w-full p-3.5 text-sm bg-white border border-[#111827] rounded-xl text-[#24364B] leading-relaxed focus:ring-1 focus:ring-[#111827] focus:outline-hidden"
                        />
                      ) : (
                        <p className="text-sm text-[#24364B] leading-relaxed p-4 bg-[#FAFAF7] rounded-xl border border-[#E9EDF1]">
                          {subItem.reflection}
                        </p>
                      )}
                    </div>

                    {/* 2. Evidence (Light Blue #EAF4FC cards) */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#24364B] mb-2">
                        Tõendusmaterjalid ({subItem.evidence.length}):
                      </div>

                      <div className="space-y-2">
                        {subItem.evidence.map((evText, evIdx) => (
                          <div
                            key={evIdx}
                            className="p-3.5 rounded-xl border border-[#111827]/25 bg-[#EAF4FC] flex items-center justify-between gap-3 text-xs sm:text-sm text-[#24364B]"
                          >
                            <div className="flex items-start gap-2.5">
                              <FileText className="w-4 h-4 text-[#111827] shrink-0 mt-0.5" />
                              <span className="leading-snug font-medium">{evText}</span>
                            </div>

                            {/* Кнопка «Kustuta» с красной рамкой и красным текстом */}
                            {isEditingThis && (
                              <button
                                onClick={() => handleRemoveEvidence(subItem.id, evIdx)}
                                className="px-2.5 py-1 text-xs font-semibold text-[#E85D5D] hover:bg-[#E85D5D]/15 border border-[#E85D5D] rounded-md transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Kustuta</span>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Add new evidence: Main button «+ Lisa tõend» (Blue #111827 with white text) */}
                      {isEditingThis && (
                        <div className="mt-3 flex gap-2">
                          <input
                            type="text"
                            placeholder="Sisesta uue tõendusmaterjali kirjeldus..."
                            value={newEvidenceInputs[subItem.id] || ''}
                            onChange={(e) =>
                              setNewEvidenceInputs((prev) => ({
                                ...prev,
                                [subItem.id]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddEvidence(subItem.id);
                              }
                            }}
                            className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E9EDF1] rounded-lg text-[#24364B] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] focus:outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddEvidence(subItem.id)}
                            className="px-4 py-2 text-xs font-semibold text-white bg-[#111827] hover:bg-[#27272A] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Lisa tõend</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer: Main button Blue (#111827) «Salvesta», Secondary White with dark border */}
        <div className="p-4 sm:p-5 bg-[#FAFAF7] border-t border-[#E9EDF1] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#24364B] bg-white hover:bg-[#FAFAF7] border border-[#24364B]/30 rounded-lg transition-colors cursor-pointer"
          >
            ← Tagasi avalehele
          </button>

          <button
            onClick={handleSaveAll}
            className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#111827] hover:bg-[#27272A] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs focus:ring-2 focus:ring-[#111827]"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Salvesta muudatused</span>
          </button>
        </div>
      </div>
    </div>
  );
};
