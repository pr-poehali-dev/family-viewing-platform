import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import MoviePlayer from './MoviePlayer';

interface Profile {
  id: number;
  name: string;
  initials: string;
  color: string;
}

interface PersonalDashboardProps {
  profile: Profile;
  onBackToProfiles: () => void;
}

const PersonalDashboard = ({ profile, onBackToProfiles }: PersonalDashboardProps) => {
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  const continueWatching = [
    { id: 1, title: 'Последняя капля', progress: 45, episode: 'Сезон 1, Эпизод 3', thumbnail: 'Film' },
    { id: 2, title: 'Ночной город', progress: 78, episode: 'Сезон 2, Эпизод 5', thumbnail: 'Film' },
    { id: 3, title: 'Тени прошлого', progress: 23, episode: 'Сезон 1, Эпизод 1', thumbnail: 'Film' },
  ];

  const recommendations = [
    { id: 4, title: 'Звездный путь', genre: 'Фантастика', rating: 8.9, match: 95 },
    { id: 5, title: 'Забытые истории', genre: 'Драма', rating: 8.7, match: 92 },
    { id: 6, title: 'Сердце океана', genre: 'Приключения', rating: 7.9, match: 88 },
    { id: 7, title: 'Темная сторона', genre: 'Триллер', rating: 8.4, match: 85 },
    { id: 8, title: 'Свет надежды', genre: 'Мелодрама', rating: 7.6, match: 82 },
  ];

  const watchHistory = [
    { id: 9, title: 'Возвращение домой', watchedDate: '28.01.2024', duration: '1ч 30мин', rating: 8.2 },
    { id: 10, title: 'Игра теней', watchedDate: '25.01.2024', duration: '2ч 10мин', rating: 7.5 },
    { id: 11, title: 'Последний шанс', watchedDate: '22.01.2024', duration: '1ч 55мин', rating: 8.0 },
    { id: 12, title: 'Зов природы', watchedDate: '20.01.2024', duration: '2ч 30мин', rating: 8.8 },
  ];

  const favorites = [
    { id: 13, title: 'Космическая одиссея', genre: 'Фантастика', rating: 9.2 },
    { id: 14, title: 'Потерянный рай', genre: 'Драма', rating: 8.9 },
    { id: 15, title: 'Ветер перемен', genre: 'Приключения', rating: 8.6 },
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-red-500 flex items-center justify-center">
                  <Icon name="Play" size={24} className="text-black" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                  START
                </span>
              </div>
            </div>

            <button
              onClick={onBackToProfiles}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Avatar className={`w-10 h-10 border-2 border-green-500`}>
                <AvatarFallback className={`${profile.color} text-black font-semibold`}>
                  {profile.initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="text-sm text-gray-400">Профиль</div>
                <div className="font-semibold">{profile.name}</div>
              </div>
              <Icon name="ChevronDown" size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="PlayCircle" size={32} className="text-green-500" />
              Продолжить просмотр
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {continueWatching.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all hover:scale-105 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedMovie(item.title)}
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                    <Icon name={item.thumbnail as any} size={64} className="text-gray-700 group-hover:text-green-500 transition-colors" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                        <Icon name="Play" size={32} className="text-black ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-green-500 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{item.episode}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Icon name="Clock" size={14} />
                      <span>Осталось {100 - item.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Tabs defaultValue="recommendations" className="w-full">
            <TabsList className="bg-gray-900 border border-gray-800 mb-6">
              <TabsTrigger value="recommendations" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
                <Icon name="Sparkles" size={18} className="mr-2" />
                Рекомендации
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
                <Icon name="History" size={18} className="mr-2" />
                История
              </TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
                <Icon name="Heart" size={18} className="mr-2" />
                Избранное
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recommendations" className="space-y-4">
              <div className="mb-4">
                <p className="text-gray-400">Подобрано специально для вас на основе истории просмотров</p>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {recommendations.map((movie, index) => (
                  <div
                    key={movie.id}
                    className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all hover:scale-105 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => setSelectedMovie(movie.title)}
                  >
                    <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <Icon name="Film" size={48} className="text-gray-700 group-hover:text-green-500 transition-colors" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">
                          {movie.match}% совпадение
                        </Badge>
                        <Badge className="bg-gray-800 text-gray-300 text-xs flex items-center gap-1">
                          <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                          {movie.rating}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-sm mb-1 group-hover:text-green-500 transition-colors line-clamp-2">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-gray-400">{movie.genre}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-3">
              {watchHistory.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all animate-fade-in flex items-center justify-between"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                      <Icon name="Film" size={32} className="text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {item.watchedDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          {item.duration}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedMovie(item.title)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold"
                  >
                    <Icon name="RotateCcw" size={18} className="mr-2" />
                    Пересмотреть
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4">
              <div className="grid grid-cols-3 gap-6">
                {favorites.map((movie, index) => (
                  <div
                    key={movie.id}
                    className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all hover:scale-105 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedMovie(movie.title)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <Icon name="Film" size={64} className="text-gray-700 group-hover:text-green-500 transition-colors" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold group-hover:text-green-500 transition-colors">
                          {movie.title}
                        </h3>
                        <Icon name="Heart" size={20} className="text-red-500 fill-red-500" />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span>{movie.genre}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                          {movie.rating}
                        </span>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMovie(movie.title);
                        }}
                      >
                        <Icon name="Play" size={18} className="mr-2" />
                        Смотреть
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {selectedMovie && (
        <MoviePlayer 
          movieTitle={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
};

export default PersonalDashboard;