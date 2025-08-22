import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { personaConfigs } from '@/config/personas';
import { PersonaType, PersonaConfig } from '@/types/chat';

interface PersonaSelectorProps {
  selectedPersona: PersonaType;
  onPersonaChange: (persona: PersonaType) => void;
}

export const PersonaSelector = ({ selectedPersona, onPersonaChange }: PersonaSelectorProps) => {
  return (
    <div className="flex items-center gap-2 p-4 border-b border-border">
      <span className="text-sm text-muted-foreground font-medium">Chat with:</span>
      <Select value={selectedPersona} onValueChange={onPersonaChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {personaConfigs.map((persona: PersonaConfig) => (
            <SelectItem key={persona.id} value={persona.id}>
              <div className="flex items-center gap-2">
                <img 
                  src={persona.avatar} 
                  alt={persona.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                {persona.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};