import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { CodeEditor } from '@/components/workspace/CodeEditor';
import { TerminalPanel } from '@/components/workspace/TerminalPanel';
import { ChallengePanel } from '@/components/workspace/ChallengePanel';
import { AIChatPanel } from '@/components/workspace/AIChatPanel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Bot, Code2 } from 'lucide-react';
import { useEffect } from 'react';

const Workspace = () => {
  const navigate = useNavigate();
  const { activeChallenge } = useAppStore();

  useEffect(() => {
    if (!activeChallenge) navigate('/');
  }, [activeChallenge, navigate]);

  if (!activeChallenge) return null;

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-2 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm font-semibold text-primary">KodAI</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-sm font-medium text-foreground">{activeChallenge.title}</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Challenge + Chat Tabs */}
        <div className="w-[380px] flex-shrink-0 border-r border-border flex flex-col">
          <Tabs defaultValue="challenge" className="flex flex-1 flex-col overflow-hidden">
            <TabsList className="mx-3 mt-3 bg-muted border border-border">
              <TabsTrigger value="challenge" className="gap-1.5 text-xs font-mono data-[state=active]:bg-card data-[state=active]:text-primary">
                <BookOpen className="h-3.5 w-3.5" />
                Challenge
              </TabsTrigger>
              <TabsTrigger value="chat" className="gap-1.5 text-xs font-mono data-[state=active]:bg-card data-[state=active]:text-primary">
                <Bot className="h-3.5 w-3.5" />
                AI Tutor
              </TabsTrigger>
            </TabsList>
            <TabsContent value="challenge" className="flex-1 overflow-hidden mt-0">
              <ChallengePanel />
            </TabsContent>
            <TabsContent value="chat" className="flex-1 overflow-hidden mt-0">
              <AIChatPanel />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Editor + Terminal */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Editor - 70% */}
          <div className="flex-[7] overflow-hidden p-2 pb-1">
            <CodeEditor />
          </div>
          {/* Terminal - 30% */}
          <div className="flex-[3] overflow-hidden p-2 pt-1">
            <TerminalPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
