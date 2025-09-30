import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface InvitationFlowProps {
  onInvitationSent: (contact: string, method: 'email' | 'phone', name: string) => void;
  onCancel: () => void;
}

type Step = 'method' | 'contact' | 'confirm';

const InvitationFlow = ({ onInvitationSent, onCancel }: InvitationFlowProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('method');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [contact, setContact] = useState('');
  const [memberName, setMemberName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleMethodNext = () => {
    if (!method) {
      toast({
        title: 'Выберите способ',
        description: 'Выберите email или номер телефона',
        variant: 'destructive',
      });
      return;
    }
    setStep('contact');
  };

  const handleSendCode = () => {
    if (!contact || !memberName || !relationship) {
      toast({
        title: 'Заполните все поля',
        description: 'Укажите контакт, имя и степень родства',
        variant: 'destructive',
      });
      return;
    }

    const isValidEmail = method === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const isValidPhone = method === 'phone' && /^\+?[0-9]{10,15}$/.test(contact.replace(/\s/g, ''));

    if (!isValidEmail && !isValidPhone) {
      toast({
        title: 'Неверный формат',
        description: method === 'email' ? 'Введите корректный email' : 'Введите корректный номер телефона',
        variant: 'destructive',
      });
      return;
    }

    setCodeSent(true);
    toast({
      title: 'Код отправлен',
      description: `Код подтверждения отправлен на ${contact}`,
    });
  };

  const handleVerifyAndAdd = () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: 'Введите код',
        description: 'Код подтверждения должен содержать 6 цифр',
        variant: 'destructive',
      });
      return;
    }

    if (verificationCode === '123456') {
      onInvitationSent(contact, method, memberName);
      toast({
        title: 'Участник добавлен',
        description: `${memberName} успешно подтвержден и добавлен в семью`,
      });
    } else {
      toast({
        title: 'Неверный код',
        description: 'Проверьте код и попробуйте снова',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      {step === 'method' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-xl font-semibold mb-2">Выберите способ приглашения</h3>
            <p className="text-gray-400">Для подтверждения родства потребуется верификация</p>
          </div>

          <RadioGroup value={method} onValueChange={(value: 'email' | 'phone') => setMethod(value)}>
            <div className="space-y-3">
              <label
                htmlFor="email"
                className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  method === 'email'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <RadioGroupItem value="email" id="email" className="text-green-500" />
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                    <Icon name="Mail" size={24} className="text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Email</div>
                    <div className="text-sm text-gray-400">Отправим код подтверждения на почту</div>
                  </div>
                </div>
              </label>

              <label
                htmlFor="phone"
                className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  method === 'phone'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <RadioGroupItem value="phone" id="phone" className="text-green-500" />
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                    <Icon name="Phone" size={24} className="text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Номер телефона</div>
                    <div className="text-sm text-gray-400">Отправим SMS с кодом</div>
                  </div>
                </div>
              </label>
            </div>
          </RadioGroup>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex gap-3">
              <Icon name="Shield" size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-400">
                <p className="font-semibold mb-1">Защита от мошенничества</p>
                <p className="text-blue-300">
                  Подтверждение родства помогает защитить вашу подписку от несанкционированного доступа
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-gray-700 text-gray-300"
            >
              Отмена
            </Button>
            <Button
              onClick={handleMethodNext}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold"
            >
              Продолжить
            </Button>
          </div>
        </div>
      )}

      {step === 'contact' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-xl font-semibold mb-2">Данные участника</h3>
            <p className="text-gray-400">Укажите контакты и степень родства</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="member-name" className="text-gray-300 mb-2 block">
                Имя и фамилия
              </Label>
              <Input
                id="member-name"
                placeholder="Например: Мария Петрова"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="contact" className="text-gray-300 mb-2 block">
                {method === 'email' ? 'Email адрес' : 'Номер телефона'}
              </Label>
              <div className="relative">
                <Icon
                  name={method === 'email' ? 'Mail' : 'Phone'}
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  id="contact"
                  type={method === 'email' ? 'email' : 'tel'}
                  placeholder={
                    method === 'email' ? 'example@mail.com' : '+7 (900) 123-45-67'
                  }
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="relationship" className="text-gray-300 mb-2 block">
                Степень родства
              </Label>
              <RadioGroup value={relationship} onValueChange={setRelationship}>
                <div className="grid grid-cols-2 gap-3">
                  {['Супруг(а)', 'Ребенок', 'Родитель', 'Брат/Сестра', 'Бабушка/Дедушка', 'Другое'].map(
                    (rel) => (
                      <label
                        key={rel}
                        htmlFor={rel}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          relationship === rel
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <RadioGroupItem value={rel} id={rel} />
                        <span className="text-sm">{rel}</span>
                      </label>
                    )
                  )}
                </div>
              </RadioGroup>
            </div>

            {!codeSent ? (
              <Button
                onClick={handleSendCode}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold"
              >
                <Icon name="Send" size={20} className="mr-2" />
                Отправить код подтверждения
              </Button>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Icon name="CheckCircle" size={20} className="text-green-400 flex-shrink-0" />
                    <div className="text-sm text-green-400">
                      <p className="font-semibold mb-1">Код отправлен</p>
                      <p className="text-green-300">
                        Проверьте {method === 'email' ? 'почту' : 'телефон'} {contact}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="code" className="text-gray-300 mb-2 block">
                    Код подтверждения
                  </Label>
                  <Input
                    id="code"
                    placeholder="Введите 6-значный код"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="bg-gray-800 border-gray-700 text-white text-center text-2xl tracking-widest font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Для демонстрации используйте код: 123456
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCodeSent(false)}
                    className="flex-1 border-gray-700 text-gray-300"
                  >
                    Отправить снова
                  </Button>
                  <Button
                    onClick={handleVerifyAndAdd}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold"
                  >
                    Подтвердить
                  </Button>
                </div>
              </div>
            )}
          </div>

          {!codeSent && (
            <Button
              variant="ghost"
              onClick={() => setStep('method')}
              className="w-full text-gray-400"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default InvitationFlow;