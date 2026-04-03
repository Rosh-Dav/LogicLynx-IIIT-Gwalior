import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StoryMode = 'cyberpunk' | 'fantasy' | null;
type ProgrammingLang = 'python' | 'c' | null;

interface UserProfile {
  id: string;
  name: string;
  isGuest: boolean;
}

interface GameState {
  user: UserProfile | null;
  story: StoryMode;
  lang: ProgrammingLang;
  currentLevel: number;

  setUser: (user: UserProfile | null) => void;
  setStory: (story: StoryMode) => void;
  setLang: (lang: ProgrammingLang) => void;
  setLevel: (level: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      user: null,
      story: null,
      lang: null,
      currentLevel: 1,

      setUser: (user) => set({ user }),
      setStory: (story) => set({ story }),
      setLang: (lang) => set({ lang }),
      setLevel: (level) => set({ currentLevel: level }),
      
      resetGame: () => set({ story: null, lang: null, currentLevel: 1 }),
    }),
    {
      name: 'logiclynx-game-storage',
    }
  )
);
