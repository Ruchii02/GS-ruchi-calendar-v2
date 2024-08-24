"use client";
import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; // Import icons

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!isDarkMode);
  };

  return (
    <div className="flex justify-end p-4">
      <button 
        onClick={toggleDarkMode} 
        className="p-2 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded"
      >
        {isDarkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-500" /> 
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-800" /> 
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
