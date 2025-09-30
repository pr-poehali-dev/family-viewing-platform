import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface WatchHistory {
  id: number;
  title: string;
  coverUrl: string;
  genre: string;
  watchedBy: {
    name: string;
    initials: string;
  };
  watchedAt: string;
  progress: number;
  rating?: number;
}

const FamilyHistory = () => {
  const [history] = useState<WatchHistory[]>([
    {
      id: 1,
      title: 'Последняя капля',
      coverUrl: '/movie-1.jpg',
      genre: 'Драма',
      watchedBy: { name: 'Александр Петров', initials: 'АП' },
      watchedAt: '2 часа назад',
      progress: 100,
      rating: 9,
    },
    {
      id: 2,
      title: 'Ночной город',
      coverUrl: '/movie-2.jpg',
      genre: 'Триллер',
      watchedBy: { name: 'Мария Петрова', initials: 'МП' },
      watchedAt: '5 часов назад',
      progress: 65,
    },
    {
      id: 3,
      title: 'Возвращение домой',
      coverUrl: '/movie-3.jpg',
      genre: 'Комедия',
      watchedBy: { name: 'Дмитрий Иванов', initials: 'ДИ' },
      watchedAt: 'Вчера в 20:30',
      progress: 100,
      rating: 8,
    },
    {
      id: 4,
      title: 'Тени прошлого',
      coverUrl: '/movie-4.jpg',
      genre: 'Детектив',
      watchedBy: { name: 'Александр Петров', initials: 'АП' },
      watchedAt: 'Вчера в 18:00',
      progress: 45,
    },
    {
      id: 5,
      title: 'Звездный путь',
      coverUrl: '/movie-5.jpg',
      genre: 'Фантастика',
      watchedBy: { name: 'Мария Петрова', initials: 'МП' },
      watchedAt: '2 дня назад',
      progress: 100,
      rating: 10,
    },
    {
      id: 6,
      title: 'Космическая одиссея',
      coverUrl: '/movie-6.jpg',
      genre: 'Фантастика',
      watchedBy: { name: 'Дмитрий Иванов', initials: 'ДИ' },
      watchedAt: '3 дня назад',
      progress: 30,
    },
  ]);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="History" size={28} className="text-green-500" />
          <h2 className="text-2xl font-bold">История просмотров семьи</h2>
        </div>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:border-green-500 hover:text-green-500">
          <Icon name="Filter" size={18} className="mr-2" />
          Фильтр
        </Button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-gray-950/50 rounded-xl p-4 border border-gray-800 hover:border-green-500/50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-36 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={`/img/${[
                    '1701ced8-0b79-4ea2-adc0-527790db323f.jpg',
                    '6d974646-7e7e-4ef8-803a-fd5c8de68fe3.jpg',
                    'e81af8c3-5602-41d2-9a8a-3f850c243f06.jpg',
                    '4546b8b9-910b-400d-be66-4fe2c7fe83d6.jpg',
                    '28c51c05-e39e-4d53-82a4-97063aecfa92.jpg',
                    '1701ced8-0b79-4ea2-adc0-527790db323f.jpg'
                  ][item.id - 1]}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.progress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-green-500 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                        {item.genre}
                      </Badge>
                      {item.progress < 100 && (
                        <span className="text-green-500 font-medium">
                          {item.progress}% просмотрено
                        </span>
                      )}
                      {item.rating && (
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{item.rating}/10</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold"
                  >
                    <Icon name="Play" size={16} className="mr-1" />
                    {item.progress < 100 ? 'Продолжить' : 'Смотреть'}
                  </Button>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 border border-gray-700">
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-black text-xs font-semibold">
                        {item.watchedBy.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span>{item.watchedBy.name}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    <span>{item.watchedAt}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {history.length === 0 && (
        <div className="text-center py-12">
          <Icon name="History" size={48} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">История просмотров пока пуста</p>
          <p className="text-gray-600 text-sm mt-2">
            Начните смотреть фильмы и сериалы вместе с семьей
          </p>
        </div>
      )}
    </div>
  );
};

export default FamilyHistory;