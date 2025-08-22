import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { personaConfigs } from '@/config/personas';
import { PersonaType, PersonaConfig } from '@/types/chat';

interface PersonaSelectorProps {
  selectedPersona: PersonaType;
  onPersonaChange: (persona: PersonaType) => void;
}

export const PersonaSelector = ({ selectedPersona, onPersonaChange }: PersonaSelectorProps) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-gradient-secondary/50 backdrop-blur-sm border-b border-border/50 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold text-foreground">Chat Persona:</span>
      </div>
      
      <Select value={selectedPersona} onValueChange={onPersonaChange}>
        <SelectTrigger className="w-48 bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-soft hover:shadow-medium">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-background/95 backdrop-blur-md border border-border/50 shadow-strong">
          {personaConfigs.map((persona: PersonaConfig) => (
            <SelectItem 
              key={persona.id} 
              value={persona.id}
              className="hover:bg-primary/10 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-3 py-1">
                <div className="relative">
                  <img 
                    src={persona.avatar} 
                    alt={persona.name}
                    className="w-6 h-6 rounded-full object-cover border border-border/50 shadow-soft"
                  />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="font-medium">{persona.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};