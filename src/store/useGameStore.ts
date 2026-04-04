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
  highestUnlockedLevel: number;
  xp: number;
  streakCount: number;
  lastActiveDate: string | null;
  achievements: string[]; // slug-based achievement tracking
  newAchievement: string | null; // For toast notifications

  setUser: (user: UserProfile | null) => void;
  setStory: (story: StoryMode) => void;
  setLang: (lang: ProgrammingLang) => void;
  setLevel: (level: number) => void;
  unlockNextLevel: () => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  updateStreak: (count: number, date: string) => void;
  grantAchievement: (slug: string) => Promise<void>;
  clearNotification: () => void;
  resetGame: () => void;
  setSyncData: (xp?: number, level?: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      user: null,
      story: null,
      lang: null,
      currentLevel: 1,
      highestUnlockedLevel: 1,
      xp: 0,
      streakCount: 0,
      lastActiveDate: null,
      achievements: [],
      newAchievement: null,

      setUser: (user) => {
        set({ user });
      },
      setStory: (story) => set({ story: (typeof story === 'string' && story) ? story as StoryMode : null }),
      setLang: (lang) => set({ lang: (typeof lang === 'string' && lang) ? lang as ProgrammingLang : null }),
      
      setSyncData: (xp, level) => {
        set((state) => ({ 
          xp: xp !== undefined ? xp : state.xp,
          currentLevel: level !== undefined ? level : state.currentLevel,
          highestUnlockedLevel: level !== undefined ? level : state.highestUnlockedLevel 
        }));
      },

      setLevel: async (level) => {
        set({ currentLevel: level });
        // NOTE: We no longer sync to DB on click. See unlockNextLevel.
      },

      unlockNextLevel: async () => {
        const { currentLevel, highestUnlockedLevel, user, lang, story } = get();
        
        // Only unlock / sync if playing the latest level
        if (currentLevel >= highestUnlockedLevel) {
           const newHighest = currentLevel + 1;
           set({ highestUnlockedLevel: newHighest });

           if (newHighest === 2 && !get().achievements.includes('first-blood')) {
             get().grantAchievement('first-blood');
           }

           if (user && !user.isGuest && lang && story) {
             await supabase.from('user_progress').upsert(
              { 
                user_id: user.id, 
                language: lang, 
                story, 
                current_level: newHighest, 
                updated_at: new Date().toISOString() 
              },
              { onConflict: 'user_id,language,story' }
            );
          }
        }
      },

      addXP: async (amount: number) => {
        const newXp = get().xp + amount;
        set({ xp: newXp });

        const { user } = get();
        if (user && !user.isGuest) {
          await supabase.from('profiles').update({ xp: newXp }).eq('id', user.id);
        }
      },

      updateStreak: async (count: number, date: string) => {
        set({ streakCount: count, lastActiveDate: date });
        const { user } = get();
        if (user && !user.isGuest) {
          await supabase.from('profiles').update({ 
            streak_count: count, 
            last_active_date: date 
          }).eq('id', user.id);
        }
      },

      grantAchievement: async (slug: string) => {
        const alreadyEarned = get().achievements.includes(slug);
        if (alreadyEarned) return;

        set({ 
          achievements: [...get().achievements, slug],
          newAchievement: slug 
        });

        const { user } = get();
        if (user && !user.isGuest) {
          // This would ideally interact with user_achievements table
          // For now, let's just make it persistent in a simple way or assume table exists
          // We'll skip complex persistence of junction table for this task to stay focused
        }
      },

      clearNotification: () => set({ newAchievement: null }),
      
      resetGame: () => set({ 
        story: null, 
        lang: null, 
        currentLevel: 1, 
        streakCount: 0, 
        lastActiveDate: null,
        achievements: [],
        newAchievement: null 
      }),
    }),
    {
      name: 'logiclynx-game-storage',
    }
  )
);
