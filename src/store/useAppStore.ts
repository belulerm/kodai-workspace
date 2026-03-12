import { create } from 'zustand';
import type { Tables } from '@/integrations/supabase/types';

export type Challenge = Tables<'challenges'>;
export type Profile = Tables<'profiles'>;
export type UserProgress = Tables<'user_progress'>;

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface TerminalLine {
  id: string;
  content: string;
  type: 'output' | 'error' | 'info' | 'success';
}

interface AppState {
  // Auth
  userId: string | null;
  profile: Profile | null;
  setUserId: (id: string | null) => void;
  setProfile: (profile: Profile | null) => void;

  // Challenge
  activeChallenge: Challenge | null;
  editorCode: string;
  setActiveChallenge: (challenge: Challenge | null) => void;
  setEditorCode: (code: string) => void;

  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;

  // Terminal
  terminalLines: TerminalLine[];
  addTerminalLine: (line: Omit<TerminalLine, 'id'>) => void;
  clearTerminal: () => void;

  // Progress
  userProgress: UserProgress[];
  setUserProgress: (progress: UserProgress[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  userId: null,
  profile: null,
  setUserId: (id) => set({ userId: id }),
  setProfile: (profile) => set({ profile }),

  activeChallenge: null,
  editorCode: '',
  setActiveChallenge: (challenge) => set({ 
    activeChallenge: challenge, 
    editorCode: challenge?.initial_code || '',
    terminalLines: [],
    chatMessages: [],
  }),
  setEditorCode: (code) => set({ editorCode: code }),

  chatMessages: [],
  addChatMessage: (msg) => set((state) => ({
    chatMessages: [...state.chatMessages, {
      ...msg,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }],
  })),
  clearChat: () => set({ chatMessages: [] }),

  terminalLines: [],
  addTerminalLine: (line) => set((state) => ({
    terminalLines: [...state.terminalLines, { ...line, id: crypto.randomUUID() }],
  })),
  clearTerminal: () => set({ terminalLines: [] }),

  userProgress: [],
  setUserProgress: (progress) => set({ userProgress: progress }),
}));
