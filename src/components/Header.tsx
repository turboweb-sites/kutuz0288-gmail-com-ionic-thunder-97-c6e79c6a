import { useState, useEffect } from 'react';
import { Menu, X, Gamepad2, Clock } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'home', label: 'Play' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-purple-500/20 shadow-lg shadow-purple-500/10">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-300 hover:to-pink-500 transition-all"
          >
            <Gamepad2 className="text-red-400" size={32} />
            <span className="inline-block animate-pulse">
              Snake Game
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 text-purple-400">
              <Clock size={20} />
              <span className="font-medium">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg transition-all">
              Начать игру
            </button>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`font-medium transition-all ${
                  currentPage === item.id 
                    ? 'text-red-400 scale-110' 
                    : 'text-gray-300 hover:text-red-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden text-purple-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 bg-gray-800/50 backdrop-blur-lg rounded-lg p-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setIsOpen(false); }}
                className={`block w-full text-left py-3 px-4 rounded-lg transition-all ${
                  currentPage === item.id 
                    ? 'bg-purple-500/20 text-purple-400' 
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}