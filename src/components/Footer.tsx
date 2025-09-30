import Icon from '@/components/ui/icon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800 mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-red-500 flex items-center justify-center">
                <Icon name="Play" size={24} className="text-black" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                START
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Стриминговый сервис с лучшими фильмами и сериалами для всей семьи
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-green-500 flex items-center justify-center transition-colors group"
              >
                <Icon name="Facebook" size={20} className="text-gray-400 group-hover:text-black" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-green-500 flex items-center justify-center transition-colors group"
              >
                <Icon name="Twitter" size={20} className="text-gray-400 group-hover:text-black" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-green-500 flex items-center justify-center transition-colors group"
              >
                <Icon name="Instagram" size={20} className="text-gray-400 group-hover:text-black" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-green-500 flex items-center justify-center transition-colors group"
              >
                <Icon name="Youtube" size={20} className="text-gray-400 group-hover:text-black" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Разделы</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm">
                  Главная
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm">
                  Фильмы
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm">
                  Сериалы
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm">
                  Новинки
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm">
                  Моя подборка
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Помощь</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm cursor-pointer"
                >
                  Часто задаваемые вопросы
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm">
                  Центр поддержки
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm">
                  Условия использования
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm">
                  Связаться с нами
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Приложения</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Smartphone" size={16} />
                  iOS приложение
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Smartphone" size={16} />
                  Android приложение
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Tv" size={16} />
                  Smart TV
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Monitor" size={16} />
                  Веб-версия
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} START. Все права защищены.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-green-500 transition-colors">
                Правовая информация
              </a>
              <a href="#" className="text-gray-500 hover:text-green-500 transition-colors">
                Cookies
              </a>
              <a href="#" className="text-gray-500 hover:text-green-500 transition-colors">
                Выбор языка
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;