import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import MoviePlayer from './MoviePlayer';

interface MovieCatalogProps {
  searchQuery: string;
}

const MovieCatalog = ({ searchQuery }: MovieCatalogProps) => {
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const movies = [
    { id: 1, title: 'Последняя капля', genre: 'Драма', rating: 8.9, year: 2024, duration: '2ч 15мин' },
    { id: 2, title: 'Ночной город', genre: 'Триллер', rating: 7.8, year: 2024, duration: '1ч 45мин' },
    { id: 3, title: 'Возвращение домой', genre: 'Комедия', rating: 8.2, year: 2023, duration: '1ч 30мин' },
    { id: 4, title: 'Тени прошлого', genre: 'Детектив', rating: 8.5, year: 2024, duration: '2ч 05мин' },
    { id: 5, title: 'Сердце океана', genre: 'Приключения', rating: 7.9, year: 2023, duration: '2ч 20мин' },
    { id: 6, title: 'Забытые истории', genre: 'Драма', rating: 8.7, year: 2024, duration: '1ч 55мин' },
  ];

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Рекомендации</h1>
        <p className="text-gray-400 text-lg">Специально подобрано для вас и вашей семьи</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredMovies.map((movie, index) => (
          <div
            key={movie.id}
            className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <Icon name="Film" size={64} className="text-gray-700 group-hover:text-green-500 transition-colors" />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold group-hover:text-green-500 transition-colors">
                  {movie.title}
                </h3>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50 flex items-center gap-1">
                  <Icon name="Star" size={14} className="fill-green-400" />
                  {movie.rating}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.genre}</span>
                <span>•</span>
                <span>{movie.duration}</span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedMovie(movie.title)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                >
                  <Icon name="Play" size={18} />
                  Смотреть
                </button>
                <button className="p-2 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors">
                  <Icon name="Plus" size={18} className="text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>

            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Badge className="bg-red-500 text-white font-semibold">NEW</Badge>
            </div>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="text-center py-20">
          <Icon name="Search" size={64} className="text-gray-700 mx-auto mb-4" />
          <p className="text-xl text-gray-400">Ничего не найдено</p>
        </div>
      )}

      {selectedMovie && (
        <MoviePlayer 
          movieTitle={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
};

export default MovieCatalog;