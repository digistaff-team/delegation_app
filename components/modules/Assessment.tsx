import React, { useState } from 'react';
import { ArrowRight, UserCheck, Activity, BarChart, Clock, Shield } from 'lucide-react';
import { Button } from '../Button';
import { useLocalization } from '../useLocalization';

interface AssessmentProps {
  onNext: () => void;
}

const icons = [BarChart, Activity, UserCheck, Clock, Shield];

export const Assessment: React.FC<AssessmentProps> = ({ onNext }) => {
  const t = useLocalization();
  const [activeTab, setActiveTab] = useState(0);

  const criteria = t.assessment.criteria.map((criterion, index) => ({
    ...criterion,
    icon: icons[index],
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header>
        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-4">
          {t.assessment.module}
        </span>
        <h1 className="text-3xl font-bold text-slate-900">{t.assessment.title}</h1>
        <p className="text-slate-600 mt-2">
          {t.assessment.subtitle}
        </p>
      </header>

      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-4 space-y-2">
          {criteria.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                activeTab === index
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.title}</span>
            </button>
          ))}
        </div>

        <div className="md:col-span-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                {React.createElement(criteria[activeTab].icon, { size: 32 })}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{criteria[activeTab].title}</h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {criteria[activeTab].desc}
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-amber-900 font-medium">👉 {criteria[activeTab].action}</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
              {activeTab < criteria.length - 1 ? (
                <Button onClick={() => setActiveTab((prev) => prev + 1)} variant="secondary">
                  {t.assessment.next} <ArrowRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button onClick={onNext} className="gap-2">
                  {t.assessment.goToPractice}
                  <ArrowRight size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
