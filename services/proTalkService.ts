import { ProTalkConfig } from '../types';

const API_BASE_URL = 'https://api.pro-talk.ru/api/v1.0';

export class ProTalkService {
  private config: ProTalkConfig;

  constructor(config: ProTalkConfig) {
    this.config = config;
  }

  /**
   * Sends a message to the ProTalk Bot API
   */
  async sendMessage(chatId: string, message: string): Promise<string> {
    const url = `${API_BASE_URL}/ask/${this.config.botToken}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bot_id: this.config.botId,
          chat_id: chatId,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // If we got a 200 OK but no 'done' field (or empty), use fallback
      if (data && typeof data.done === 'string' && data.done.trim().length > 0) {
        return data.done;
      }
      
      console.warn('ProTalk API returned 200 but no valid "done" content. Falling back to simulation.', data);
      return this.getFallbackResponse(message);

    } catch (error) {
      console.error('ProTalk API Error:', error);
      // Fallback for demo purposes if CORS/Network fails in this environment
      return this.getFallbackResponse(message);
    }
  }

  // Simulated AI response logic strictly based on the PDF content for fallback scenarios
  // This ensures the app is usable even if the user doesn't have a valid ProTalk token immediately.
  private getFallbackResponse(message: string): string {
    const lowerMsg = message.toLowerCase();
    
    // Handle Delegation Planner Prompt Fallback
    if (message.includes('Вводные данные:') || message.includes('Ты - опытный ментор')) {
      return `[РЕЖИМ СИМУЛЯЦИИ]
      
Привет! Вот вариант поручения для вашего сотрудника:

"Коллега, привет! У меня есть важная задача — [Название задачи].
Контекст: [Контекст из вашего плана].

Я поручаю это тебе, так как уверен в твоих навыках.
Ожидаемый результат: [Цели].
Срок: [Дедлайн].

По полномочиям: [Полномочия].
Давай сверим статус в точках контроля: [Точки контроля].

Если возникнут вопросы — я открыт для обсуждения. Удачи!"`;
    }

    if (lowerMsg.includes('привет') || lowerMsg.includes('здравств')) {
      return "Здравствуйте! Я ваш AI-коуч по делегированию. Я помогу вам разобраться, какие задачи стоит передать команде, а какие оставить себе. С чего начнем?";
    }
    if (lowerMsg.includes('страх') || lowerMsg.includes('боюсь') || lowerMsg.includes('сам')) {
      return "Это распространенный барьер. Многие боятся делегировать, потому что думают, что сделают лучше сами (синдром 'Хочешь сделать хорошо - сделай сам'). Но это ведет к выгоранию. Делегирование освобождает ваше время для стратегических задач.";
    }
    if (lowerMsg.includes('кому') || lowerMsg.includes('выбрать')) {
      return "При выборе сотрудника оцените 5 факторов: уровень в иерархии (делегируйте на уровень ниже), навыки, потенциал развития, текущую загрузку и надежность. Кого из вашей команды вы рассматриваете?";
    }
    if (lowerMsg.includes('план') || lowerMsg.includes('как')) {
      return "Для успешного делегирования создайте план: четко опишите задачу, установите сроки и цели, определите уровень полномочий и точки контроля. Хотите помогу составить план для конкретной задачи?";
    }
    
    return "Интересный вопрос. В контексте делегирования важно помнить: делегируйте рутину, оставляйте себе стратегию. Могу подробнее рассказать о матрице выбора задач или оценке сотрудников.";
  }
}