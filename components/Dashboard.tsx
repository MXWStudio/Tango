
import React from 'react';
import { View } from '../types';
import { t } from '../src/locales/i18n';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  // 模拟数据
  const streakDays = 5;
  const masteredCount = 32;
  const targetCount = 50;
  const progressPercent = Math.round((masteredCount / targetCount) * 100);

  return (
    <div className="flex-1 flex flex-col pb-24">
      <header className="px-6 pt-12 pb-4 flex items-end justify-between sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <h1 className="text-[32px] font-bold tracking-tight text-slate-900 dark:text-white leading-none font-display">
          {t('nav.home')}
        </h1>
        <button
          onClick={() => onNavigate(View.PROFILE)}
          className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-slate-800 shadow-sm transition-transform active:scale-95"
        >
          <img src="https://picsum.photos/seed/user/100/100" alt="Profile" className="w-full h-full object-cover" />
        </button>
      </header>

      <main className="flex-1 px-6 space-y-8 overflow-y-auto no-scrollbar pt-4">
        {/* Goal Circle */}
        <section className="flex flex-col items-center justify-center py-4">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <circle className="text-slate-200 dark:text-slate-800" cx="80" cy="80" fill="none" r="70" stroke="currentColor" strokeWidth="12" />
              <circle className="text-primary animate-ring" cx="80" cy="80" fill="none" r="70" stroke="currentColor" strokeLinecap="round" strokeWidth="12" style={{ strokeDasharray: '440', strokeDashoffset: (440 - (440 * progressPercent) / 100) }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-slate-400 text-sm font-medium mb-1">
                {t('dashboard.mastered')}
              </span>
              <h2 className="text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
                {progressPercent}%
              </h2>
              <span className="text-primary font-medium mt-1">
                {masteredCount}/{targetCount} 单词
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate(View.PRACTICE)}
            className="mt-8 w-full max-w-[280px] bg-primary hover:bg-primary-dark active:scale-95 transition-all h-14 rounded-full flex items-center justify-center gap-3 text-white shadow-soft"
          >
            <span className="material-symbols-outlined text-[28px]">play_arrow</span>
            <span className="text-lg font-bold tracking-wide">
              {t('dashboard.start_practice')}
            </span>
          </button>
        </section>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('dashboard.recent_activity')}
            </h3>
            <button className="text-primary text-sm font-medium" onClick={() => onNavigate(View.LIBRARY)}>
              {t('library.title')}
            </button>
          </div>
          <div className="space-y-4">
            <CategoryCard title="平假名基础" subtitle="46 个字符 • 100% 完成" progress={100} icon="あ" color="bg-primary/10 text-primary" />
            <CategoryCard title="片假名基础" subtitle="46 个字符 • 45% 完成" progress={45} icon="ア" color="bg-purple-100 text-purple-600" />
            <CategoryCard title="JLPT N5 核心词汇" subtitle="800 个单词 • 12% 完成" progress={12} icon="school" isMaterial />
          </div>
        </section>

        {/* Activity */}
        <section className="pb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            {t('dashboard.streak', { days: streakDays })}
          </h3>
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-card">
            <div className="flex items-end justify-between gap-2 h-24">
              {[40, 65, 80, 0, 0, 0, 0].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-md h-full relative overflow-hidden flex items-end">
                    <div
                      className={`w-full ${i === 2 ? 'bg-primary' : 'bg-primary/30'} rounded-t-md transition-all`}
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className={`text-[10px] font-medium ${i === 2 ? 'text-primary' : 'text-slate-400'}`}>
                    {['一', '二', '三', '四', '五', '六', '日'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};


interface CategoryCardProps {
  title: string;
  subtitle: string;
  progress: number;
  icon: string;
  color?: string;
  isMaterial?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, subtitle, progress, icon, color = "bg-orange-100 text-orange-600", isMaterial = false }) => (
  <div className="group relative flex items-center p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-card hover:shadow-lg transition-all cursor-pointer">
    <div className={`h-14 w-14 rounded-xl flex items-center justify-center mr-4 shrink-0 ${color}`}>
      {isMaterial ? <span className="material-symbols-outlined text-2xl">{icon}</span> : <span className="text-2xl font-bold">{icon}</span>}
    </div>
    <div className="flex-1">
      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</h4>
      <p className="text-slate-400 text-sm">{subtitle}</p>
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
        <div className={`h-full ${progress === 100 ? 'bg-green-500' : 'bg-primary'} rounded-full transition-all`} style={{ width: `${progress}%` }} />
      </div>
    </div>
    <span className="material-symbols-outlined text-slate-300 ml-2">chevron_right</span>
  </div>
);

export default Dashboard;
