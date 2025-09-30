import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  const benefits = [
    {
      icon: 'Wallet',
      title: 'Экономия до 60%',
      description: 'Одна подписка на 5 человек вместо 5 отдельных. Платите 699₽ вместо 1750₽ в месяц',
      highlight: 'Экономия 1051₽/мес',
    },
    {
      icon: 'Users',
      title: 'До 5 членов семьи',
      description: 'Пригласите родных и близких. Каждый получает свой профиль и рекомендации',
      highlight: '140₽ за человека',
    },
    {
      icon: 'Shield',
      title: 'Родительский контроль',
      description: 'Ограничьте доступ к контенту по возрасту. Создайте безопасное пространство для детей',
      highlight: 'Защита детей',
    },
    {
      icon: 'Tv',
      title: 'Смотрите на всех устройствах',
      description: 'Телефоны, планшеты, Smart TV, компьютеры. Одновременно до 4 экранов',
      highlight: '4 экрана сразу',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-red-500/10" />
        
        <div className="container mx-auto px-6 pt-20 pb-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-red-500 flex items-center justify-center shadow-xl shadow-green-500/20">
                <Icon name="Play" size={32} className="text-black" />
              </div>
              <span className="text-5xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-red-600">
                START
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Семейная подписка
              <br />
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                Больше фильмов. Меньше затрат.
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Делитесь подпиской с семьей и экономьте. Один тариф — до 5 человек.
              Каждому свой профиль, персональные рекомендации и родительский контроль.
            </p>

            {/* Price comparison */}
            <div className="inline-flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 mb-12">
              <div className="text-center">
                <div className="text-gray-500 text-sm mb-1">Обычная подписка × 5</div>
                <div className="text-2xl font-bold text-gray-600 line-through">1750₽</div>
              </div>
              <Icon name="ArrowRight" size={24} className="text-green-500" />
              <div className="text-center">
                <div className="text-green-500 text-sm mb-1 font-semibold">Семейная подписка</div>
                <div className="text-3xl font-bold text-white">699₽</div>
              </div>
              <div className="bg-green-500/20 border border-green-500 rounded-xl px-4 py-2">
                <div className="text-green-500 font-bold text-lg">-60%</div>
              </div>
            </div>

            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold text-lg px-12 py-6 rounded-xl shadow-2xl shadow-green-500/30 transform hover:scale-105 transition-all"
            >
              Начать бесплатный пробный период
              <Icon name="ArrowRight" size={24} className="ml-2" />
            </Button>
            <p className="text-gray-500 text-sm mt-3">
              14 дней бесплатно · Отмена в любое время · Без привязки карты
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800 hover:border-green-500/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20">
                  <Icon name={benefit.icon as any} size={28} className="text-black" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-green-500 transition-colors">
                      {benefit.title}
                    </h3>
                    <span className="text-green-500 font-semibold text-sm bg-green-500/10 px-3 py-1 rounded-full whitespace-nowrap ml-2">
                      {benefit.highlight}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Как это работает?
          </h2>
          
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Оформите семейную подписку',
                description: 'Выберите тариф "Семья" и начните 14-дневный бесплатный период',
              },
              {
                step: '2',
                title: 'Пригласите близких',
                description: 'Отправьте ссылку-приглашение родным через WhatsApp, Telegram или email',
              },
              {
                step: '3',
                title: 'Настройте профили',
                description: 'Каждый создает свой профиль с персональными рекомендациями и настройками',
              },
              {
                step: '4',
                title: 'Смотрите вместе или отдельно',
                description: 'До 4 человек могут смотреть одновременно на разных устройствах',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 text-black font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parental Control Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-900/30 via-gray-900/50 to-purple-900/30 border border-blue-500/30 rounded-3xl p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-xl shadow-blue-500/20">
              <Icon name="Shield" size={40} className="text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-3">
                Родительский контроль
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Ограничьте контент по возрасту (0+, 6+, 12+, 16+, 18+). Блокируйте нежелательные жанры. 
                Устанавливайте время просмотра. Все настройки защищены PIN-кодом. 
                Создайте безопасную среду для детей, не беспокоясь о содержании.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="bg-blue-500/20 border border-blue-500 rounded-xl px-4 py-2 text-blue-400 font-semibold text-sm">
                PIN-код
              </div>
              <div className="bg-purple-500/20 border border-purple-500 rounded-xl px-4 py-2 text-purple-400 font-semibold text-sm">
                Фильтры
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-gray-900 to-black border border-green-500/30 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-4">
            Готовы начать экономить?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Присоединяйтесь к тысячам семей, которые уже наслаждаются контентом вместе
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold text-lg px-12 py-6 rounded-xl shadow-2xl shadow-green-500/30"
          >
            Попробовать 14 дней бесплатно
            <Icon name="Sparkles" size={24} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;