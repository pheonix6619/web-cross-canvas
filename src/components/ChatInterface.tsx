import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { PersonaSelector } from './PersonaSelector';
import { ChatInput } from './ChatInput';
import { PersonaType, ChatMessage as ChatMessageType, FileAttachment } from '@/types/chat';
import { getPersonaConfig } from '@/config/personas';
import { generateGeminiResponse } from '@/services/geminiApi';
import { useToast } from '@/hooks/use-toast';

export const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>('teacher');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string, attachment?: FileAttachment) => {
    if (!content.trim() && !attachment) return;

    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content: content || 'Image attached',
      type: 'user',
      timestamp: new Date(),
      hasImage: !!attachment
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Add temporary AI message with typing indicator
    const tempAiMessage: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      content: '...',
      type: 'ai',
      timestamp: new Date(),
      persona: selectedPersona
    };

    setMessages(prev => [...prev, tempAiMessage]);

    try {
      // Generate AI response
      const personaConfig = getPersonaConfig(selectedPersona);
      const fullPrompt = `${personaConfig.instruction}\n${content}`;
      
      const aiResponse = await generateGeminiResponse(fullPrompt, attachment);

      // Replace temporary message with actual response
      setMessages(prev => prev.map(msg => 
        msg.id === tempAiMessage.id 
          ? { ...msg, content: aiResponse }
          : msg
      ));

    } catch (error) {
      console.error('Error generating response:', error);
      
      // Replace temporary message with error message
      setMessages(prev => prev.map(msg => 
        msg.id === tempAiMessage.id 
          ? { ...msg, content: 'Sorry, I encountered an error while generating a response. Please try again.' }
          : msg
      ));

      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-background border border-border rounded-lg overflow-hidden">
      <PersonaSelector 
        selectedPersona={selectedPersona}
        onPersonaChange={setSelectedPersona}
      />
      
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center p-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Welcome to AI Chat
              </h2>
              <p className="text-muted-foreground">
                Select a persona and start chatting!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={isLoading}
      />
    </div>
  );
};