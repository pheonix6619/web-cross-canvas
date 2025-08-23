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
          <div className="flex items-center gap-2">
            <img 
              src={personaConfigs.find(p => p.id === selectedPersona)?.avatar} 
              alt={personaConfigs.find(p => p.id === selectedPersona)?.name}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="font-medium">
              {personaConfigs.find(p => p.id === selectedPersona)?.name}
            </span>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-background/95 backdrop-blur-md border border-border/50 shadow-strong">
          {personaConfigs.map((persona: PersonaConfig) => (
            <SelectItem 
              key={persona.id} 
              value={persona.id}
              className="hover:bg-primary/10 transition-all duration-200 cursor-pointer p-4"
            >
              <div className="flex items-start gap-3 py-1">
                <div className="relative flex-shrink-0 mt-1">
                  <img 
                    src={persona.avatar} 
                    alt={persona.name}
                    className="w-8 h-8 rounded-full object-cover border border-border/50 shadow-soft"
                  />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground mb-1">{persona.name}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {persona.instruction}
                  </p>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};