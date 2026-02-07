
import React, { useState, useEffect, useRef } from 'react';
import { View, Word } from '../types';
import { t } from '../src/locales/i18n';
import { dataService } from '../src/services/dataService';

interface PracticeProps {
  onNavigate: (view: View) => void;
  words: Word[];
}

const Practice: React.FC<PracticeProps> = ({ onNavigate, words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100 });
  const [startTime, setStartTime] = useState<number | null>(null);
  const [charCount, setCharCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentWord = words[currentIndex] || words[0];

  useEffect(() => {
    inputRef.current?.focus();
    if (!startTime && words.length > 0) {
      setStartTime(Date.now());
    }
  }, [currentIndex, startTime, words.length]);

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setUserInput(val);

    // 记录输入的总字符数用于 WPM 计算
    setCharCount(prev => prev + 1);

    if (val === currentWord.romaji || val === currentWord.kana) {
      const isLastWord = currentIndex === words.length - 1;

      // 更新进度到数据库
      await dataService.updateProgress(currentWord.id, Math.min(currentWord.progress + 10, 100));

      setTimeout(() => {
        if (!isLastWord) {
          setCurrentIndex(prev => prev + 1);
          setUserInput('');
        } else {
          handleComplete();
        }
      }, 300);
    }
  };

  const handleComplete = () => {
    if (!startTime) return;

    const durationSeconds = (Date.now() - startTime) / 1000;
    const finalWpm = Math.round((charCount / 5) / (durationSeconds / 60));

    // 🇨🇳 防作弊逻辑 (CRITICAL)
    // 1. 如果 WPM > 10 chars/sec (即 120 WPM 假设每词5字符, 这里直接校验总字符速更能防暴力输入) 持续高频则拦截
    // 2. 如果 50 字符练习少于 2 秒完成
    const isCheating = (charCount / durationSeconds > 10) || (charCount >= 50 && durationSeconds < 2);

    if (isCheating) {
      alert(t('practice.cheat_detected'));
      onNavigate(View.HOME);
    } else {
      setStats(prev => ({ ...prev, wpm: finalWpm }));
      onNavigate(View.STATS);
    }
  };

  const progressPercent = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark">
      <header className="flex items-center justify-between px-4 pt-12 pb-4 sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
        <button
          onClick={() => onNavigate(View.HOME)}
          className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-primary"
        >
          <span className="material-symbols-outlined text-3xl">chevron_left</span>
        </button>
        <div className="flex flex-col items-center flex-1 mx-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">JLPT N5 核心词汇</span>
          <div className="h-1.5 w-full max-w-[100px] rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
        <button
          onClick={() => setCurrentIndex(prev => (prev + 1) % words.length)}
          className="size-10 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold text-sm hover:text-primary transition-colors"
        >
          跳过
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 w-full relative">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col items-center gap-2 mb-12">
          <div className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-4">{currentIndex + 1} / {words.length}</div>
          <h1 className="font-japanese text-[56px] font-bold leading-tight text-slate-900 dark:text-white tracking-wide text-center">
            {currentWord.kanji.split('').map((char, i) => (
              <span key={i} className={i === 0 ? 'char-active' : ''}>{char}</span>
            ))}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-normal tracking-wide text-center mt-2">{currentWord.romaji}</p>
        </div>

        <div className="w-full max-w-[320px] relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-primary">
            <span className="material-symbols-outlined">keyboard</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInput}
            className="w-full h-16 rounded-full border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 pl-12 pr-12 text-center text-xl text-slate-800 dark:text-white placeholder:text-slate-300 focus:border-primary focus:ring-0 focus:shadow-glow transition-all outline-none font-display"
            placeholder="输入读音..."
            autoFocus
          />
          {userInput && (
            <button onClick={() => setUserInput('')} className="absolute inset-y-0 right-4 flex items-center text-slate-300 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">cancel</span>
            </button>
          )}
        </div>
      </main>

      <footer className="p-8 pb-10 w-full bg-background-light dark:bg-background-dark">
        <div className="flex items-center justify-center gap-12">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">速度 (WPM)</span>
            <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">{stats.wpm}</span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">正确率</span>
            <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">{stats.accuracy}%</span>
          </div>
        </div>
        <div className="h-1 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mt-8 opacity-50"></div>
      </footer>
    </div>
  );
};

export default Practice;
