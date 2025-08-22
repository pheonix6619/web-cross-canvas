import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageIcon, SendIcon } from 'lucide-react';
import { FileAttachment } from '@/types/chat';

interface ChatInputProps {
  onSendMessage: (message: string, attachment?: FileAttachment) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<FileAttachment>({ mime_type: null, data: null });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage && !attachment.data) return;
    
    onSendMessage(trimmedMessage, attachment.data ? attachment : undefined);
    setMessage('');
    setAttachment({ mime_type: null, data: null });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAttachment({
          mime_type: file.type,
          data: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gradient-secondary/30 backdrop-blur-sm border-t border-border/50 p-4 animate-fade-in">
      {attachment.data && (
        <div className="mb-3 p-3 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-between animate-scale-in">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm text-accent font-medium">Image ready to send</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setAttachment({ mime_type: null, data: null })}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          >
            ✕
          </Button>
        </div>
      )}
      
      <div className="flex gap-3 items-end">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="h-12 w-12 bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 shadow-soft hover:shadow-medium group"
        >
          <ImageIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
        </Button>
        
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Press Enter to send)"
            disabled={disabled}
            className="h-12 bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 focus:border-primary transition-all duration-300 shadow-soft focus:shadow-medium pr-4 text-foreground placeholder:text-muted-foreground/60"
          />
          {disabled && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce-gentle"></div>
                <span>AI is thinking...</span>
              </div>
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleSend} 
          disabled={disabled || (!message.trim() && !attachment.data)}
          className="h-12 px-6 bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-soft hover:shadow-medium transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="ml-2 hidden sm:inline">Send</span>
        </Button>
      </div>
    </div>
  );
};