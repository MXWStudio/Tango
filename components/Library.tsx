
import React, { useState } from 'react';
import { View, Word } from '../types';
import { t } from '../src/locales/i18n';

interface LibraryProps {
  onNavigate: (view: View) => void;
  words: Word[];
}

const Library: React.FC<LibraryProps> = ({ onNavigate, words }) => {
  const [filter, setFilter] = useState<'unlearned' | 'mastered'>('unlearned');
  const [search, setSearch] = useState('');

  const filteredWords = words.filter(w => {
    const isTabMatch = filter === 'mastered' ? w.progress >= 80 : w.progress < 80;
    const isSearchMatch = w.kanji.includes(search) || w.translation.includes(search) || w.romaji.includes(search);
    return isTabMatch && isSearchMatch;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark">
      <header className="px-6 pt-12 pb-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
        <div className="flex justify-between items-end mb-4">
          <h1 className="text-[32px] font-bold tracking-tight text-slate-900 dark:text-white leading-none font-display">
            {t('library.title')}
          </h1>
          <button
            onClick={() => onNavigate(View.ADD_WORD)}
            className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[28px]">add</span>
          </button>
        </div>

        <div className="relative w-full mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-slate-200/60 dark:bg-slate-800/60 placeholder-slate-400 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 transition-all text-[17px]"
            placeholder={t('library.search_placeholder')}
          />
        </div>

        {/* 优化的分段选择器样式 */}
        <div className="bg-slate-200/60 dark:bg-slate-800/60 p-1 rounded-xl flex w-full">
          <button
            onClick={() => setFilter('unlearned')}
            className={`flex-1 py-2 text-[15px] font-bold rounded-[20px] transition-all text-center ${filter === 'unlearned'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400'
              }`}
          >
            未掌握
          </button>
          <button
            onClick={() => setFilter('mastered')}
            className={`flex-1 py-2 text-[15px] font-bold rounded-[20px] transition-all text-center ${filter === 'mastered'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400'
              }`}
          >
            已熟练
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar space-y-4 pt-4">
        <div className="flex items-center justify-between pt-2">
          <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">今日复习 ({filteredWords.length})</h2>
          <button className="text-primary text-sm font-medium">查看全部</button>
        </div>

        {filteredWords.map((word) => {
          const radius = 14;
          const strokeWidth = 3;
          const circumference = 2 * Math.PI * radius;
          const offset = circumference - (word.progress / 100) * circumference;

          return (
            <div key={word.id} className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-card flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer border border-transparent hover:border-primary/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-tight">{word.kana}</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight font-japanese">{word.kanji}</h3>
                  <p className="text-sm text-slate-400 font-medium">{word.translation}</p>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <div className="relative flex items-center justify-center w-11 h-11">
                  <svg
                    className="transform -rotate-90 w-11 h-11 overflow-visible"
                    viewBox="0 0 44 44"
                  >
                    <circle
                      className="text-slate-100 dark:text-slate-800"
                      cx="22" cy="22" fill="transparent" r={radius}
                      stroke="currentColor" strokeWidth={strokeWidth}
                    />
                    <circle
                      className="text-primary transition-all duration-500 ease-out"
                      cx="22" cy="22" fill="transparent" r={radius}
                      stroke="currentColor"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-bold dark:text-white font-display">{word.progress}</span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredWords.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            <span className="material-symbols-outlined text-4xl block mb-2 opacity-20">inbox</span>
            <p className="font-medium">没有找到相关单词</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Library;
