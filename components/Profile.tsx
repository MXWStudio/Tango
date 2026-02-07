
import React, { useState } from 'react';
import { View } from '../types';
import { ACHIEVEMENTS } from '../constants';

interface ProfileProps {
  onNavigate: (view: View) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate, isDarkMode, setIsDarkMode }) => {
  // Add local state for preferences
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background-light/90 dark:bg-background-dark/90 px-4 pt-12 pb-3 transition-colors border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-end justify-between">
          <button onClick={() => onNavigate(View.HOME)} className="flex items-center text-primary -ml-1 p-1 rounded-lg">
            <span className="material-symbols-outlined text-[28px]">chevron_left</span>
            <span className="text-lg font-medium -ml-1">返回</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-4 pb-32 pt-4 space-y-8">
        {/* User Card */}
        <section>
          <div 
            onClick={() => onNavigate(View.EDIT_PROFILE)}
            className="bg-white dark:bg-surface-dark rounded-xl shadow-sm overflow-hidden p-4 flex items-center gap-4 active:scale-[0.99] transition-transform cursor-pointer"
          >
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border border-slate-100 dark:border-slate-600" 
                style={{ backgroundImage: `url('https://picsum.photos/seed/user1/100/100')` }} 
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">Kenji Tanaka</h2>
              <p className="text-slate-500 text-sm truncate">tanaka@japanese-app.com</p>
              <p className="text-primary text-sm font-medium mt-0.5">编辑资料</p>
            </div>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="px-1">
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white dark:bg-surface-dark p-5 rounded-[2rem] flex flex-col items-start gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">12h 30m</p>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">总计用时</p>
                </div>
             </div>
             <div className="bg-white dark:bg-surface-dark p-5 rounded-[2rem] flex flex-col items-start gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">450</p>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">掌握单词</p>
                </div>
             </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-4">偏好设置</h3>
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
             <ToggleItem 
                icon="volume_up" 
                label="音效" 
                checked={soundEnabled} 
                onChange={setSoundEnabled}
                color="bg-blue-100 text-primary" 
             />
             <ToggleItem 
                icon="vibration" 
                label="触感反馈" 
                checked={hapticEnabled} 
                onChange={setHapticEnabled}
                color="bg-blue-100 text-primary" 
             />
             <ToggleItem 
                icon="dark_mode" 
                label="深色模式" 
                checked={isDarkMode} 
                onChange={setIsDarkMode} 
                color="bg-slate-800 text-white" 
             />
          </div>
        </section>

        {/* Support */}
        <section className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-4">支持</h3>
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            <MenuItem icon="help" label="帮助与支持" color="bg-blue-100 text-primary" />
            <MenuItem icon="policy" label="隐私政策" color="bg-slate-100 text-slate-600" />
          </div>
        </section>

        <div className="pt-4 pb-8 text-center space-y-1">
          <p className="text-xs text-slate-400 font-medium">Tango v1.0.2</p>
          <p className="text-[10px] text-slate-300">Designed with ❤️ in Kyoto</p>
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm overflow-hidden mb-6">
          <button className="w-full p-4 text-center text-primary font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            退出登录
          </button>
        </div>
      </main>
    </div>
  );
};

interface ToggleItemProps {
  icon: string;
  label: string;
  checked: boolean;
  onChange?: (val: boolean) => void;
  color: string;
}

const ToggleItem: React.FC<ToggleItemProps> = ({ icon, label, checked, onChange = (_v) => {}, color }) => (
  <div className="flex items-center justify-between p-3 pl-4 pr-4">
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${color}`}>
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <span className="text-base font-medium text-slate-900 dark:text-white">{label}</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
      />
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
    </label>
  </div>
);

interface MenuItemProps {
  icon: string;
  label: string;
  color: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, color }) => (
  <button className="w-full flex items-center justify-between p-3 pl-4 pr-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${color}`}>
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <span className="text-base font-medium text-slate-900 dark:text-white">{label}</span>
    </div>
    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
  </button>
);

export default Profile;
