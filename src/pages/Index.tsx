import { useState } from 'react';
import OnboardingScreen from '@/components/OnboardingScreen';
import ProfileSelector from '@/components/ProfileSelector';
import PersonalDashboard from '@/components/PersonalDashboard';
import DashboardScreen from '@/components/DashboardScreen';

type Screen = 'onboarding' | 'profile-selector' | 'personal' | 'main';

interface Profile {
  id: number;
  name: string;
  initials: string;
  color: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const profiles: Profile[] = [
    { id: 1, name: 'Александр', initials: 'АП', color: 'bg-gradient-to-br from-green-500 to-green-600' },
    { id: 2, name: 'Мария', initials: 'МП', color: 'bg-gradient-to-br from-red-500 to-red-600' },
    { id: 3, name: 'Дмитрий', initials: 'ДИ', color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { id: 4, name: 'Анна', initials: 'АС', color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
  ];

  const handleOnboardingComplete = () => {
    setCurrentScreen('profile-selector');
  };

  const handleProfileSelect = (profileId: number) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setSelectedProfile(profile);
      setCurrentScreen('personal');
    }
  };

  const handleBackToProfiles = () => {
    setSelectedProfile(null);
    setCurrentScreen('profile-selector');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      
      {currentScreen === 'profile-selector' && (
        <ProfileSelector 
          profiles={profiles}
          currentProfileId={selectedProfile?.id || 0}
          onSelectProfile={handleProfileSelect}
        />
      )}

      {currentScreen === 'personal' && selectedProfile && (
        <PersonalDashboard 
          profile={selectedProfile}
          onBackToProfiles={handleBackToProfiles}
        />
      )}

      {currentScreen === 'main' && (
        <DashboardScreen />
      )}
    </div>
  );
};

export default Index;