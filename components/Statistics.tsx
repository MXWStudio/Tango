
import React from 'react';
import { View } from '../types';
import { ACHIEVEMENTS } from '../constants';

interface StatisticsProps {
  onNavigate: (view: View) => void;
}

const Statistics: React.FC<StatisticsProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark">
      <header className="px-6 pt-12 pb-4 flex items-end justify-between sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <h1 className="text-[32px] font-bold tracking-tight text-slate-900 dark:text-white leading-none font-display">统计</h1>
        <button 
          onClick={() => onNavigate(View.PROFILE)}
          className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-slate-800 shadow-sm transition-transform active:scale-95"
        >
          <img src="https://picsum.photos/seed/user/100/100" alt="Profile" className="w-full h-full object-cover" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-6 px-6 space-y-8">
        {/* Overview Grid */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 ml-1">学习概览</h2>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="总计练习" value="12.5" unit="小时" />
            <StatCard label="平均准确率" value="94.2" unit="%" color="text-primary" />
            <StatCard label="平均速度" value="45" unit="WPM" />
          </div>
        </section>

        {/* WPM Chart Block */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">每日打字量</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">过去 7 天</p>
            </div>
            <span className="text-3xl font-normal text-primary">2,140</span>
          </div>
          <div className="flex items-end justify-between gap-3 h-36">
            {[40, 55, 85, 30, 60, 45, 75].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-lg h-full relative overflow-hidden flex items-end">
                  <div className={`w-full ${i === 2 ? 'bg-primary' : 'bg-primary/30'} rounded-lg transition-all duration-500`} style={{ height: `${h}%` }}></div>
                </div>
                <span className={`text-[10px] font-medium font-sans ${i === 2 ? 'text-primary' : 'text-slate-500'}`}>
                  {['一', '二', '三', '四', '五', '六', '日'][i]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Speed Trend */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-card overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">速度趋势</h3>
            <div className="flex items-center gap-1 text-green-500 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-md">
              <span className="material-symbols-outlined text-base">trending_up</span>
              <span>+12%</span>
            </div>
          </div>
          <div className="relative h-36 w-full pt-4">
             {/* Mock Chart Lines */}
             <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                <path d="M0,45 C20,40 40,48 60,25 S80,10 100,5" fill="none" stroke="#1978e5" strokeWidth="2" />
                <path d="M0,45 C20,40 40,48 60,25 S80,10 100,5 V50 H0 Z" fill="url(#grad)" opacity="0.1" />
                <defs>
                  <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#1978e5" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
             </svg>
          </div>
        </section>

        {/* Weak Areas */}
        <section>
          <div className="flex items-center justify-between mb-4 ml-1">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">薄弱环节</h2>
            <button className="text-primary text-sm font-medium" onClick={() => onNavigate(View.PRACTICE)}>开始专项练习</button>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-card overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
             <WeakItem label="ぬ" sub="Nu" type="平假名" progress={45} color="text-red-500" bgColor="bg-red-50 dark:bg-red-900/20" />
             <WeakItem label="む" sub="Mu" type="平假名" progress={52} color="text-red-500" bgColor="bg-red-50 dark:bg-red-900/20" />
             <WeakItem label="旅行" sub="Ryokou" type="词汇" progress={68} color="text-orange-500" bgColor="bg-orange-50 dark:bg-orange-900/20" />
          </div>
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, unit, color = "text-slate-900 dark:text-white" }) => (
  <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-card flex flex-col items-center justify-center text-center">
    <span className="text-[10px] font-medium text-slate-500 uppercase">{label}</span>
    <span className={`text-2xl font-bold leading-none mt-1 ${color}`}>{value}</span>
    <span className="text-[10px] text-slate-400 mt-1">{unit}</span>
  </div>
);

const WeakItem = ({ label, sub, type, progress, color, bgColor }) => (
  <div className="flex items-center justify-between p-5">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${bgColor} ${color}`}>{label}</div>
      <div>
        <div className="text-base font-medium text-slate-900 dark:text-white mb-0.5">{sub}</div>
        <div className="text-xs text-slate-500">{type}</div>
      </div>
    </div>
    <div className="flex flex-col items-end gap-1.5">
      <span className={`text-xs font-semibold ${color}`}>{progress}%</span>
      <div className="w-20 h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full ${color.replace('text', 'bg')} rounded-full`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  </div>
);

export default Statistics;
