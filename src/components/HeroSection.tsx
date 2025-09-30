import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import MoviePlayer from './MoviePlayer';

const HeroSection = () => {
  const [showPlayer, setShowPlayer] = useState(false);

  const heroMovie = {
    title: 'Последняя капля',
    description: 'Драматическая история о выборе между долгом и совестью. Детектив расследует дело, которое перевернёт его жизнь и заставит пересмотреть всё, во что он верил.',
    year: 2024,
    genre: 'Драма • Триллер',
    rating: 8.9,
    duration: '2 сезона • 16 эпизодов',
  };

  return (
    <>
      <div className="relative h-[85vh] -mt-20 pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        
        <div className="absolute inset-0">
          <img 
            src="/img/1701ced8-0b79-4ea2-adc0-527790db323f.jpg" 
            alt="{heroMovie.title}"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-red-500 text-white font-bold px-3 py-1 text-sm">
                ХИТ
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50 flex items-center gap-1">
                <Icon name="Star" size={14} className="fill-green-400" />
                {heroMovie.rating}
              </Badge>
            </div>

            <h1 className="text-7xl font-bold mb-6 text-white leading-tight">
              {heroMovie.title}
            </h1>

            <div className="flex items-center gap-4 text-lg text-gray-400 mb-6">
              <span>{heroMovie.year}</span>
              <span>•</span>
              <span>{heroMovie.genre}</span>
              <span>•</span>
              <span>{heroMovie.duration}</span>
            </div>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {heroMovie.description}
            </p>

            <div className="flex gap-4">
              <Button
                onClick={() => setShowPlayer(true)}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold text-lg px-8 py-6 shadow-2xl shadow-green-500/30"
              >
                <Icon name="Play" size={24} className="mr-2" />
                Смотреть
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-700 hover:border-gray-600 text-white font-semibold text-lg px-8 py-6 bg-black/50 backdrop-blur-sm"
              >
                <Icon name="Info" size={24} className="mr-2" />
                Подробнее
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-700 hover:border-gray-600 text-white font-semibold px-6 py-6 bg-black/50 backdrop-blur-sm"
              >
                <Icon name="Plus" size={24} />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {showPlayer && (
        <MoviePlayer 
          movieTitle={heroMovie.title} 
          onClose={() => setShowPlayer(false)} 
        />
      )}
    </>
  );
};

export default HeroSection;