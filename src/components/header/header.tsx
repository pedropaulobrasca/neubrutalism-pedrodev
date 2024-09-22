'use client';

import { Moon, Sun, Download, Languages } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
  exportToPDF: () => void;
  buttonStyle: string;
}

export default function Header({
  isDarkMode,
  toggleDarkMode,
  toggleLanguage,
  exportToPDF,
  buttonStyle,
}: HeaderProps) {
  return (
    <div className="flex justify-end space-x-4 mb-4">
      <button onClick={toggleDarkMode} className={buttonStyle}>
        {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>
      <button onClick={toggleLanguage} className={buttonStyle}>
        <Languages className="h-6 w-6" />
      </button>
      <button onClick={exportToPDF} className={buttonStyle}>
        <Download className="h-6 w-6" />
      </button>
    </div>
  );
}
