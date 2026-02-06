import React, { useState } from 'react';
import { Bot, Loader2, X, Copy, Check, Calendar } from 'lucide-react';
import { Button } from '../Button';
import { DelegationPlan } from '../../types';
import { ProTalkService } from '../../services/proTalkService';

export const DelegationPlanner: React.FC = () => {
  const [plan, setPlan] = useState<DelegationPlan>({
    taskName: '',
    purpose: '',
    deadline: '',
    goals: '',
    responsiblePerson: '',
    authorityLevel: '',
    checkpoints: ''
  });

  // AI State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Инициализация сервиса ProTalk с данными из переменных окружения или демо-данными
  const proTalkService = new ProTalkService({
    botToken: import.meta.env.VITE_PROTALK_BOT_TOKEN || 'demo_token', 
    botId: Number(import.meta.env.VITE_PROTALK_BOT_ID) || 53194
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const generateInstruction = async () => {
    setIsAiLoading(true);

    const authorityMap: Record<string, string> = {
      'None': 'Нет (только исполнение)',
      'Some': 'Частичные (согласование решений)',
      'All': 'Полные (действуй сам)',
      '': 'Не указаны'
    };

    const prompt = `
      Ты - опытный ментор и руководитель. Твоя задача - сформулировать готовый текст поручения (устного или письменного) для сотрудника на основе плана делегирования.
      
      Вводные данные:
      1. Задача: ${plan.taskName || "Не указана"}
      2. Контекст (Зачем): ${plan.purpose || "Не указан"}
      3. Сотрудник: ${plan.responsiblePerson || "Сотрудник"}
      4. Срок: ${plan.deadline || "Не указан"}
      5. Результат (KPI): ${plan.goals || "Не указаны"}
      6. Полномочия: ${authorityMap[plan.authorityLevel] || "Не указаны"}
      7. Контроль: ${plan.checkpoints || "Не указан"}

      Напиши текст обращения к сотруднику. Структура:
      - Приветствие и мотивационная часть (почему это важно).
      - Суть задачи и ожидаемый результат.
      - Обозначение сроков и точек контроля.
      - Уточнение полномочий и готовность помочь.
      
      Тон: Профессиональный, поддерживающий, четкий.
    `;

    try {
      const chatId = `planner_${Date.now()}`;
      const responseText = await proTalkService.sendMessage(chatId, prompt);
      setAiResult(responseText);
    } catch (error) {
      console.error(error);
      setAiResult("Произошла ошибка при генерации. Пожалуйста, проверьте соединение.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (aiResult) {
      navigator.clipboard.writeText(aiResult);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Removed text-slate-900 from base classes to handle it conditionally for date/select
  const inputClasses = "w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400";

  return (
    <div className="max-w-4xl mx-auto animate-fade-in relative">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
            Инструмент
          </span>
          <h1 className="text-3xl font-bold text-slate-900">Конструктор поручений</h1>
        </div>
      </header>

      {/* AI Result Modal */}
      {aiResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <Bot size={20} />
                <span>Готовая формулировка</span>
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
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <Button onClick={() => setAiResult(null)} variant="ghost">Закрыть</Button>
              <Button onClick={copyToClipboard} className="gap-2 min-w-[140px]">
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                {isCopied ? "Скопировано" : "Копировать"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 border-r border-slate-100 space-y-6">
            <h3 className="font-semibold text-lg text-slate-800 border-b pb-2">1. Детали задачи</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Название задачи</label>
                <input 
                  name="taskName"
                  value={plan.taskName}
                  onChange={handleChange}
                  className={`${inputClasses} text-slate-900`}
                  placeholder="Например: Подготовка отчета"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Зачем это нужно? (Контекст)</label>
                <textarea 
                  name="purpose"
                  value={plan.purpose}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClasses} text-slate-900`}
                  placeholder="Объясните важность задачи для мотивации..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Измеримые цели (KPI)</label>
                <textarea 
                  name="goals"
                  value={plan.goals}
                  onChange={handleChange}
                  rows={2}
                  className={`${inputClasses} text-slate-900`}
                  placeholder="Как мы поймем, что задача выполнена успешно?"
                />
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6 bg-slate-50">
            <h3 className="font-semibold text-lg text-slate-800 border-b pb-2">2. Люди и Процесс</h3>
            
            <div className="space-y-4">
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Кому делегируем?</label>
                <input 
                  name="responsiblePerson"
                  value={plan.responsiblePerson}
                  onChange={handleChange}
                  className={`${inputClasses} text-slate-900`}
                  placeholder="Имя сотрудника"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Срок исполнения</label>
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
                   <label className="block text-sm font-medium text-slate-700 mb-1">Полномочия</label>
                   <select 
                    name="authorityLevel"
                    value={plan.authorityLevel}
                    onChange={handleChange}
                    className={`${inputClasses} ${plan.authorityLevel ? 'text-slate-900' : 'text-slate-400'}`}
                  >
                    <option value="" disabled hidden>Выберите...</option>
                    <option value="None">Нет (только исполнение)</option>
                    <option value="Some">Частичные</option>
                    <option value="All">Полные</option>
                  </select>
                </div>
              </div>

               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Точки контроля и отчетность</label>
                <textarea 
                  name="checkpoints"
                  value={plan.checkpoints}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClasses} text-slate-900`}
                  placeholder="Как часто сотрудник должен отчитываться? (Промежуточные дедлайны)"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col items-center gap-4">
           <Button onClick={generateInstruction} disabled={isAiLoading} size="lg" className="w-full md:w-auto min-w-[280px] gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white shadow-md hover:shadow-lg transition-all">
             {isAiLoading ? <Loader2 size={20} className="animate-spin" /> : <Bot size={20} />}
             Сформулировать поручение
           </Button>
           <p className="text-slate-500 text-sm text-center">
             Заполните все поля, и AI Коуч создаст готовый текст поручения.
           </p>
        </div>
      </div>
    </div>
  );
};