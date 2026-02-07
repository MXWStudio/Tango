
import React, { useState, useEffect } from 'react';
import { View, Word } from '../types';
import { CATEGORIES } from '../constants';
import { GoogleGenAI, Type } from "@google/genai";

interface AddWordProps {
  onNavigate: (view: View) => void;
  onAdd: (word: Word) => void;
}

const AddWord: React.FC<AddWordProps> = ({ onNavigate, onAdd }) => {
  const [kanji, setKanji] = useState('');
  const [kana, setKana] = useState('');
  const [romaji, setRomaji] = useState('');
  const [translation, setTranslation] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<{ kanji: string; kana: string; translation: string }[]>([]);

  // Fixed: Moving AI initialization inside handlers to ensure use of the most current API key
  const handleSmartFill = async () => {
    if (!kanji.trim()) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide the furigana (kana), romaji, and Chinese translation for the Japanese word: "${kanji}".`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              kana: { type: Type.STRING },
              romaji: { type: Type.STRING },
              translation: { type: Type.STRING }
            },
            required: ["kana", "romaji", "translation"]
          }
        }
      });

      // Fixed: Using .text property instead of method and handling potential undefined
      const text = response.text;
      const data = JSON.parse(text || '{}');
      if (data.kana) setKana(data.kana);
      if (data.romaji) setRomaji(data.romaji);
      if (data.translation) setTranslation(data.translation);
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Fixed: Moving AI initialization inside handlers
  const fetchSuggestions = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = kanji 
        ? `List 3 Japanese words related to "${kanji}" in category "${category}".` 
        : `List 3 common Japanese words for beginners in category "${category}".`;
        
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                kanji: { type: Type.STRING },
                kana: { type: Type.STRING },
                translation: { type: Type.STRING }
              },
              required: ["kanji", "kana", "translation"]
            }
          }
        }
      });

      // Fixed: Using .text property
      const text = response.text;
      const data = JSON.parse(text || '[]');
      setSuggestions(data);
    } catch (error) {
      console.error("AI Suggestions failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const applySuggestion = (sug: { kanji: string; kana: string; translation: string }) => {
    setKanji(sug.kanji);
    setKana(sug.kana);
    setTranslation(sug.translation);
    setRomaji(''); // Let smart fill or manual handle romaji
  };

  const handleSubmit = () => {
    if (!kanji || !kana || !translation) return;

    const newWord: Word = {
      id: Math.random().toString(36).substr(2, 9),
      kanji,
      kana,
      romaji: romaji || kanji,
      translation,
      category,
      progress: 0,
    };

    onAdd(newWord);
    onNavigate(View.LIBRARY);
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark h-full">
      <header className="flex items-center justify-between px-4 py-4 pt-12 sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
        <button 
          onClick={() => onNavigate(View.LIBRARY)}
          className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-primary"
        >
          <span className="material-symbols-outlined text-3xl">chevron_left</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-center flex-1 pr-10 text-slate-900 dark:text-white">添加新单词</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-40 no-scrollbar space-y-6 pt-6">
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-2 ml-1">日语单词</label>
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={kanji}
              onChange={(e) => setKanji(e.target.value)}
              className="w-full bg-white dark:bg-white/5 border-0 rounded-2xl p-6 text-3xl font-bold text-slate-900 dark:text-white placeholder:text-slate-200 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" 
              placeholder="e.g. 猫" 
            />
            <button 
              onClick={handleSmartFill}
              disabled={!kanji || isGenerating}
              className={`absolute right-4 p-2 rounded-xl transition-all ${
                isGenerating ? 'animate-pulse text-primary' : 'text-slate-300 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[28px]">{isGenerating ? 'sync' : 'auto_fix_high'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2 ml-1">输入单词并点击魔法棒自动补全</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2 ml-1">假名</label>
            <input 
              type="text" 
              value={kana}
              onChange={(e) => setKana(e.target.value)}
              className="w-full bg-white dark:bg-white/5 border-0 rounded-2xl p-4 text-lg font-medium text-slate-900 dark:text-white placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm h-14" 
              placeholder="ねこ" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2 ml-1">翻译</label>
            <input 
              type="text" 
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              className="w-full bg-white dark:bg-white/5 border-0 rounded-2xl p-4 text-lg font-medium text-slate-900 dark:text-white placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm h-14" 
              placeholder="猫" 
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
              灵感推荐
            </h2>
            <button 
              onClick={fetchSuggestions}
              disabled={isGenerating}
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              换一批
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {suggestions.length > 0 ? suggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => applySuggestion(sug)}
                className="shrink-0 bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm hover:border-primary/50 transition-all text-left w-32"
              >
                <div className="text-xl font-bold text-slate-900 dark:text-white mb-1 truncate">{sug.kanji}</div>
                <div className="text-[10px] text-primary font-medium truncate">{sug.kana}</div>
                <div className="text-xs text-slate-400 truncate mt-1">{sug.translation}</div>
              </button>
            )) : (
              <div className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-2">
                <span className="material-symbols-outlined">psychology</span>
                <button onClick={fetchSuggestions} className="text-xs font-bold text-primary">点击获取 AI 推荐</button>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">选择分类</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <label key={cat} className="cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  className="peer sr-only" 
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                />
                <div className="px-5 py-2.5 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-lg peer-checked:border-transparent">
                  {cat}
                </div>
              </label>
            ))}
          </div>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-12 z-20">
        <button 
          onClick={handleSubmit}
          disabled={!kanji || !kana || !translation}
          className="w-full bg-primary disabled:opacity-50 hover:bg-primary-dark text-white font-bold text-lg h-14 rounded-full shadow-xl shadow-primary/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">check</span>
          确认添加
        </button>
      </div>
    </div>
  );
};

export default AddWord;
