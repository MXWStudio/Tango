
import React, { useState, useEffect } from 'react';
import { View, Word } from './types';
import Dashboard from './components/Dashboard';
import Library from './components/Library';
import Practice from './components/Practice';
import Statistics from './components/Statistics';
import Profile from './components/Profile';
import AddWord from './components/AddWord';
import EditProfile from './components/EditProfile';
import BottomNav from './components/BottomNav';
import { dataService } from './src/services/dataService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [prevView, setPrevView] = useState<View>(View.HOME);
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigateTo = (view: View) => {
    setPrevView(currentView);
    setCurrentView(view);
  };

  // 加载词汇数据
  useEffect(() => {
    const fetchWords = async () => {
      setIsLoading(true);
      const data = await dataService.getWords();
      setWords(data);
      setIsLoading(false);
    };
    fetchWords();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    switch (currentView) {
      case View.HOME:
        return <Dashboard onNavigate={navigateTo} />;
      case View.LIBRARY:
        return <Library onNavigate={navigateTo} words={words} />;
      case View.PRACTICE:
        return <Practice onNavigate={navigateTo} words={words} />;
      case View.STATS:
        return <Statistics onNavigate={navigateTo} />;
      case View.PROFILE:
        return <Profile onNavigate={navigateTo} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case View.ADD_WORD:
        return <AddWord onNavigate={navigateTo} onAdd={async (word) => {
          const newWord = await dataService.addWord(word);
          if (newWord) setWords([newWord, ...words]);
        }} />;
      case View.EDIT_PROFILE:
        return <EditProfile onNavigate={navigateTo} />;
      default:
        return <Dashboard onNavigate={navigateTo} />;
    }
  };

  const showBottomNav = ![View.PRACTICE, View.ADD_WORD, View.EDIT_PROFILE].includes(currentView);

  return (
    <div className="flex justify-center bg-gray-100 dark:bg-zinc-950 min-h-screen">
      <div className="relative w-full max-w-md bg-background-light dark:bg-background-dark min-h-screen flex flex-col shadow-2xl overflow-hidden">
        {renderView()}
        {showBottomNav && (
          <BottomNav currentView={currentView} onNavigate={navigateTo} />
        )}
      </div>
    </div>
  );
};

export default App;
