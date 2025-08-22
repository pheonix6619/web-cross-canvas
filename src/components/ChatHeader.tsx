import chatLogo from '@/assets/chat-logo.png';
import { Sparkles, MessageSquare } from 'lucide-react';

export const ChatHeader = () => {
  return (
    <div className="bg-gradient-primary text-primary-foreground p-6 shadow-medium">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={chatLogo} 
              alt="AI Chat Logo" 
              className="w-12 h-12 rounded-xl shadow-soft animate-scale-in"
            />
            <div className="absolute -top-1 -right-1 bg-accent rounded-full p-1 animate-bounce-gentle">
              <Sparkles className="w-3 h-3 text-accent-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              AI Chat Hub
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              Intelligent conversations powered by AI
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 text-sm text-primary-foreground/70">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Online</span>
        </div>
      </div>
    </div>
  );
};