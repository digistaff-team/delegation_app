import React from 'react';
import { BookOpen, CheckCircle, PenTool, Bot, BarChart2, X } from 'lucide-react';
import { ModuleType } from '../types';
import { useLocalization } from './useLocalization';

interface SidebarProps {
  currentModule: ModuleType;
  onSelectModule: (module: ModuleType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentModule, onSelectModule, isOpen, setIsOpen }) => {
  const t = useLocalization();

  const navItems = [
    { id: ModuleType.INTRODUCTION, label: t.sidebar.introduction, icon: BookOpen },
    { id: ModuleType.STRATEGY, label: t.sidebar.strategy, icon: CheckCircle },
    { id: ModuleType.ASSESSMENT, label: t.sidebar.assessment, icon: BarChart2 },
    { id: ModuleType.PLANNING_TOOL, label: t.sidebar.planningTool, icon: PenTool },
    { id: ModuleType.AI_COACH, label: t.sidebar.aiCoach, icon: Bot },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-900/50 lg:hidden"
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(false);
            }
          }}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:flex
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3 font-bold text-xl text-slate-800">
            <img
              src="https://i.ibb.co/VYn2JXwF/100-100.png"
              alt="Logo"
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span>
              {t.sidebar.delegationAi.part1}
              <span className="text-blue-600">{t.sidebar.delegationAi.part2}</span>
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-700 transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectModule(item.id);
                setIsOpen(false);
              }}
              className={`
                flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-xl transition-all
                ${currentModule === item.id
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <item.icon size={20} className={currentModule === item.id ? 'text-blue-600' : 'text-slate-400'} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 shrink-0">
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl text-white">
            <h4 className="font-semibold text-sm mb-1">{t.sidebar.biteSizedTraining}</h4>
            <p className="text-xs opacity-90">{t.sidebar.basedOnMindTools}</p>
          </div>
        </div>
      </div>
    </>
  );
};
