import { useState, useEffect, useRef } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => {
      if (rowRef.current) {
        observer.unobserve(rowRef.current);
      }
    };
  }, []);

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
      <div ref={rowRef} className="mb-12 group">
        <h2 className={`text-2xl font-bold mb-4 px-6 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>{title}</h2>
        
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
                className={`group/card relative flex-shrink-0 w-80 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="relative overflow-hidden rounded-xl border border-gray-800 hover:border-green-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 cursor-pointer bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="aspect-video relative group-hover/card:brightness-110 transition-all">
                    <img 
                      src={`/img/${[
                        '1701ced8-0b79-4ea2-adc0-527790db323f.jpg',
                        '6d974646-7e7e-4ef8-803a-fd5c8de68fe3.jpg',
                        'e81af8c3-5602-41d2-9a8a-3f850c243f06.jpg',
                        '4546b8b9-910b-400d-be66-4fe2c7fe83d6.jpg',
                        '28c51c05-e39e-4d53-82a4-97063aecfa92.jpg'
                      ][index % 5]}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    
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