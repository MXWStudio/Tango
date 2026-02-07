
export enum View {
  HOME = 'HOME',
  STATS = 'STATS',
  LIBRARY = 'LIBRARY',
  PROFILE = 'PROFILE',
  PRACTICE = 'PRACTICE',
  ADD_WORD = 'ADD_WORD',
  EDIT_PROFILE = 'EDIT_PROFILE'
}

export interface Word {
  id: string;
  kanji: string;
  kana: string;
  romaji: string;
  translation: string;
  category: string;
  progress: number; // 0 to 100
  lastPracticed?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  color: string;
  unlocked: boolean;
}

export interface AppState {
  currentView: View;
  prevView: View;
  words: Word[];
  stats: {
    wpm: number;
    accuracy: number;
    totalTime: string;
    wordsMastered: number;
    streak: number;
  };
}
