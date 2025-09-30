import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import MoviePlayer from './MoviePlayer';

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  year?: number;
  isNew?: boolean;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow = ({ title, movies }: MovieRowProps) => {
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`row-${title}`);
    if (container) {
      const scrollAmount = direction === 'left' ? -1200 : 1200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <>
      <div className="mb-12 group">
        <h2 className="text-2xl font-bold mb-4 px-6">{title}</h2>
        
        <div className="relative">
          {scrollPosition > 0 && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-0 bottom-0 z-30 w-16 bg-gradient-to-r from-black to-transparent flex items-center justify-start pl-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-black/80 border border-gray-700 flex items-center justify-center hover:bg-gray-900 transition-colors">
                <Icon name="ChevronLeft" size={24} />
              </div>
            </button>
          )}

          <div
            id={`row-${title}`}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-6 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className="group/card relative flex-shrink-0 w-80 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative overflow-hidden rounded-xl border border-gray-800 hover:border-green-500/50 transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative group-hover/card:brightness-110 transition-all">
                    <Icon name="Film" size={72} className="text-gray-700 group-hover/card:text-green-500 transition-colors" />
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => setSelectedMovie(movie.title)}
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 flex items-center justify-center transform scale-0 group-hover/card:scale-100 transition-transform shadow-lg shadow-green-500/30"
                      >
                        <Icon name="Play" size={32} className="text-black ml-1" />
                      </button>
                    </div>

                    {movie.isNew && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white font-bold">NEW</Badge>
                      </div>
                    )}

                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50 flex items-center gap-1 backdrop-blur-sm">
                        <Icon name="Star" size={12} className="fill-green-400" />
                        {movie.rating}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 group-hover/card:text-green-500 transition-colors line-clamp-1">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      {movie.year && <span>{movie.year}</span>}
                      {movie.year && <span>•</span>}
                      <span>{movie.genre}</span>
                    </div>

                    <div className="flex gap-2 mt-4 opacity-0 group-hover/card:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedMovie(movie.title)}
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <Icon name="Play" size={16} />
                        Смотреть
                      </button>
                      <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                        <Icon name="Plus" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-30 w-16 bg-gradient-to-l from-black to-transparent flex items-center justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-black/80 border border-gray-700 flex items-center justify-center hover:bg-gray-900 transition-colors">
              <Icon name="ChevronRight" size={24} />
            </div>
          </button>
        </div>
      </div>

      {selectedMovie && (
        <MoviePlayer 
          movieTitle={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </>
  );
};

export default MovieRow;