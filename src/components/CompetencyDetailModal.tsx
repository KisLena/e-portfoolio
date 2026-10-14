import React, { useState } from 'react';
import { CompetencyCard, SubCompetency } from '../data/portfolioData';
import {
  X,
  CheckCircle2,
  FileText,
  ArrowRight,
  Plus,
  Edit2,
  Save,
  Trash2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface CompetencyDetailModalProps {
  card: CompetencyCard;
  item: SubCompetency;
  isOpen: boolean;
  onClose: () => void;
  onUpdateItem: (updatedItem: SubCompetency) => void;
}

export const CompetencyDetailModal: React.FC<CompetencyDetailModalProps> = ({
  card,
  item,
  isOpen,
  onClose,
  onUpdateItem,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [reflectionText, setReflectionText] = useState(item.reflection);
  const [evidenceList, setEvidenceList] = useState<string[]>([...item.evidence]);
  const [actionPointsList, setActionPointsList] = useState<string[]>([...item.actionPoints]);
  const [newEvidenceInput, setNewEvidenceInput] = useState('');
  const [newActionInput, setNewActionInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleAddEvidence = () => {
    if (!newEvidenceInput.trim()) {
      setErrorMessage('Palun sisestage tõendusmaterjali kirjeldus enne lisamist.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    setEvidenceList([...evidenceList, newEvidenceInput.trim()]);
    setNewEvidenceInput('');
    setErrorMessage('');
  };

  const handleRemoveEvidence = (index: number) => {
    setEvidenceList(evidenceList.filter((_, i) => i !== index));
  };

  const handleAddAction = () => {
    if (!newActionInput.trim()) return;
    setActionPointsList([...actionPointsList, newActionInput.trim()]);
    setNewActionInput('');
  };

  const handleRemoveAction = (index: number) => {
    setActionPointsList(actionPointsList.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updated: SubCompetency = {
      ...item,
      reflection: reflectionText,
      evidence: evidenceList,
      actionPoints: actionPointsList,
    };
    onUpdateItem(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsEditing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24364B]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-[#E9EDF1] shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Top Section Color Stripe with Spikes above it */}
        <div className="relative pt-2">
          {/* Spikes in section color */}
          <div className="flex items-end gap-2 pl-6 -mb-px">
            <span
              className="w-5 h-2 rounded-t-md"
              style={{ backgroundColor: card.color }}
            />
            <span
              className="w-5 h-2 rounded-t-md"
              style={{ backgroundColor: card.color }}
            />
            <span
              className="w-5 h-2 rounded-t-md"
              style={{ backgroundColor: card.color }}
            />
          </div>
          <div className="h-2 w-full" style={{ backgroundColor: card.color }} />
        </div>

        {/* Modal Header */}
        <div className="p-6 bg-white border-b border-[#E9EDF1] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Иконка в заголовке окрашена в цвет раздела */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-2xs text-white"
              style={{
                backgroundColor: card.color,
                color: card.id === 'organisatsioon' ? '#24364B' : '#FFFFFF',
              }}
            >
              <FileText className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-[#566A80] mb-0.5">
                <span className="font-semibold font-mono" style={{ color: card.darkColor }}>
                  {card.number}. {card.title}
                </span>
                <span aria-hidden="true" className="text-[#E9EDF1]">·</span>
                <span>Kutsestandard tase 6</span>
              </div>
              <h3 className="font-serif font-bold text-[#24364B] text-xl sm:text-2xl leading-snug">
                {item.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1.5 text-xs font-semibold text-[#24364B] bg-white hover:bg-[#FAFAF7] border border-[#24364B]/30 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs focus:ring-2 focus:ring-[#111827]"
            >
              <Edit2 className="w-3.5 h-3.5 text-[#111827]" />
              <span className="hidden sm:inline">{isEditing ? 'Vaata' : 'Muuda analüüsi'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#566A80] hover:text-[#24364B] hover:bg-[#FAFAF7] rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-7 bg-white">
          {/* Сообщение «Salvestatud» зелёное (#65B889) */}
          {savedSuccess && (
            <div className="p-3.5 bg-[#65B889]/15 border border-[#65B889] text-[#2C6E48] text-xs sm:text-sm rounded-lg flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#65B889]" />
              <span className="font-semibold">Salvestatud! Osapädevuse andmed ja tõendid edukalt uuendatud.</span>
            </div>
          )}

          {/* Ошибки тёмно-красные (#BD3E3E) */}
          {errorMessage && (
            <div className="p-3.5 bg-[#E85D5D]/15 border border-[#E85D5D] text-[#BD3E3E] text-xs sm:text-sm rounded-lg flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-[#E85D5D]" />
              <span className="font-semibold">{errorMessage}</span>
            </div>
          )}

          {/* Block 1: Sisuline eneseanalüüs ja refleksioon */}
          <div>
            {/* Шипы над блоком подпункта */}
            <div className="flex items-end gap-1.5 pl-3 mb-1">
              <span className="w-4 h-1.5 rounded-t-sm" style={{ backgroundColor: card.color }} />
              <span className="w-4 h-1.5 rounded-t-sm" style={{ backgroundColor: card.color }} />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#24364B]">
                1. Sisuline eneseanalüüs ja refleksioon
              </h4>
              <span className="text-xs text-[#65B889] flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Nõuetele vastav</span>
              </span>
            </div>

            {isEditing ? (
              <textarea
                rows={5}
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                className="w-full p-4 text-sm bg-white border border-[#111827] rounded-xl text-[#24364B] leading-relaxed focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
              />
            ) : (
              <div className="p-5 bg-[#FAFAF7] rounded-xl border border-[#E9EDF1] text-sm sm:text-base text-[#24364B] leading-relaxed">
                {reflectionText}
              </div>
            )}
          </div>

          {/* Block 2: Tõendusmaterjalid (CВЕТЛО-ГОЛУБОЙ #EAF4FC используется только для карточек с доказательствами) */}
          <div>
            {/* Шипы над блоком подпункта */}
            <div className="flex items-end gap-1.5 pl-3 mb-1">
              <span className="w-4 h-1.5 rounded-t-sm" style={{ backgroundColor: card.color }} />
              <span className="w-4 h-1.5 rounded-t-sm" style={{ backgroundColor: card.color }} />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#24364B]">
                2. Tõendusmaterjalid ja artefaktid ({evidenceList.length})
              </h4>
              <span className="text-xs text-[#566A80]">
                Eristatud helesinisel taustal (#EAF4FC)
              </span>
            </div>

            {/* List of Evidence Cards in #EAF4FC */}
            <div className="space-y-2.5">
              {evidenceList.map((ev, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[#111827]/20 bg-[#EAF4FC] flex items-center justify-between gap-3 text-xs sm:text-sm text-[#24364B] shadow-2xs"
                >
                  <div className="flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-[#111827] shrink-0 mt-0.5" />
                    <span className="leading-snug font-medium">{ev}</span>
                  </div>

                  {isEditing && (
                    <button
                      onClick={() => handleRemoveEvidence(idx)}
                      className="px-2 py-1 text-xs font-semibold text-[#E85D5D] hover:bg-[#E85D5D]/15 border border-[#E85D5D] rounded-md transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                      title="Kustuta tõend"
                    >
                      <Trash2 className="w-3 h-3 text-[#E85D5D]" />
                      <span>Kustuta</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Evidence input: Main button «+ Lisa tõend» (Blue #111827) */}
            {isEditing && (
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Sisesta uue tõendusmaterjali nimetus (nt 'Tunnikava ja diferentseeritud tööleht')..."
                  value={newEvidenceInput}
                  onChange={(e) => setNewEvidenceInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddEvidence();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E9EDF1] rounded-lg text-[#24364B] focus:border-[#111827] focus:ring-1 focus:ring-[#111827] focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleAddEvidence}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#111827] hover:bg-[#27272A] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap focus:ring-2 focus:ring-[#111827]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Lisa tõend</span>
                </button>
              </div>
            )}
          </div>

          {/* Block 3: Edasised arengusammud */}
          <div>
            {/* Шипы над блоком подпункта */}
            <div className="flex items-end gap-1.5 pl-3 mb-1">
              <span className="w-4 h-1.5 rounded-t-sm" style={{ backgroundColor: card.color }} />
              <span className="w-4 h-1.5 rounded-t-sm" style={{ backgroundColor: card.color }} />
            </div>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#24364B] mb-2">
              3. Edasised professionaalsed arengusammud
            </h4>
            <div className="space-y-2">
              {actionPointsList.map((ap, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2.5 p-2 rounded-lg bg-[#FAFAF7] border border-[#E9EDF1] text-xs sm:text-sm text-[#24364B]"
                >
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#111827] shrink-0 mt-0.5" />
                    <span>{ap}</span>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveAction(idx)}
                      className="text-[#E85D5D] hover:text-[#BD3E3E] text-xs p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Lisa arengueesmärk..."
                  value={newActionInput}
                  onChange={(e) => setNewActionInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E9EDF1] rounded-lg text-[#24364B]"
                />
                <button
                  type="button"
                  onClick={handleAddAction}
                  className="px-3 py-1.5 text-xs font-medium text-[#24364B] bg-white border border-[#24364B]/30 hover:bg-[#FAFAF7] rounded-lg cursor-pointer"
                >
                  Lisa eesmärk
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer: Main button Blue (#111827) «Salvesta», Secondary White with dark border */}
        <div className="p-4 sm:p-5 bg-[#FAFAF7] border-t border-[#E9EDF1] flex items-center justify-between">
          <div className="text-xs text-[#566A80]">
            Elena Galanina / e-portfoolio · {card.title}
          </div>

          <div className="flex items-center gap-3">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#111827] hover:bg-[#27272A] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs focus:ring-2 focus:ring-[#111827]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salvesta</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#24364B] bg-white hover:bg-[#FAFAF7] border border-[#24364B]/30 rounded-lg transition-colors cursor-pointer"
              >
                Sulge aken
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
