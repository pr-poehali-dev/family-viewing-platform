import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';

interface MoviePlayerProps {
  movieTitle: string;
  onClose: () => void;
}

const MoviePlayer = ({ movieTitle, onClose }: MoviePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalDuration = 7320;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showControls && isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(totalDuration, prev + seconds)));
    setShowControls(true);
  };

  const handleProgressChange = (value: number[]) => {
    setCurrentTime(value[0]);
    setShowControls(true);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setShowControls(true);
  };

  const progress = (currentTime / totalDuration) * 100;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onMouseMove={() => setShowControls(true)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <Icon name="Play" size={120} className="text-gray-800 animate-pulse" />
      </div>

      <div
        className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="bg-gradient-to-b from-black/90 via-black/60 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-white">{movieTitle}</h2>
                <p className="text-gray-400">2024 • Драма • 2ч 15мин</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Icon name="Settings" size={24} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={24} />
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-white text-sm font-medium">{formatTime(currentTime)}</span>
              <div className="flex-1">
                <Slider
                  value={[currentTime]}
                  max={totalDuration}
                  step={1}
                  onValueChange={handleProgressChange}
                  className="cursor-pointer"
                />
              </div>
              <span className="text-gray-400 text-sm">{formatTime(totalDuration)}</span>
            </div>
            
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={handlePlayPause}
                size="icon"
                className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black rounded-full shadow-lg shadow-green-500/30"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={28} />
              </Button>

              <Button
                onClick={() => handleSkip(-10)}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Icon name="SkipBack" size={24} />
              </Button>

              <Button
                onClick={() => handleSkip(10)}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Icon name="SkipForward" size={24} />
              </Button>

              <div className="flex items-center gap-2 ml-4">
                <Icon 
                  name={volume === 0 ? "VolumeX" : volume < 50 ? "Volume1" : "Volume2"} 
                  size={20} 
                  className="text-white" 
                />
                <div className="w-24">
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Icon name="Subtitles" size={24} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Icon name="Languages" size={24} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {!showControls && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-6xl font-bold opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onClick={handlePlayPause}>
            <Icon name={isPlaying ? "Pause" : "Play"} size={80} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePlayer;