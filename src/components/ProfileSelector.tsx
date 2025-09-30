import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Profile {
  id: number;
  name: string;
  initials: string;
  color: string;
}

interface ProfileSelectorProps {
  profiles: Profile[];
  currentProfileId: number;
  onSelectProfile: (profileId: number) => void;
}

const ProfileSelector = ({ profiles, currentProfileId, onSelectProfile }: ProfileSelectorProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center max-w-4xl w-full px-6">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
          Кто смотрит?
        </h1>
        <p className="text-xl text-gray-400 mb-12">Выберите свой профиль для персональных рекомендаций</p>

        <div className="grid grid-cols-5 gap-6">
          {profiles.map((profile, index) => (
            <button
              key={profile.id}
              onClick={() => onSelectProfile(profile.id)}
              className="group flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-transparent hover:border-green-500 transition-all hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Avatar className="w-32 h-32 border-4 border-gray-800 group-hover:border-green-500 transition-colors">
                <AvatarFallback 
                  className={`${profile.color} text-2xl font-bold text-black`}
                >
                  {profile.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-xl font-semibold text-gray-400 group-hover:text-white transition-colors">
                {profile.name}
              </span>
            </button>
          ))}

          <button className="group flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-dashed border-gray-700 hover:border-green-500 transition-all hover:scale-105">
            <div className="w-32 h-32 rounded-full bg-gray-900 border-4 border-gray-800 group-hover:border-green-500 flex items-center justify-center transition-colors">
              <Icon name="Plus" size={48} className="text-gray-600 group-hover:text-green-500 transition-colors" />
            </div>
            <span className="text-xl font-semibold text-gray-400 group-hover:text-white transition-colors">
              Добавить
            </span>
          </button>
        </div>

        <div className="mt-12">
          <button className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 mx-auto">
            <Icon name="Settings" size={20} />
            Управление профилями
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelector;