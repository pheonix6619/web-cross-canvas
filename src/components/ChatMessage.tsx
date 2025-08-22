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
    <div className={`flex gap-3 p-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="flex-shrink-0">
        <img 
          src={avatar} 
          alt={isUser ? 'User' : persona?.name} 
          className="w-10 h-10 rounded-full object-cover border-2 border-border"
        />
      </div>
      <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
        <div 
          className={`inline-block max-w-[80%] p-3 rounded-lg ${
            isUser 
              ? 'bg-primary text-primary-foreground ml-auto' 
              : 'bg-muted text-muted-foreground'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
          {message.hasImage && (
            <p className="text-xs opacity-70 mt-1">📷 Image attached</p>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1 px-1">
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};