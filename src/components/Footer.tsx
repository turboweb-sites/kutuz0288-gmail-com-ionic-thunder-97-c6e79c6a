import { Github, Gamepad2 } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  return (
    <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold">Snake Game</h3>
            </div>
            <p className="text-gray-400">
              Classic snake game built with React and TypeScript. 
              Eat food, grow longer, and beat your high score!
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-purple-400">Game Controls</h4>
            <div className="space-y-2 text-gray-400">
              <p>↑ ↓ ← → Arrow Keys to move</p>
              <p>Space to pause/resume</p>
              <p>R to restart game</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-purple-400">About</h4>
            <p className="text-gray-400 mb-4">
              A modern take on the classic Snake game with smooth animations and responsive controls.
            </p>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Snake Game. Built with React & TypeScript</p>
        </div>
      </div>
    </footer>
  );
}