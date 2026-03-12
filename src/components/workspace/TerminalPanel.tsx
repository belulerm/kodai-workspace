import { useAppStore } from '@/store/useAppStore';
import { Terminal, Play, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const TerminalPanel = () => {
  const { terminalLines, addTerminalLine, clearTerminal, editorCode, activeChallenge } = useAppStore();

  // TODO: Inject Pyodide WebWorker logic here for client-side evaluation
  const handleRunCode = () => {
    clearTerminal();
    addTerminalLine({ content: '> Running code...', type: 'info' });

    // Mock execution: grab the string value from Monaco editor and print it
    addTerminalLine({ content: editorCode, type: 'output' });

    // Hardcoded success/failure message
    if (activeChallenge) {
      const mockSuccess = Math.random() > 0.3;
      if (mockSuccess) {
        addTerminalLine({ content: `✓ Output matches expected: "${activeChallenge.expected_output}"`, type: 'success' });
        addTerminalLine({ content: `+${activeChallenge.xp_reward} XP earned!`, type: 'success' });
      } else {
        addTerminalLine({ content: `✗ Expected: "${activeChallenge.expected_output}" but got different output`, type: 'error' });
        addTerminalLine({ content: 'Try again! Hint: Check your return statement.', type: 'info' });
      }
    }
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-terminal overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-terminal-green" />
          <span className="text-xs font-mono text-muted-foreground">Terminal</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={clearTerminal}>
            <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
          <Button size="sm" className="h-7 gap-1.5 text-xs font-mono" onClick={handleRunCode}>
            <Play className="h-3 w-3" />
            Run
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm scrollbar-thin">
        {terminalLines.length === 0 ? (
          <p className="text-muted-foreground text-xs">Click "Run" to execute your code...</p>
        ) : (
          terminalLines.map((line) => (
            <div key={line.id} className={cn(
              "py-0.5 whitespace-pre-wrap",
              line.type === 'output' && 'text-foreground',
              line.type === 'error' && 'text-destructive',
              line.type === 'info' && 'text-muted-foreground',
              line.type === 'success' && 'text-terminal-green',
            )}>
              {line.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
