
import React, { useState } from 'react';
import { View } from '../types';

interface EditProfileProps {
  onNavigate: (view: View) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ onNavigate }) => {
  const [name, setName] = useState('Kenji Tanaka');
  const [email, setEmail] = useState('tanaka@japanese-app.com');

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background-light/90 dark:bg-background-dark/90 px-4 pt-12 pb-3 transition-colors border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-end justify-between">
          <button onClick={() => onNavigate(View.PROFILE)} className="flex items-center text-primary -ml-1 p-1 rounded-lg">
            <span className="material-symbols-outlined text-[28px]">chevron_left</span>
            <span className="text-lg font-medium -ml-1">返回</span>
          </button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white pb-1 pr-1">个人资料</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 py-8 space-y-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden transition-transform active:scale-95">
              <img src="https://picsum.photos/seed/user1/200/200" alt="Large Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-md">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </button>
          </div>
          <p className="mt-4 text-sm text-slate-400 font-medium">点击更换头像</p>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">显示名称</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">person</span>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white dark:bg-surface-dark border-0 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">电子邮箱</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">mail</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white dark:bg-surface-dark border-0 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">个人简介</label>
            <textarea 
              rows={3}
              placeholder="介绍一下你自己..."
              className="w-full bg-white dark:bg-surface-dark border-0 rounded-2xl p-4 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
            ></textarea>
          </div>
        </div>

        {/* Security / More */}
        <div className="pt-4">
           <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-sm text-slate-900 dark:text-white font-medium">
             <div className="flex items-center gap-3">
               <span className="material-symbols-outlined text-slate-400">lock</span>
               <span>修改密码</span>
             </div>
             <span className="material-symbols-outlined text-slate-300">chevron_right</span>
           </button>
        </div>
      </main>

      <div className="p-6 bg-background-light dark:bg-background-dark">
        <button 
          onClick={() => onNavigate(View.PROFILE)}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg h-14 rounded-full shadow-xl shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">save</span>
          保存更改
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
