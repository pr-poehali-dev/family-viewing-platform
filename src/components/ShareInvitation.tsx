import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ShareInvitationProps {
  onClose: () => void;
}

const ShareInvitation = ({ onClose }: ShareInvitationProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const inviteLink = 'https://start.tv/invite/family-abc123';
  const inviteMessage = `Присоединяйся к нашей семейной подписке START! 🎬\n\nЭкономь до 60% на просмотре фильмов и сериалов.\n\n${inviteLink}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast({
      title: 'Ссылка скопирована',
      description: 'Поделитесь ссылкой с родственниками',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(inviteMessage)}`, '_blank');
  };

  const handleShareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent('Присоединяйся к нашей семейной подписке START! 🎬')}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = 'Приглашение в семейную подписку START';
    const body = inviteMessage;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const handleShareVK = () => {
    window.open(`https://vk.com/share.php?url=${encodeURIComponent(inviteLink)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4">
          <Icon name="Share2" size={40} className="text-black" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Пригласите в семью</h3>
        <p className="text-gray-400">Поделитесь ссылкой через мессенджеры или email</p>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
        <div className="flex items-center gap-3">
          <Input
            value={inviteLink}
            readOnly
            className="bg-gray-800 border-gray-700 text-gray-300 flex-1"
          />
          <Button
            onClick={handleCopyLink}
            className={`px-6 ${
              copied
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-800 hover:bg-gray-700'
            } transition-colors`}
          >
            <Icon name={copied ? 'Check' : 'Copy'} size={18} className="mr-2" />
            {copied ? 'Скопировано' : 'Копировать'}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-400 font-medium">Поделиться через:</p>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleShareWhatsApp}
            variant="outline"
            className="border-gray-800 hover:border-green-500 hover:bg-green-500/10 text-white justify-start h-auto py-4"
          >
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
              <Icon name="MessageCircle" size={20} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold">WhatsApp</div>
              <div className="text-xs text-gray-400">Отправить сообщение</div>
            </div>
          </Button>

          <Button
            onClick={handleShareTelegram}
            variant="outline"
            className="border-gray-800 hover:border-blue-500 hover:bg-blue-500/10 text-white justify-start h-auto py-4"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
              <Icon name="Send" size={20} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Telegram</div>
              <div className="text-xs text-gray-400">Поделиться в чате</div>
            </div>
          </Button>

          <Button
            onClick={handleShareEmail}
            variant="outline"
            className="border-gray-800 hover:border-red-500 hover:bg-red-500/10 text-white justify-start h-auto py-4"
          >
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-3">
              <Icon name="Mail" size={20} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Email</div>
              <div className="text-xs text-gray-400">Отправить письмо</div>
            </div>
          </Button>

          <Button
            onClick={handleShareVK}
            variant="outline"
            className="border-gray-800 hover:border-blue-400 hover:bg-blue-400/10 text-white justify-start h-auto py-4"
          >
            <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center mr-3">
              <Icon name="Share2" size={20} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold">ВКонтакте</div>
              <div className="text-xs text-gray-400">Поделиться записью</div>
            </div>
          </Button>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex gap-3">
          <Icon name="Info" size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-400">
            <p className="font-semibold mb-1">Как это работает</p>
            <p className="text-blue-300">
              Отправьте ссылку родственнику. После перехода по ссылке и подтверждения родства он будет добавлен в семейную подписку.
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={onClose}
        variant="outline"
        className="w-full border-gray-700 text-gray-300"
      >
        Закрыть
      </Button>
    </div>
  );
};

export default ShareInvitation;