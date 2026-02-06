import React, { useState } from 'react';
import { Bot, Loader2, X, Copy, Check, Calendar } from 'lucide-react';
import { Button } from '../Button';
import { DelegationPlan, ProTalkConfig } from '../../types';
import { ProTalkService } from '../../services/proTalkService';
import { useLocalization } from '../useLocalization';

export const DelegationPlanner: React.FC = () => {
  const t = useLocalization();
  const [plan, setPlan] = useState<DelegationPlan>({
    taskName: '',
    purpose: '',
    deadline: '',
    goals: '',
    responsiblePerson: '',
    authorityLevel: '',
    checkpoints: '',
  });

  // AI State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const [proTalkService] = useState<ProTalkService>(() => {
    const config: ProTalkConfig = {
      botToken: import.meta.env.VITE_PROTALK_BOT_TOKEN || '',
      botId: import.meta.env.VITE_PROTALK_BOT_ID || '',
    };
    return new ProTalkService(config);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const generateInstruction = async () => {
    setIsAiLoading(true);

    const authorityMap = t.delegationPlanner.authorityMap;

    const prompt = `
      ${t.delegationPlanner.prompt.intro}
      
      ${t.delegationPlanner.prompt.dataIntro}
      ${t.delegationPlanner.prompt.task} ${plan.taskName || t.delegationPlanner.prompt.notSpecified}
      ${t.delegationPlanner.prompt.context} ${plan.purpose || t.delegationPlanner.prompt.notSpecified}
      ${t.delegationPlanner.prompt.employee} ${plan.responsiblePerson || t.delegationPlanner.prompt.employeeNotSpecified}
      ${t.delegationPlanner.prompt.deadline} ${plan.deadline || t.delegationPlanner.prompt.notSpecified}
      ${t.delegationPlanner.prompt.kpi} ${plan.goals || t.delegationPlanner.prompt.notSpecified}
      ${t.delegationPlanner.prompt.authority} ${authorityMap[plan.authorityLevel as keyof typeof authorityMap] || t.delegationPlanner.prompt.notSpecified}
      ${t.delegationPlanner.prompt.checkpoints} ${plan.checkpoints || t.delegationPlanner.prompt.notSpecified}

      ${t.delegationPlanner.prompt.structure}
      - ${t.delegationPlanner.prompt.structureItems[0]}
      - ${t.delegationPlanner.prompt.structureItems[1]}
      - ${t.delegationPlanner.prompt.structureItems[2]}
      - ${t.delegationPlanner.prompt.structureItems[3]}
      
      ${t.delegationPlanner.prompt.tone}
    `;

    try {
      const response = await proTalkService.sendMessage('delegation-planner', prompt);
      setAiResult(response || t.delegationPlanner.errors.generationFailed);
    } catch (error) {
      console.error(error);
      setAiResult(t.delegationPlanner.errors.generationError);
    } finally {
      setIsAiLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!aiResult) return;
    try {
      await navigator.clipboard.writeText(aiResult);
      setIsCopied(true);
      setCopyError(null);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Clipboard error:', error);
      setCopyError(t.delegationPlanner.errors.copyFailed);
      setIsCopied(false);
    }
  };

  const inputClasses = 'w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400';

  return (
    <div className="max-w-4xl mx-auto animate-fade-in relative">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
            {t.delegationPlanner.instrument}
          </span>
          <h1 className="text-3xl font-bold text-slate-900">{t.delegationPlanner.title}</h1>
        </div>
      </header>

      {/* AI Result Modal */}
      {aiResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <Bot size={20} />
                <span>{t.delegationPlanner.aiResult}</span>
              </div>
              <button onClick={() => setAiResult(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="prose prose-slate max-w-none">
                <p className="whitespace-pre-line text-slate-700 leading-relaxed text-base">
                  {aiResult}
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
              {copyError && (
                <span className="text-sm text-red-600 sm:mr-auto">{copyError}</span>
              )}
              <Button onClick={() => setAiResult(null)} variant="ghost">{t.delegationPlanner.close}</Button>
              <Button onClick={copyToClipboard} className="gap-2 min-w-[140px]">
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                {isCopied ? t.delegationPlanner.copied : t.delegationPlanner.copy}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 border-r border-slate-100 space-y-6">
            <h3 className="font-semibold text-lg text-slate-800 border-b pb-2">{t.delegationPlanner.taskDetails}</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.delegationPlanner.taskName}</label>
                <input
                  name="taskName"
                  value={plan.taskName}
                  onChange={handleChange}
                  className={`${inputClasses} text-slate-900`}
                  placeholder={t.delegationPlanner.taskNamePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.delegationPlanner.purpose}</label>
                <textarea
                  name="purpose"
                  value={plan.purpose}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClasses} text-slate-900`}
                  placeholder={t.delegationPlanner.purposePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.delegationPlanner.goals}</label>
                <textarea
                  name="goals"
                  value={plan.goals}
                  onChange={handleChange}
                  rows={2}
                  className={`${inputClasses} text-slate-900`}
                  placeholder={t.delegationPlanner.goalsPlaceholder}
                />
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6 bg-slate-50">
            <h3 className="font-semibold text-lg text-slate-800 border-b pb-2">{t.delegationPlanner.peopleAndProcess}</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.delegationPlanner.responsiblePerson}</label>
                <input
                  name="responsiblePerson"
                  value={plan.responsiblePerson}
                  onChange={handleChange}
                  className={`${inputClasses} text-slate-900`}
                  placeholder={t.delegationPlanner.responsiblePersonPlaceholder}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t.delegationPlanner.deadline}</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="deadline"
                      value={plan.deadline}
                      onChange={handleChange}
                      className={`${inputClasses} pr-10 ${plan.deadline ? 'text-slate-900' : 'text-slate-400'} [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer cursor-pointer`}
                      onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t.delegationPlanner.authority}</label>
                  <select
                    name="authorityLevel"
                    value={plan.authorityLevel}
                    onChange={handleChange}
                    className={`${inputClasses} ${plan.authorityLevel ? 'text-slate-900' : 'text-slate-400'}`}
                  >
                    <option value="" disabled hidden>{t.delegationPlanner.authorityPlaceholder}</option>
                    <option value="None">{t.delegationPlanner.authorityLevels.none}</option>
                    <option value="Some">{t.delegationPlanner.authorityLevels.some}</option>
                    <option value="All">{t.delegationPlanner.authorityLevels.all}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.delegationPlanner.checkpoints}</label>
                <textarea
                  name="checkpoints"
                  value={plan.checkpoints}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClasses} text-slate-900`}
                  placeholder={t.delegationPlanner.checkpointsPlaceholder}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col items-center gap-4">
          <Button onClick={generateInstruction} disabled={isAiLoading} size="lg" className="w-full md:w-auto min-w-[280px] gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white shadow-md hover:shadow-lg transition-all">
            {isAiLoading ? <Loader2 size={20} className="animate-spin" /> : <Bot size={20} />}
            {t.delegationPlanner.generateInstruction}
          </Button>
          <p className="text-slate-500 text-sm text-center">
            {t.delegationPlanner.generateInstructionHint}
          </p>
        </div>
      </div>
    </div>
  );
};
