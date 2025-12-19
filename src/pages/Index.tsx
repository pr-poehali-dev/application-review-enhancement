import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [isProcessing, setIsProcessing] = useState(true);
  const totalTime = 180;
  const applicationNumber = "№ 2025-12-19-00784";
  
  const loanData = {
    amount: "88 000 ₽",
    returnDate: "13.03.2026",
    applicationDate: "19.12.2025"
  };

  const specialist = {
    name: "Алексей Морозов",
    position: "Специалист по займам",
    phone: "+7 (495) 123-45-67",
    email: "a.morozov@company.ru",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsProcessing(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;

  if (!isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl animate-fade-in">
          <Card className="p-8 md:p-12 text-center shadow-lg">
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle2" size={48} className="text-primary" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Заявка обработана</h1>
            <p className="text-xl text-muted-foreground mb-6">Заявка {applicationNumber}</p>
            
            <Card className="bg-accent/5 p-6 mb-8">
              <div className="flex items-start gap-4 text-left">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Ожидайте звонка специалиста</h3>
                  <p className="text-muted-foreground">
                    Мы свяжемся с вами с <span className="font-semibold">09:00 до 18:00</span> по московскому времени
                  </p>
                </div>
              </div>
            </Card>

            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold mb-6">Ваш персональный специалист</h3>
              
              <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-card border rounded-xl">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={specialist.avatar} alt={specialist.name} />
                  <AvatarFallback>{specialist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-xl font-semibold mb-1">{specialist.name}</h4>
                  <p className="text-muted-foreground mb-4">{specialist.position}</p>
                  
                  <div className="space-y-2">
                    <a href={`tel:${specialist.phone}`} className="flex items-center justify-center md:justify-start gap-2 text-primary hover:underline">
                      <Icon name="Phone" size={18} />
                      <span>{specialist.phone}</span>
                    </a>
                    <a href={`mailto:${specialist.email}`} className="flex items-center justify-center md:justify-start gap-2 text-primary hover:underline">
                      <Icon name="Mail" size={18} />
                      <span>{specialist.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Договор займа</h1>
          <p className="text-muted-foreground text-lg">от {loanData.applicationDate}</p>
        </div>

        <Card className="p-8 md:p-12 shadow-lg mb-6 animate-scale-in">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
              <svg className="transform -rotate-90 w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercent / 100)}`}
                  className="text-primary transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 md:w-36 md:h-36 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Loader2" size={48} className="text-primary animate-spin" />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Обработка данных</h2>
            <p className="text-muted-foreground">Обычно это занимает менее 3 минут</p>
          </div>

          <Card className="bg-accent/5 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Clock" size={24} className="text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Рассмотрение заявки</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{formatTime(timeLeft)}</span>
                  <span className="text-muted-foreground">осталось</span>
                </div>
              </div>
            </div>
            <Progress value={progressPercent} className="mt-4" />
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default Index;