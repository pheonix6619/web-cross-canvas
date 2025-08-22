export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
  persona?: string;
  hasImage?: boolean;
}

export interface FileAttachment {
  mime_type: string | null;
  data: string | null;
}

export type PersonaType = 'teacher' | 'friend' | 'mental_health' | 'suggestions';

export interface PersonaConfig {
  id: PersonaType;
  name: string;
  instruction: string;
  avatar: string;
}