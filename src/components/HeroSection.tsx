import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import MoviePlayer from './MoviePlayer';

const HeroSection = () => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className="relative h-[85vh] -mt-20 pt-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"
          style={{ 
            opacity: Math.max(0, 1 - scrollY / 500)
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"
          style={{ 
            opacity: Math.max(0, 1 - scrollY / 600)
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{ 
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`,
            willChange: 'transform'
          }}
        >
          <img 
            src="/img/1701ced8-0b79-4ea2-adc0-527790db323f.jpg" 
            alt="{heroMovie.title}"
            className={`w-full h-full object-cover transition-transform duration-[2000ms] ${
              isLoaded ? 'scale-100' : 'scale-110'
            }`}
          />
        </div>

        <div 
          className="relative z-20 container mx-auto px-6 h-full flex items-center"
          style={{ 
            transform: `translateY(${scrollY * -0.3}px)`,
            opacity: Math.max(0, 1 - scrollY / 400),
            willChange: 'transform, opacity'
          }}
        >
          <div className={`max-w-2xl transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <div className={`flex items-center gap-3 mb-4 transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <Badge className="bg-red-500 text-white font-bold px-3 py-1 text-sm">
                ХИТ
              </Badge>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/50 flex items-center gap-1">
                <Icon name="Star" size={14} className="fill-red-400" />
                {heroMovie.rating}
              </Badge>
            </div>

            <h1 className={`text-7xl font-bold mb-6 text-white leading-tight transition-all duration-700 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              {heroMovie.title}
            </h1>

            <div className={`flex items-center gap-4 text-lg text-gray-400 mb-6 transition-all duration-700 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <span>{heroMovie.year}</span>
              <span>•</span>
              <span>{heroMovie.genre}</span>
              <span>•</span>
              <span>{heroMovie.duration}</span>
            </div>

            <p className={`text-xl text-gray-300 mb-8 leading-relaxed transition-all duration-700 delay-[900ms] ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              {heroMovie.description}
            </p>

            <div className={`flex gap-4 transition-all duration-700 delay-[1100ms] ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <Button
                onClick={() => setShowPlayer(true)}
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-green-600 hover:to-green-700 text-black font-bold text-lg px-8 py-6 shadow-2xl shadow-red-500/30"
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