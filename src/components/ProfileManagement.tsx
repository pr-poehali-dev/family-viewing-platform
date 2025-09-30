import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import InvitationFlow from './InvitationFlow';
import ShareInvitation from './ShareInvitation';

interface Profile {
  id: number;
  name: string;
  initials: string;
  color: string;
  email?: string;
  isOwner: boolean;
  status: 'active' | 'pending';
}

interface ProfileManagementProps {
  profiles: Profile[];
  onClose: () => void;
  onProfilesUpdate: (profiles: Profile[]) => void;
}

const ProfileManagement = ({ profiles: initialProfiles, onClose, onProfilesUpdate }: ProfileManagementProps) => {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [profileToRemove, setProfileToRemove] = useState<Profile | null>(null);

  const maxProfiles = 5;
  const availableSlots = maxProfiles - profiles.length;

  const handleInvitationSent = (contact: string, method: 'email' | 'phone', name: string) => {
    const newProfile: Profile = {
      id: Date.now(),
      name: name || contact,
      initials: name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : contact.substring(0, 2).toUpperCase(),
      color: `bg-gradient-to-br from-${['blue', 'purple', 'orange', 'pink'][profiles.length % 4]}-500 to-${['blue', 'purple', 'orange', 'pink'][profiles.length % 4]}-600`,
      email: method === 'email' ? contact : undefined,
      isOwner: false,
      status: 'pending',
    };

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    onProfilesUpdate(updatedProfiles);
    setIsAddDialogOpen(false);

    toast({
      title: "Приглашение отправлено!",
      description: `Приглашение отправлено на ${method === 'email' ? 'email' : 'телефон'}: ${contact}`,
    });
  };

  const handleRemoveProfile = (profile: Profile) => {
    if (profile.isOwner) {
      toast({
        title: "Невозможно удалить",
        description: "Владелец подписки не может быть удален",
        variant: "destructive",
      });
      return;
    }

    const updatedProfiles = profiles.filter(p => p.id !== profile.id);
    setProfiles(updatedProfiles);
    onProfilesUpdate(updatedProfiles);
    setProfileToRemove(null);

    toast({
      title: "Участник удален",
      description: `${profile.name} был удален из семейной подписки`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-800 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-br from-gray-900 to-gray-800 border-b border-gray-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Settings" size={28} className="text-green-500" />
            <h2 className="text-3xl font-bold">Управление профилями</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-800"
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Available Slots Info */}
          <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Users" size={24} className="text-green-500" />
                <div>
                  <p className="font-semibold text-white">
                    {profiles.length} из {maxProfiles} профилей
                  </p>
                  <p className="text-sm text-gray-400">
                    {availableSlots > 0 ? `Осталось мест: ${availableSlots}` : 'Все места заняты'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:border-green-500 hover:text-green-500"
                      disabled={availableSlots === 0}
                    >
                      <Icon name="Share2" size={18} className="mr-2" />
                      Поделиться ссылкой
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Пригласить в семью</DialogTitle>
                    </DialogHeader>
                    <ShareInvitation onClose={() => setIsShareDialogOpen(false)} />
                  </DialogContent>
                </Dialog>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold"
                      disabled={availableSlots === 0}
                    >
                      <Icon name="UserPlus" size={18} className="mr-2" />
                      Пригласить участника
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Добавить участника</DialogTitle>
                    </DialogHeader>
                    <InvitationFlow
                      onInvitationSent={handleInvitationSent}
                      onCancel={() => setIsAddDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-gray-950/50 rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-4 border-gray-800">
                    <AvatarFallback className={`${profile.color} text-xl font-bold text-black`}>
                      {profile.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold truncate">{profile.name}</h3>
                      {profile.isOwner && (
                        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-black border-0">
                          <Icon name="Crown" size={12} className="mr-1" />
                          Владелец
                        </Badge>
                      )}
                      {profile.status === 'pending' && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                          Ожидание
                        </Badge>
                      )}
                    </div>
                    {profile.email && (
                      <p className="text-sm text-gray-400 truncate">{profile.email}</p>
                    )}
                  </div>

                  {!profile.isOwner && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setProfileToRemove(profile)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                    >
                      <Icon name="Trash2" size={20} />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {/* Add Profile Card */}
            {availableSlots > 0 && (
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-gray-950/30 rounded-xl p-6 border-2 border-dashed border-gray-700 hover:border-green-500 transition-all group flex items-center justify-center gap-3"
              >
                <div className="w-20 h-20 rounded-full bg-gray-900 border-4 border-gray-800 group-hover:border-green-500 flex items-center justify-center transition-colors">
                  <Icon name="Plus" size={32} className="text-gray-600 group-hover:text-green-500 transition-colors" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-400 group-hover:text-white transition-colors">
                    Добавить профиль
                  </p>
                  <p className="text-sm text-gray-600">
                    Осталось мест: {availableSlots}
                  </p>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Remove Confirmation Dialog */}
        {profileToRemove && (
          <Dialog open={!!profileToRemove} onOpenChange={() => setProfileToRemove(null)}>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl">Удалить участника?</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-gray-400 mb-4">
                  Вы уверены, что хотите удалить <span className="text-white font-semibold">{profileToRemove.name}</span> из семейной подписки?
                </p>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
                  <Icon name="AlertTriangle" size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">
                    Участник потеряет доступ к подписке. Его история просмотров будет удалена.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setProfileToRemove(null)}
                  className="border-gray-700 text-gray-300"
                >
                  Отмена
                </Button>
                <Button
                  onClick={() => handleRemoveProfile(profileToRemove)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold"
                >
                  Удалить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default ProfileManagement;