import { Trophy, Zap, Target } from 'lucide-react';
import SnakeGame from '../components/SnakeGame';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Snake Game
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            How long can you survive? Master the art of precision, avoid disaster, and become the ultimate snake champion!
          </p>
        </div>

        {/* Game Container */}
        <div className="mb-12">
          <SnakeGame />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Fast-Paced Action</h3>
            <p className="text-gray-400">
              Smooth controls and responsive gameplay for the ultimate snake experience
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Beat Your Score</h3>
            <p className="text-gray-400">
              Track your high score and challenge yourself to go even longer
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Simple Rules</h3>
            <p className="text-gray-400">
              Easy to learn, hard to master. Perfect for quick gaming sessions
            </p>
          </div>
        </div>

        {/* How to Play */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">How to Play</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Game Rules</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Use arrow keys to control the snake's direction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Eat the red food to grow longer and score points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Don't hit the walls or your own body</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>The game speeds up as you grow longer</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Controls</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 px-4 py-2 rounded-lg font-mono">↑ ↓ ← →</div>
                  <span>Move snake</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 px-4 py-2 rounded-lg font-mono">SPACE</div>
                  <span>Pause/Resume</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 px-4 py-2 rounded-lg font-mono">R</div>
                  <span>Restart game</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}