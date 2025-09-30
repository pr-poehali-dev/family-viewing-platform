import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import HeroSection from './HeroSection';
import MovieRow from './MovieRow';
import FamilyManagement from './FamilyManagement';
import FAQ from './FAQ';
import Footer from './Footer';

type Category = 'all' | 'drama' | 'comedy' | 'thriller' | 'fantasy' | 'action';

const DashboardScreen = () => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'family'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const trendingMovies = [
    { id: 1, title: 'Последняя капля', genre: 'Драма', rating: 8.9, year: 2024, isNew: true },
    { id: 2, title: 'Ночной город', genre: 'Триллер', rating: 7.8, year: 2024, isNew: true },
    { id: 3, title: 'Возвращение домой', genre: 'Комедия', rating: 8.2, year: 2023 },
    { id: 4, title: 'Тени прошлого', genre: 'Детектив', rating: 8.5, year: 2024 },
    { id: 5, title: 'Сердце океана', genre: 'Приключения', rating: 7.9, year: 2023 },
  ];

  const newReleases = [
    { id: 6, title: 'Звездный путь', genre: 'Фантастика', rating: 8.9, year: 2024, isNew: true },
    { id: 7, title: 'Забытые истории', genre: 'Драма', rating: 8.7, year: 2024, isNew: true },
    { id: 8, title: 'Темная сторона', genre: 'Триллер', rating: 8.4, year: 2024, isNew: true },
    { id: 9, title: 'Свет надежды', genre: 'Мелодрама', rating: 7.6, year: 2024 },
    { id: 10, title: 'Игра теней', genre: 'Детектив', rating: 7.5, year: 2024 },
  ];

  const popularSeries = [
    { id: 11, title: 'Космическая одиссея', genre: 'Фантастика', rating: 9.2, year: 2023 },
    { id: 12, title: 'Потерянный рай', genre: 'Драма', rating: 8.9, year: 2023 },
    { id: 13, title: 'Ветер перемен', genre: 'Приключения', rating: 8.6, year: 2023 },
    { id: 14, title: 'Зов природы', genre: 'Документальный', rating: 8.8, year: 2024 },
    { id: 15, title: 'Последний шанс', genre: 'Драма', rating: 8.0, year: 2023 },
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-500 flex items-center justify-center">
                  <Icon name="Play" size={24} className="text-black" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                  START
                </span>
              </div>

              <nav className="flex gap-6">
                <button
                  onClick={() => {
                    setActiveTab('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-lg font-medium transition-colors ${
                    activeTab === 'catalog' 
                      ? 'text-red-500' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Главная
                </button>
                <button
                  onClick={() => setActiveTab('family')}
                  className={`text-lg font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'family' 
                      ? 'text-red-500' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon name="Users" size={20} />
                  Семья
                </button>
                <button
                  onClick={() => {
                    setActiveTab('catalog');
                    setTimeout(() => {
                      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-lg font-medium text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {activeTab === 'catalog' && (
                <>
                  <nav className="flex gap-4">
                    {[
                      { id: 'all' as Category, label: 'Все', icon: 'Film' },
                      { id: 'drama' as Category, label: 'Драмы', icon: 'Heart' },
                      { id: 'comedy' as Category, label: 'Комедии', icon: 'Smile' },
                      { id: 'thriller' as Category, label: 'Триллеры', icon: 'Zap' },
                      { id: 'fantasy' as Category, label: 'Фантастика', icon: 'Sparkles' },
                      { id: 'action' as Category, label: 'Боевики', icon: 'Flame' },
                    ].map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === category.id
                            ? 'bg-red-500 text-black'
                            : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        <Icon name={category.icon as any} size={16} />
                        {category.label}
                      </button>
                    ))}
                  </nav>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1">
              {activeTab === 'catalog' && (
                <div className="relative max-w-md">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Поиск фильмов и сериалов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
                  />
                </div>
              )}
            </div>

            <Avatar className="w-10 h-10 border-2 border-red-500">
              <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-black font-semibold">
                АП
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {activeTab === 'catalog' ? (
          <>
            <HeroSection />
            <div className="space-y-8 py-8">
              <MovieRow title="В тренде" movies={trendingMovies} />
              <MovieRow title="Новинки" movies={newReleases} />
              <MovieRow title="Популярные сериалы" movies={popularSeries} />
            </div>
            <FAQ />
          </>
        ) : (
          <div className="container mx-auto px-6 pt-8 pb-12">
            <FamilyManagement />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DashboardScreen;