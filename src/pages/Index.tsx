import { useState } from 'react';
import OnboardingScreen from '@/components/OnboardingScreen';
import DashboardScreen from '@/components/DashboardScreen';

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {showOnboarding ? (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      ) : (
        <DashboardScreen />
      )}
    </div>
  );
};

export default Index;