import Editor from '@monaco-editor/react';
import { useAppStore } from '@/store/useAppStore';

export const CodeEditor = () => {
  const { editorCode, setEditorCode } = useAppStore();

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-destructive/60" />
          <div className="h-3 w-3 rounded-full bg-difficulty-medium/60" />
          <div className="h-3 w-3 rounded-full bg-accent/60" />
        </div>
        <span className="text-xs font-mono text-muted-foreground ml-2">solution.js</span>
      </div>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={editorCode}
        onChange={(value) => setEditorCode(value || '')}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 16 },
          lineNumbersMinChars: 3,
          renderLineHighlight: 'gutter',
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          bracketPairColorization: { enabled: true },
          automaticLayout: true,
        }}
      />
    </div>
  );
};
