import React from 'react';
import { ArrowRight, Clock, Target, AlertTriangle } from 'lucide-react';
import { Button } from '../Button';
import { useLocalization } from '../useLocalization';

interface IntroductionProps {
  onNext: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onNext }) => {
  const t = useLocalization();

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <header className="text-center space-y-4 mb-12">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold tracking-wide uppercase">
          {t.introduction.module}
        </span>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {t.introduction.title}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {t.introduction.subtitle}
        </p>
      </header>

      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-amber-500" />
          {t.introduction.iWillDoItMyself.title}
        </h2>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="mb-4">
            {t.introduction.iWillDoItMyself.description}
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li><strong>{t.introduction.iWillDoItMyself.perfectionism}</strong> {t.introduction.iWillDoItMyself.perfectionismDescription}</li>
            <li><strong>{t.introduction.iWillDoItMyself.timeInvestment}</strong> {t.introduction.iWillDoItMyself.timeInvestmentDescription}</li>
          </ul>
          <p>
            {t.introduction.iWillDoItMyself.burnoutWarning}
          </p>
          <p className="mt-4">
            Какие преимущества возникают, если Вы начинаете делегировать?
          </p>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{t.introduction.forYou.title}</h3>
          </div>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.introduction.forYou.description}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{t.introduction.forTeam.title}</h3>
          </div>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.introduction.forTeam.description}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">{t.introduction.didYouKnow.title}</h3>
        <p className="text-blue-800 text-sm">
          {t.introduction.didYouKnow.fact1}
        </p>
      </div>

      <div className="flex justify-end pt-8">
        <Button onClick={onNext} size="lg" className="gap-2 group">
          {t.introduction.goToPractice}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};
