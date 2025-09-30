import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface FamilyMember {
  id: number;
  name: string;
  email: string;
  initials: string;
  isOwner: boolean;
  joinedDate: string;
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
    },
    {
      id: 2,
      name: 'Мария Петрова',
      email: 'maria@example.com',
      initials: 'МП',
      isOwner: false,
      joinedDate: '16.01.2024',
    },
    {
      id: 3,
      name: 'Дмитрий Иванов',
      email: 'dmitry@example.com',
      initials: 'ДИ',
      isOwner: false,
      joinedDate: '20.01.2024',
    },
  ]);

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<FamilyMember | null>(null);

  const handleAddMember = () => {
    if (!newMemberName || !newMemberEmail) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    if (members.length >= 5) {
      toast({
        title: 'Ошибка',
        description: 'Достигнут лимит участников (5)',
        variant: 'destructive',
      });
      return;
    }

    const initials = newMemberName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    const newMember: FamilyMember = {
      id: Date.now(),
      name: newMemberName,
      email: newMemberEmail,
      initials,
      isOwner: false,
      joinedDate: new Date().toLocaleDateString('ru-RU'),
    };

    setMembers([...members, newMember]);
    setNewMemberName('');
    setNewMemberEmail('');
    setIsAddDialogOpen(false);

    toast({
      title: 'Участник добавлен',
      description: `${newMemberName} получит приглашение на почту`,
    });
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
            <div className="text-3xl font-bold text-white mb-1">₽2069</div>
            <div className="text-gray-400">в месяц</div>
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
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl">Добавить участника</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300 mb-2 block">Имя и фамилия</Label>
                  <Input
                    id="name"
                    placeholder="Например: Иван Иванов"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-300 mb-2 block">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-sm text-green-400">
                    <Icon name="Info" size={16} className="inline mr-2" />
                    Участник получит приглашение на указанную почту
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="border-gray-700 text-gray-300"
                >
                  Отмена
                </Button>
                <Button 
                  onClick={handleAddMember}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold"
                >
                  Добавить
                </Button>
              </DialogFooter>
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
                  </div>
                  <p className="text-gray-400">{member.email}</p>
                  <p className="text-sm text-gray-500 mt-1">Присоединился: {member.joinedDate}</p>
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