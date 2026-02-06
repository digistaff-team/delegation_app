import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Introduction } from './components/modules/Introduction';
import { Strategy } from './components/modules/Strategy';
import { Assessment } from './components/modules/Assessment';
import { DelegationPlanner } from './components/modules/DelegationPlanner';
import { AICoach } from './components/AICoach';
import { ModuleType } from './types';

function App() {
  const [currentModule, setCurrentModule] = useState<ModuleType>(ModuleType.INTRODUCTION);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentModule) {
      case ModuleType.INTRODUCTION:
        return <Introduction onNext={() => setCurrentModule(ModuleType.STRATEGY)} />;
      case ModuleType.STRATEGY:
        return <Strategy onNext={() => setCurrentModule(ModuleType.ASSESSMENT)} />;
      case ModuleType.ASSESSMENT:
        return <Assessment onNext={() => setCurrentModule(ModuleType.PLANNING_TOOL)} />;
      case ModuleType.PLANNING_TOOL:
        return <DelegationPlanner />;
      case ModuleType.AI_COACH:
        return <AICoach />;
      default:
        return <Introduction onNext={() => setCurrentModule(ModuleType.STRATEGY)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        currentModule={currentModule} 
        onSelectModule={setCurrentModule} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <img src="https://i.ibb.co/VYn2JXwF/100-100.png" alt="Logo" className="w-8 h-8 rounded-lg shadow-sm" />
            <span className="font-bold text-slate-800">Мастерство управления</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Main Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
           {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;