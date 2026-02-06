import React, { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle, RefreshCw } from 'lucide-react';
import { Button } from '../Button';

interface StrategyProps {
    onNext: () => void;
}

interface TaskItem {
    id: number;
    title: string;
    type: 'delegate' | 'keep' | 'partial';
    explanation: string;
}

const tasks: TaskItem[] = [
    { 
        id: 1, 
        title: "Еженедельный отчет о продажах (сбор данных)", 
        type: 'delegate', 
        explanation: "Это рутинная задача с четкими правилами. Идеально для делегирования." 
    },
    { 
        id: 2, 
        title: "Дисциплинарная беседа с опоздавшим сотрудником", 
        type: 'keep', 
        explanation: "Управление персоналом и дисциплина требуют вашего авторитета и не могут быть делегированы." 
    },
    { 
        id: 3, 
        title: "Стратегическое планирование на год", 
        type: 'keep', 
        explanation: "Задачи высокой важности и конфиденциальности должны оставаться у руководителя." 
    },
    { 
        id: 4, 
        title: "Подготовка черновика презентации для клиентов", 
        type: 'partial', 
        explanation: "Черновик может сделать сотрудник (частичное делегирование), финальную правку - вы." 
    },
    { 
        id: 5, 
        title: "Урегулирование конфликта с VIP-клиентом", 
        type: 'keep', 
        explanation: "Задачи с высокой ценой ошибки и репутационными рисками требуют вашего личного участия." 
    }
];

export const Strategy: React.FC<StrategyProps> = ({ onNext }) => {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [feedback, setFeedback] = useState<{ correct: boolean, text: string } | null>(null);
    const [score, setScore] = useState(0);

    const currentTask = tasks[currentTaskIndex];
    const isFinished = currentTaskIndex >= tasks.length;

    const handleChoice = (choice: 'delegate' | 'keep' | 'partial') => {
        const isCorrect = choice === currentTask.type;
        setFeedback({
            correct: isCorrect,
            text: isCorrect ? "Верно! " + currentTask.explanation : "Не совсем так. " + currentTask.explanation
        });
        if (isCorrect) setScore(s => s + 1);
    };

    const nextTask = () => {
        setFeedback(null);
        setCurrentTaskIndex(prev => prev + 1);
    };

    const reset = () => {
        setCurrentTaskIndex(0);
        setScore(0);
        setFeedback(null);
    }

    if (isFinished) {
        return (
            <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in py-12">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Результат</h2>
                    <div className="text-6xl font-bold text-blue-600 mb-4">{score} / {tasks.length}</div>
                    <p className="text-slate-600 mb-8">
                        {score === tasks.length ? "Отличная интуиция! Вы четко понимаете границы делегирования." : "Неплохо, но есть над чем поработать. Помните: рутину - отдаем, стратегию и риски - оставляем."}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={reset}><RefreshCw className="mr-2 w-4 h-4"/> Попробовать снова</Button>
                        <Button onClick={onNext}>Следующий шаг <ArrowRight className="ml-2 w-4 h-4"/></Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
             <header className="mb-8">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-4">
                  Модуль 2
                </span>
                <h1 className="text-3xl font-bold text-slate-900">Что делегировать?</h1>
                <p className="text-slate-600 mt-2">
                    Оцените задачу и решите: Делегировать полностью, Оставить себе или Делегировать частично?
                </p>
            </header>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-500">Задача {currentTaskIndex + 1} из {tasks.length}</span>
                    <span className="text-sm font-semibold text-blue-600">Счет: {score}</span>
                </div>
                
                <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-800 mb-8">{currentTask.title}</h3>
                    
                    {!feedback ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button onClick={() => handleChoice('delegate')} className="p-4 rounded-xl border-2 border-slate-100 hover:border-green-500 hover:bg-green-50 transition-all font-semibold text-slate-700">
                                🟢 Делегировать
                            </button>
                            <button onClick={() => handleChoice('partial')} className="p-4 rounded-xl border-2 border-slate-100 hover:border-yellow-500 hover:bg-yellow-50 transition-all font-semibold text-slate-700">
                                🟡 Частично
                            </button>
                            <button onClick={() => handleChoice('keep')} className="p-4 rounded-xl border-2 border-slate-100 hover:border-red-500 hover:bg-red-50 transition-all font-semibold text-slate-700">
                                🔴 Оставить себе
                            </button>
                        </div>
                    ) : (
                        <div className={`p-6 rounded-xl mb-6 ${feedback.correct ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                            <div className="flex items-center justify-center gap-2 font-bold mb-2">
                                {feedback.correct ? <Check /> : <X />}
                                {feedback.correct ? 'Правильно!' : 'Ошибка'}
                            </div>
                            <p>{feedback.text}</p>
                            <Button onClick={nextTask} className="mt-4 bg-white border border-current hover:bg-slate-50 text-inherit">
                                Далее
                            </Button>
                        </div>
                    )}
                </div>
            </div>

             <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><HelpCircle size={18}/> Критерии выбора</h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc pl-5">
                    <li><strong>Доступность:</strong> Есть ли у кого-то время и навыки?</li>
                    <li><strong>Время:</strong> Есть ли у вас время на обучение?</li>
                    <li><strong>Развитие:</strong> Поможет ли это сотруднику вырасти?</li>
                    <li><strong>Приоритет:</strong> Насколько высоки риски ошибки?</li>
                </ul>
            </div>
        </div>
    );
};