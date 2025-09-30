import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'Как оформить подписку на START?',
    answer: 'Выберите подходящий тариф на странице подписки. Укажите данные банковской карты и подтвердите платеж. Подписка активируется автоматически, и вы сразу получите доступ ко всем материалам START.'
  },
  {
    id: 2,
    question: 'Можно ли смотреть START на нескольких устройствах?',
    answer: 'Да, вы можете смотреть START на смартфонах, планшетах, компьютерах и Smart TV. Одновременный просмотр возможен на 2 устройствах в рамках одной подписки. Для большего количества устройств доступен семейный тариф.'
  },
  {
    id: 3,
    question: 'Как отменить подписку?',
    answer: 'Зайдите в настройки профиля, выберите раздел "Подписка" и нажмите "Отменить подписку". Доступ к контенту сохранится до конца оплаченного периода, после чего подписка не продлится автоматически.'
  }
];

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="py-20 px-6" id="faq">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
            Часто задаваемые вопросы
          </h2>
          <p className="text-gray-400 text-lg">
            Ответы на самые популярные вопросы о START
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-gray-950/50 rounded-xl border border-gray-800 hover:border-green-500/50 transition-all overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(item.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-semibold group-hover:text-green-500 transition-colors">
                  {item.question}
                </span>
                <Icon 
                  name={openId === item.id ? "ChevronUp" : "ChevronDown"} 
                  size={24} 
                  className="text-gray-400 group-hover:text-green-500 transition-all flex-shrink-0 ml-4" 
                />
              </button>
              
              {openId === item.id && (
                <div className="px-6 pb-5 pt-0">
                  <p className="text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Не нашли ответ на свой вопрос?</p>
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold px-8 py-3 rounded-lg transition-all transform hover:scale-105">
            Связаться с поддержкой
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;