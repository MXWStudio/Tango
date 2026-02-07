
import React from 'react';
import { View } from '../types';
import { t } from '../src/locales/i18n';

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const tabs = [
    { view: View.HOME, label: t('nav.home'), icon: 'home' },
    { view: View.STATS, label: t('nav.stats'), icon: 'bar_chart' },
    { view: View.LIBRARY, label: t('nav.library'), icon: 'menu_book' },
    { view: View.PROFILE, label: t('nav.profile'), icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 h-[84px] z-50 flex items-start pt-2 px-4">
      <div className="w-full grid grid-cols-4 place-items-center">
        {tabs.map((tab) => {
          const isActive = currentView === tab.view;
          return (
            <button
              key={tab.view}
              onClick={() => onNavigate(tab.view)}
              className={`flex flex-col items-center gap-[4px] w-full pt-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'
                }`}
            >
              <span className={`material-symbols-outlined text-[28px] ${isActive ? 'material-symbols-fill' : ''}`}>
                {tab.icon}
              </span>
              <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
