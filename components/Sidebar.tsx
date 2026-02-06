import React from 'react';
import { BookOpen, CheckCircle, PenTool, Bot, BarChart2, Menu, X, ExternalLink } from 'lucide-react';
import { ModuleType } from '../types';

interface SidebarProps {
  currentModule: ModuleType;
  onSelectModule: (module: ModuleType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentModule, onSelectModule, isOpen, setIsOpen }) => {
  
  const navItems = [
    { id: ModuleType.INTRODUCTION, label: 'Введение и теория', icon: BookOpen },
    { id: ModuleType.STRATEGY, label: 'Что делегировать?', icon: CheckCircle },
    { id: ModuleType.ASSESSMENT, label: 'Кому делегировать?', icon: BarChart2 },
    { id: ModuleType.PLANNING_TOOL, label: 'План делегирования', icon: PenTool },
    { id: ModuleType.AI_COACH, label: 'AI Коуч', icon: Bot },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-slate-900/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 z-30 h-full w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:flex
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3 font-bold text-xl text-slate-800">
            <img 
              src="https://i.ibb.co/VYn2JXwF/100-100.png" 
              alt="Logo" 
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span>Делегирование</span>
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

        {/* Promo Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-600 mb-3 leading-relaxed font-medium">
              ИССКУСТВО ТОЧНЫХ ПОРУЧЕНИЙ - онлайн-курс для современных руководителей
            </p>
            <a 
              href="https://abconsult.pro/itp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors gap-2"
            >
              Подробнее
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};