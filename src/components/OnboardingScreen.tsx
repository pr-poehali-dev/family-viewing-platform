import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Семейная подписка',
      description: 'Делитесь подпиской с близкими и экономьте до 60% на просмотре фильмов и сериалов',
      icon: 'Users',
    },
    {
      title: 'Единая оплата',
      description: 'Один владелец оплачивает подписку для всей семьи. Автоматическое продление каждый месяц',
      icon: 'CreditCard',
    },
    {
      title: 'До 5 участников',
      description: 'Добавьте до 5 членов семьи. Каждый получит персональные рекомендации и историю просмотров',
      icon: 'UserPlus',
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-black to-red-500/10" />
      
      <div className="max-w-2xl w-full relative z-10 animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-red-500 mb-8 animate-scale-in">
            <Icon name={steps[step].icon} size={64} className="text-black" />
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
            {steps[step].title}
          </h1>
          
          <p className="text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
            {steps[step].description}
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === step 
                  ? 'w-12 bg-gradient-to-r from-green-500 to-green-400' 
                  : 'w-2 bg-gray-700'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={handleSkip}
            variant="outline"
            size="lg"
            className="border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 px-8"
          >
            Пропустить
          </Button>
          
          <Button
            onClick={handleNext}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold px-12 shadow-lg shadow-green-500/30"
          >
            {step < steps.length - 1 ? 'Далее' : 'Начать'}
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;