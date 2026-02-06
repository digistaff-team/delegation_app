import React from 'react';
import { ArrowRight, Clock, Target, AlertTriangle } from 'lucide-react';
import { Button } from '../Button';
import { ModuleType } from '../../types';

interface IntroductionProps {
  onNext: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onNext }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <header className="text-center space-y-4 mb-12">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold tracking-wide uppercase">
          Модуль 1
        </span>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Искусство Делегирования
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Освободите свое время для стратегических задач и усильте команду, научившись правильно передавать полномочия.
        </p>
      </header>

      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-amber-500" />
          "Я сделаю это сам"
        </h2>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="mb-4">
            Вам знакомо чувство, что проще сделать задачу самому, чем объяснять кому-то другому? 
            Это классическая ловушка менеджера. Существуют две главные причины, почему мы боимся делегировать:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li><strong>Перфекционизм:</strong> Убеждение, что только вы можете сделать работу правильно.</li>
            <li><strong>Инвестиции времени:</strong> Обучение и контроль кажутся более долгими, чем само выполнение задачи.</li>
          </ul>
          <p>
            Однако, без делегирования вы рискуете перегореть, утонув в операционке. <br />Вы становитесь "узким горлышком" для своей команды.
          </p>
          <br />
          <p>
            Какие преимущества вы приобретаете, когда начинаете делегировать?
          </p>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Для вас</h3>
          </div>
          <p className="text-base text-slate-600 leading-relaxed">
            Освобождается время для приоритетных задач высокого уровня, которые действительно требуют вашей экспертизы.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Для команды</h3>
          </div>
          <p className="text-base text-slate-600 leading-relaxed">
            Сотрудники получают новые навыки, мотивацию и возможности для карьерного роста через ответственность.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Знаете ли вы?</h3>
        <p className="text-blue-800 text-sm">
          По данным исследований, менеджеры, которые эффективно делегируют, на 33% чаще получают повышение, чем те, кто пытается все делать самостоятельно.
        </p>
      </div>

      <div className="flex justify-end pt-8">
        <Button onClick={onNext} size="lg" className="gap-2 group">
          Перейти к практике
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};