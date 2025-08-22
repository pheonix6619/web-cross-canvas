import { PersonaConfig } from '@/types/chat';
import teacherAvatar from '@/assets/teacher_avatar.png';
import friendAvatar from '@/assets/friend_avatar.png';
import healthAvatar from '@/assets/health_avatar.png';
import suggestAvatar from '@/assets/suggest_avatar.png';

export const personaConfigs: PersonaConfig[] = [
  {
    id: 'teacher',
    name: 'Teacher',
    instruction: 'You are a helpful teacher. Explain concepts clearly and simply.',
    avatar: teacherAvatar
  },
  {
    id: 'friend',
    name: 'Friend',
    instruction: 'You are a friendly companion. Respond casually and supportively.',
    avatar: friendAvatar
  },
  {
    id: 'mental_health',
    name: 'Mental Health',
    instruction: 'You are a compassionate mental health supporter. Give gentle, supportive advice.',
    avatar: healthAvatar
  },
  {
    id: 'suggestions',
    name: 'Suggestions',
    instruction: 'You are an idea generator. Offer creative or practical suggestions.',
    avatar: suggestAvatar
  }
];

export const getPersonaConfig = (id: string) => 
  personaConfigs.find(p => p.id === id) || personaConfigs[0];