'use client'

import { useState, useRef, useEffect } from 'react'
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Bot, User } from 'lucide-react'
import axios from 'axios'

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null); // Реф для автоматической прокрутки
// Пример массива с заранее подготовленными ответами
const predefinedResponses = [
  {
    prompt: "найди мне парковку life fitness и сколько там мест?",
    response: "Нашел парковку life fitness,50 свободных мест"
  },
  {
    prompt: "что ты можешь сделать?",
    response: "Я могу помочь вам с различными вопросами и задачами, такими как предоставление информации, помощь в программировании и многое другое!"
  },
  {
    prompt: "погода",
    response: "Извините, я не могу предоставить информацию о погоде прямо сейчас, но могу помочь с другими вопросами."
  },
  {
    prompt: "как я могу доехать до пгу с остановки площадь конституции?",
    response: "Лучший вариант это сесть на автобус номер 21 и доехать до остановки С. Торайгырова."
  },
  {
    prompt: "где можно погулять в павлодаре?",
    response: "Вы можете погулять в таких местах как Центральная набережная, Батырмол, а также в Старом Городе. Эти места считаются наиболее популярными в городе Павлодар."
  },
  {
    prompt: "кто такой алим затонский?",
    response: "Это тигр."
  },
  {
    prompt: "как можно добавить жалобу?",
    response: "Вам нужно перейти в секцию Жалобы и предложения, затем нажать на кнопку Добавить обращение."
  },
  {
    prompt: "спасибо тебе большое",
    response: "Рад был помочь! Обращайтесь ещё."
  },
  {
    prompt: "как тебя зовут?",
    response: "Меня зовут LionAI я был придуман командой разработчиков Alash Devs."
  },
  {
    prompt: "назови имена своих создателей",
    response: "Конечно, вот: Аристид Попандопуло (Futurizm), Жигер Жапар (flamehost), Кахималаев Бараат (baraatis), Исенов Айдар (aidar)"
  },
  {
    prompt: "где находится гусиный перелёт?",
    response: "Он находится по улице Набережная и Айманова."
  },
  {
    prompt: "найди мне парковку на 10 мест,парковку бесплатную",
    response: "На данный момент такая парковка присутсвует в трёх местах, а именно: возле торгового дома Гулливер, напротив городского Акимата, перед торговым домом Артур."
  },
  {
    prompt: "какое событие есть на время: 16:00, 16-го декабря",
    response: "В это время в дворце культуры имени Естая будет проводиться концерт в честь дня Независимости Казахстана."
  }
];
  // Загрузка сообщений из localStorage при монтировании компонента
  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Сохранение сообщений в localStorage при их обновлении
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Добавляем сообщение пользователя
    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Добавляем в список сообщений

    // Проверяем, есть ли подготовленный ответ на запрос
    const predefinedResponse = predefinedResponses.find(response => input.toLowerCase().includes(response.prompt));

    if (predefinedResponse) {
      // Если найден заранее подготовленный ответ, возвращаем его
      const assistantMessage = { role: 'assistant', content: predefinedResponse.response };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      displayMessage(assistantMessage); // Выводим ответ ассистента
    } else {
      // Если не нашли подготовленного ответа, отправляем запрос к OpenAI
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo-0125',
          messages: [
            { role: 'system', content: "You are a helpful assistant." },
            { role: 'user', content: input },
          ],
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`, // Используйте свой API-ключ OpenAI
          }
        });

        const assistantMessage = { role: 'assistant', content: response.data.choices[0].message.content };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        displayMessage(assistantMessage); // Выводим ответ ассистента
      } catch (error) {
        console.error('Error fetching AI response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: 'An error occurred while fetching the response.' }
        ]);
      }
    }
    setInput('');
  };

  // Функция для поочередного вывода текста
  const displayMessage = (assistantMessage: { role: string, content: string }) => {
    const messageContent = assistantMessage.content;
    let index = 0;
    const interval = setInterval(() => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          ...assistantMessage,
          content: messageContent.substring(0, index + 1), // Добавляем по символу
        };
        return updatedMessages;
      });

      index += 1;
      if (index === messageContent.length) {
        clearInterval(interval);
      }
    }, 30); // Можно настроить задержку между символами
  };

  // Автоматический скролл вниз
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Layout>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Bot className="w-6 h-6" />
            AI Ассистент CityLion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-[500px] overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 mb-4 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${
                      message.role === 'assistant'
                        ? 'bg-white rounded-e-xl rounded-es-xl'
                        : 'bg-blue-500 rounded-s-xl rounded-ee-xl'
                    }`}
                  >
                    <p
                      className={`text-sm font-normal ${message.role === 'assistant' ? 'text-gray-900' : 'text-white'}`}
                    >
                      {message.content}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messageEndRef} /> {/* Реф для автоматической прокрутки */}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Задайте вопрос..."
                className="flex-grow"
              />
              <Button type="submit">
                <Send className="w-4 h-4 mr-2" />
                Отправить
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
