import { ChatMessage as ChatMessageType } from '@/types/chat';
import { getPersonaConfig } from '@/config/personas';
import userAvatar from '@/assets/user_avatar.png';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.type === 'user';
  const persona = isUser ? null : getPersonaConfig(message.persona || 'teacher');
  const avatar = isUser ? userAvatar : persona?.avatar;

  return (
    <div className={`flex gap-4 p-4 group hover:bg-chat-hover/50 transition-all duration-300 ${
      isUser ? 'flex-row-reverse animate-slide-in-right' : 'flex-row animate-slide-in-left'
    }`}>
      <div className="flex-shrink-0">
        <div className="relative">
          <img 
            src={avatar} 
            alt={isUser ? 'User' : persona?.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-border shadow-soft group-hover:shadow-medium transition-all duration-300 group-hover:scale-105"
          />
          {!isUser && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background animate-pulse"></div>
          )}
        </div>
      </div>
      <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
        <div className="mb-1">
          <span className="text-xs font-medium text-muted-foreground">
            {isUser ? 'You' : persona?.name}
          </span>
        </div>
        <div 
          className={`inline-block max-w-[85%] md:max-w-[75%] p-4 rounded-2xl shadow-soft transition-all duration-300 hover:shadow-medium ${
            isUser 
              ? 'bg-gradient-primary text-primary-foreground ml-auto' 
              : 'bg-card/80 backdrop-blur-sm text-card-foreground border border-border/50'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          {message.hasImage && (
            <div className="flex items-center gap-2 mt-2 text-xs opacity-80">
              <div className="w-2 h-2 bg-current rounded-full"></div>
              <span>Image attached</span>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2 px-2">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};