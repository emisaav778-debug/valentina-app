'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [montado, setMontado] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMontado(true), []);
  if (!montado) return null;

  return (
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 ml-4 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      title="Cambiar tema"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}