import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabaseClient';

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
  xp: number;

  setUser: (user: UserProfile | null) => void;
  setStory: (story: StoryMode) => void;
  setLang: (lang: ProgrammingLang) => void;
  setLevel: (level: number) => void;
  addXP: (amount: number) => Promise<void>;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      user: null,
      story: null,
      lang: null,
      currentLevel: 1,
      xp: 0,

      setUser: (user) => {
        set({ user });
        // Optionally fetch their latest XP here if needed, 
        // but typically doing it on the Profile/Leaderboard makes sense.
      },
      setStory: (story) => set({ story: (typeof story === 'string' && story) ? story as StoryMode : null }),
      setLang: (lang) => set({ lang: (typeof lang === 'string' && lang) ? lang as ProgrammingLang : null }),
      
      setLevel: async (level) => {
        const prevLevel = get().currentLevel;
        set({ currentLevel: level });
        
        // If they advanced a level, grant 10 XP
        if (level > prevLevel) {
          get().addXP(10);
        }

        const { user, lang, story } = get();
        
        // Sync progress to Supabase for authenticated users
        if (user && !user.isGuest && lang && story) {
           await supabase.from('user_progress').upsert(
            { 
              user_id: user.id, 
              language: lang, 
              story, 
              current_level: level, 
              updated_at: new Date().toISOString() 
            },
            { onConflict: 'user_id,language,story' }
          );
        }
      },

      addXP: async (amount: number) => {
        const newXp = get().xp + amount;
        set({ xp: newXp });

        const { user } = get();
        if (user && !user.isGuest) {
          // Push XP to profiles table
          await supabase.from('profiles').update({ xp: newXp }).eq('id', user.id);
        }
      },
      
      resetGame: () => set({ story: null, lang: null, currentLevel: 1 }),
    }),
    {
      name: 'logiclynx-game-storage',
    }
  )
);
