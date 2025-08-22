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
    <div className="border-t border-border p-4 bg-background">
      {attachment.data && (
        <div className="mb-2 p-2 bg-muted rounded-lg flex items-center justify-between">
          <span className="text-sm text-muted-foreground">📷 Image attached</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setAttachment({ mime_type: null, data: null })}
          >
            ✕
          </Button>
        </div>
      )}
      <div className="flex gap-2">
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
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1"
        />
        <Button 
          onClick={handleSend} 
          disabled={disabled || (!message.trim() && !attachment.data)}
        >
          <SendIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};