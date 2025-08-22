import { ChatInterface } from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg p-2 sm:p-4 md:p-6">
      <div className="animate-fade-in">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
