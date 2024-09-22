'use client';

import { Moon, Sun, Download, Languages, Linkedin, Github } from 'lucide-react';

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
    <div className="flex justify-between space-x-4 mb-4">
      <div className='flex gap-4'>
        <a href='https://www.linkedin.com/in/pedro-paulo-brasca-trevisanuto-86136114a/' className={buttonStyle} target='_blank'>
          <Linkedin className="h-6 w-6" />
        </a>
        <a href='https://github.com/pedropaulobrasca' className={buttonStyle} target='_blank'>
          <Github className="h-6 w-6" />
        </a>
      </div>
      <div className='flex gap-4'>
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
    </div>
  );
}
