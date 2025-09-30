import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import InvitationFlow from './InvitationFlow';

interface FamilyMember {
  id: number;
  name: string;
  email: string;
  initials: string;
  isOwner: boolean;
  joinedDate: string;
  status: 'active' | 'pending';
  verificationMethod?: 'email' | 'phone';
}

const FamilyManagement = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: 1,
      name: 'Александр Петров',
      email: 'alex@example.com',
      initials: 'АП',
      isOwner: true,
      joinedDate: '15.01.2024',
      status: 'active',
    },
    {
      id: 2,
      name: 'Мария Петрова',
      email: 'maria@example.com',
      initials: 'МП',
      isOwner: false,
      joinedDate: '16.01.2024',
      status: 'active',
      verificationMethod: 'email',
    },
    {
      id: 3,
      name: 'Дмитрий Иванов',
      email: 'dmitry@example.com',
      initials: 'ДИ',
      isOwner: false,
      joinedDate: '20.01.2024',
      status: 'active',
      verificationMethod: 'phone',
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<FamilyMember | null>(null);

  const handleInvitationSent = (contact: string, method: 'email' | 'phone', name: string) => {
    if (members.length >= 5) {
      toast({
        title: 'Ошибка',
        description: 'Достигнут лимит участников (5)',
        variant: 'destructive',
      });
      return;
    }

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    const newMember: FamilyMember = {
      id: Date.now(),
      name,
      email: contact,
      initials,
      isOwner: false,
      joinedDate: new Date().toLocaleDateString('ru-RU'),
      status: 'active',
      verificationMethod: method,
    };

    setMembers([...members, newMember]);
    setIsAddDialogOpen(false);
  };

  const handleRemoveMember = (member: FamilyMember) => {
    setMembers(members.filter((m) => m.id !== member.id));
    setMemberToRemove(null);

    toast({
      title: 'Участник удален',
      description: `${member.name} больше не имеет доступа к подписке`,
    });
  };

  const maxMembers = 5;
  const availableSlots = maxMembers - members.length;
  const individualPrice = 999;
  const familyPrice = 2069;
  const pricePerMember = Math.round(familyPrice / members.length);
  const savingsPerMember = individualPrice - pricePerMember;
  const totalSavings = savingsPerMember * members.length;
  const savingsPercent = Math.round((savingsPerMember / individualPrice) * 100);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Семейная подписка</h1>
            <p className="text-gray-400 text-lg">Управляйте участниками вашей подписки</p>
          </div>
          
          <Badge className="bg-green-500/20 text-green-400 border-green-500/50 px-4 py-2 text-lg">
            <Icon name="CheckCircle" size={18} className="mr-2" />
            Активна
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
            <Icon name="CreditCard" size={32} className="text-green-500 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">₽{familyPrice}</div>
            <div className="text-gray-400">всего в месяц</div>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="text-lg font-semibold text-green-400">₽{pricePerMember}</div>
              <div className="text-xs text-gray-500">на каждого участника</div>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
            <Icon name="Users" size={32} className="text-green-500 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{members.length}/5</div>
            <div className="text-gray-400">участников</div>
          </div>

          <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
            <Icon name="Calendar" size={32} className="text-green-500 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">15.02</div>
            <div className="text-gray-400">следующее списание</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-900/20 to-gray-900 rounded-2xl p-8 border border-green-500/30">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <Icon name="TrendingDown" size={28} className="text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Ваша экономия</h2>
            <p className="text-gray-400">По сравнению с индивидуальными подписками</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="User" size={24} className="text-green-500" />
              <span className="text-gray-400">Экономия на участника</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-green-400">₽{savingsPerMember}</span>
              <span className="text-lg text-gray-500">/месяц</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Индивидуально: ₽{individualPrice} → Семейная: ₽{pricePerMember}
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="Users" size={24} className="text-green-500" />
              <span className="text-gray-400">Общая экономия семьи</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-green-400">₽{totalSavings}</span>
              <span className="text-lg text-gray-500">/месяц</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {members.length} × ₽{individualPrice} - ₽{familyPrice} = ₽{totalSavings}
            </div>
          </div>
        </div>

        <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Выгода семейной подписки</span>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-lg px-4 py-1">
              -{savingsPercent}%
            </Badge>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((count) => {
              const savings = Math.round(((count * individualPrice - familyPrice) / (count * individualPrice)) * 100);
              const isActive = count === members.length;
              return (
                <div key={count} className={`flex items-center gap-4 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="flex items-center gap-2 w-32">
                    <Icon name="Users" size={16} className={isActive ? 'text-green-500' : 'text-gray-600'} />
                    <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
                      {count} {count === 1 ? 'участник' : count < 5 ? 'участника' : 'участников'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-green-500 to-green-400'
                            : 'bg-gradient-to-r from-gray-700 to-gray-600'
                        }`}
                        style={{ width: `${savings}%` }}
                      />
                    </div>
                  </div>
                  <div className={`text-sm font-semibold w-16 text-right ${isActive ? 'text-green-400' : 'text-gray-600'}`}>
                    -{savings}%
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center gap-3 text-sm">
              <Icon name="Info" size={16} className="text-blue-400" />
              <p className="text-gray-400">
                Добавьте еще {availableSlots > 0 ? availableSlots : 0} {availableSlots === 1 ? 'участника' : 'участников'} для максимальной экономии до ₽{Math.round(((5 * individualPrice - familyPrice) / (5 * individualPrice)) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Участники семьи</h2>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold shadow-lg shadow-green-500/20"
                disabled={members.length >= 5}
              >
                <Icon name="UserPlus" size={20} className="mr-2" />
                Добавить участника
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">Добавить участника в семью</DialogTitle>
              </DialogHeader>
              
              <InvitationFlow 
                onInvitationSent={handleInvitationSent}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {availableSlots > 0 && (
          <div className="mb-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-green-400">
              <Icon name="UserPlus" size={16} className="inline mr-2" />
              Доступно еще {availableSlots} {availableSlots === 1 ? 'место' : 'места'}
            </p>
          </div>
        )}

        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-black/40 rounded-xl p-6 border border-gray-800 flex items-center justify-between hover:border-gray-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border-2 border-green-500">
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-black font-semibold text-lg">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    {member.isOwner && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                        Владелец
                      </Badge>
                    )}
                    {member.status === 'pending' && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                        Ожидает подтверждения
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-400">{member.email}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-sm text-gray-500">Присоединился: {member.joinedDate}</p>
                    {member.verificationMethod && (
                      <>
                        <span className="text-gray-700">•</span>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Icon name={member.verificationMethod === 'email' ? 'Mail' : 'Phone'} size={14} className="text-green-500" />
                          <span>Подтвержден через {member.verificationMethod === 'email' ? 'email' : 'телефон'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {!member.isOwner && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                      onClick={() => setMemberToRemove(member)}
                    >
                      <Icon name="UserMinus" size={18} className="mr-2" />
                      Удалить
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Удалить участника?</DialogTitle>
                    </DialogHeader>
                    
                    <div className="py-4">
                      <p className="text-gray-300 mb-4">
                        Вы уверены, что хотите удалить <span className="font-semibold text-white">{member.name}</span> из семейной подписки?
                      </p>
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <p className="text-sm text-red-400">
                          <Icon name="AlertTriangle" size={16} className="inline mr-2" />
                          Участник потеряет доступ ко всему контенту
                        </p>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setMemberToRemove(null)}
                        className="border-gray-700 text-gray-300"
                      >
                        Отмена
                      </Button>
                      <Button 
                        onClick={() => handleRemoveMember(member)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold"
                      >
                        Удалить
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyManagement;