
import { Word, Achievement } from './types';

export const INITIAL_WORDS: Word[] = [
  { id: '1', kanji: '日本語', kana: 'にほんご', romaji: 'nihongo', translation: '日语', category: 'JLPT N5', progress: 45 },
  { id: '2', kanji: '勉強', kana: 'べんきょう', romaji: 'benkyou', translation: '学习', category: 'JLPT N5', progress: 80 },
  { id: '3', kanji: '食べ物', kana: 'たべもの', romaji: 'tabemono', translation: '食物', category: 'JLPT N5', progress: 45 },
  { id: '4', kanji: '旅行', kana: 'りょこう', romaji: 'ryokou', translation: '旅行', category: 'JLPT N5', progress: 20 },
  { id: '5', kanji: '明日', kana: 'あした', romaji: 'ashita', translation: '明天', category: 'JLPT N5', progress: 10 },
  { id: '6', kanji: '海', kana: 'うみ', romaji: 'umi', translation: '大海', category: 'JLPT N5', progress: 0 },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: '极速达人', icon: 'emoji_events', color: 'bg-amber-100 text-amber-600', unlocked: true },
  { id: '2', title: '汉字大师', icon: 'translate', color: 'bg-indigo-100 text-indigo-600', unlocked: true },
  { id: '3', title: '早起鸟儿', icon: 'wb_twilight', color: 'bg-sky-100 text-sky-600', unlocked: true },
  { id: '4', title: '夜猫子', icon: 'lock', color: 'bg-slate-100 text-slate-400', unlocked: false },
];

export const CATEGORIES = ['N5', 'N4', '基础词汇', '动词', '旅行常用语'];
