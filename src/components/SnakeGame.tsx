import { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import MarqueeText from './MarqueeText';

const eatSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPDhkjwJE1y06+yrWBQLRp3e8sFuIwUug8/y2Ik2CBhju+rqpVITC0yl4fG5ZRwFN43V8M99KQUnfszw4ZI8CRNctOvtq1gVC0ad3vLBbiMFL4PP8tmJNggYY7vq6qVSEwtMpeHxuWUcBTeN1fDPfSkFJ37M8OGSPAkTXLTr7atYFQtGnd7ywW4jBS+Dz/LZiTYIGGO76uqlUhMLTKXh8bllHAU3jdXwz30pBSd+zPDhkjwJE1y06+2rWBULRp3e8sFuIwUvg8/y2Yk2CBhju+rqpVITC0yl4fG5ZRwFN43V8M99KQUnfszw4ZI8CRNctOvtq1gVC0ad3vLBbiMFL4PP8tmJNggYY7vq6qVSEwtMpeHxuWUcBTeN1fDPfSkFJ37M8OGSPAkTXLTr7atYFQtGnd7ywW4jBS+Dz/LZiTYIGGO76uqlUhMLTKXh8bllHAU3jdXwz30pBSd+zPDhkjwJE1y06+2rWBULRp3e8sFuIwUvg8/y2Yk2CBhju+rqpVITC0yl4fG5ZRwFN43V8M99KQUnfszw4ZI8CRNctOvtq1gVC0ad3vLBbiMFL4PP8tmJNggYY7vq6qVSEwtMpeHxuWUcBTeN1fDPfSkFJ37M8OGSPAkTXLTr7atYFQtGnd7ywW4jBS+Dz/LZiTYIGGO76uqlUhMLTKXh8bllHAU3jdXwz30pBSd+zPDhkjwJE1y06+2rWBULRp3e8sFuIwUvg8/y2Yk2CBhju+rqpVITC0yl4fG5ZRwFN43V8M99KQUnfszw4ZI8CRNctOvtq1gVC0ad3vLBbiMFL4PP8tmJNggYY7vq6qVSEwtMpeHxuWUcBTeN1fDPfSkFJ37M8OGSPAkTXLTr7atYFQtGnd7ywW4jBS+Dz/LZiTYIGGO76uqlUhMLTKXh8bllHAU3jdXwz30pBSd+zPDhkjwJE1y06+2rWBULRp3e8sFuIwUvg8/y2Yk2CBhju+rqpVITC0yl4fG5ZRwFN43V8M99KQUnfszw4ZI8CRNctOvtq1gVC0ad3vLBbiMFL4PP8tmJNggYY7vq6qVSEwtMpeHxuWUcBTeN1fDPfSkFJ37M8OGSPAkTXLTr7atYFQ==');
const gameOverSound = new Audio('data:audio/wav;base64,UklGRhIFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0Ya4EAACAf39+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAAP/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAA//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAD//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAAP/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAA');

type Position = {
  x: number;
  y: number;
};

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREASE = 5;

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [nextDirection, setNextDirection] = useState<Direction>('RIGHT');
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameLoopRef = useRef<number>();

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setIsPlaying(false);
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
  }, []);

  const checkCollision = useCallback((head: Position): boolean => {
    // Self collision only
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver) return;

    setDirection(nextDirection);

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      switch (nextDirection) {
        case 'UP':
          head.y = head.y <= 0 ? GRID_SIZE - 1 : head.y - 1;
          break;
        case 'DOWN':
          head.y = head.y >= GRID_SIZE - 1 ? 0 : head.y + 1;
          break;
        case 'LEFT':
          head.x = head.x <= 0 ? GRID_SIZE - 1 : head.x - 1;
          break;
        case 'RIGHT':
          head.x = head.x >= GRID_SIZE - 1 ? 0 : head.x + 1;
          break;
      }

      if (checkCollision(head)) {
        gameOverSound.play().catch(() => {});
        setGameOver(true);
        setIsPlaying(false);
        if (score > highScore) {
          setHighScore(score);
        }
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        eatSound.play().catch(() => {});
        setScore(prev => prev + 10);
        setFood(generateFood());
        setSpeed(prev => Math.max(50, prev - SPEED_INCREASE));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [isPlaying, gameOver, nextDirection, food, checkCollision, score, highScore, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setNextDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setNextDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setNextDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setNextDirection('RIGHT');
          break;
        case ' ':
          setIsPlaying(prev => !prev);
          break;
        case 'r':
        case 'R':
          resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, resetGame]);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, speed);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver, speed, moveSnake]);

  const handleStartPause = () => {
    if (gameOver) {
      resetGame();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Animated Marquee Text */}
      <div className="w-full max-w-4xl mb-4">
        <MarqueeText 
          text="🐍 Используйте стрелки для управления • Пробел для паузы • R для перезапуска • Змейка проходит сквозь стены • Не врезайтесь в себя! 🎮"
          speed={30}
          className="text-white/80 text-lg font-medium py-3 bg-gradient-to-r from-red-900/30 via-black/50 to-red-900/30 rounded-xl backdrop-blur-sm border border-white/10"
        />
      </div>

      {/* Score Board */}
      <div className="flex gap-4 flex-wrap justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/20">
          <div className="text-sm text-gray-400 mb-1">Счёт</div>
          <div className="text-3xl font-bold text-white">{score}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/20">
          <div className="text-sm text-gray-400 mb-1">Рекорд</div>
          <div className="text-3xl font-bold text-blue-400">{highScore}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/20">
          <div className="text-sm text-gray-400 mb-1">Длина</div>
          <div className="text-3xl font-bold text-white">{snake.length}</div>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative bg-black/40 backdrop-blur-lg rounded-2xl p-4 border-2 border-white/20">
        <div
          className="relative bg-gradient-to-br from-gray-900 to-gray-800"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          }}
        >
          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`${
                index === 0
                  ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                  : 'bg-gradient-to-br from-blue-500 to-blue-700'
              } rounded-sm transition-all duration-100`}
              style={{
                gridColumn: segment.x + 1,
                gridRow: segment.y + 1,
                boxShadow: index === 0 ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none',
              }}
            />
          ))}

          {/* Food */}
          <div
            className="bg-gradient-to-br from-red-500 to-pink-500 rounded-full animate-pulse"
            style={{
              gridColumn: food.x + 1,
              gridRow: food.y + 1,
              boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)',
            }}
          />

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Игра окончена!</h2>
                <p className="text-xl text-gray-300 mb-2">Финальный счёт: {score}</p>
                {score === highScore && score > 0 && (
                  <p className="text-lg text-blue-400 mb-6">🎉 Новый рекорд!</p>
                )}
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
                >
                  Играть снова
                </button>
              </div>
            </div>
          )}

          {/* Start Screen */}
          {!isPlaying && !gameOver && score === 0 && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Готовы играть?</h2>
                <p className="text-gray-300 mb-6">Нажмите Играть или Пробел для старта</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={handleStartPause}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/50"
        >
          {gameOver ? (
            <>
              <RotateCcw className="w-5 h-5" />
              Играть снова
            </>
          ) : isPlaying ? (
            <>
              <Pause className="w-5 h-5" />
              Пауза
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              {score === 0 ? 'Начать игру' : 'Продолжить'}
            </>
          )}
        </button>

        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
        >
          <RotateCcw className="w-5 h-5" />
          Перезапустить
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden grid grid-cols-3 gap-2 w-full max-w-xs">
        <div></div>
        <button
          onClick={() => direction !== 'DOWN' && setNextDirection('UP')}
          className="bg-white/10 backdrop-blur-lg p-4 rounded-lg active:bg-white/20 transition-all border border-white/20"
        >
          <div className="text-2xl text-white">↑</div>
        </button>
        <div></div>
        
        <button
          onClick={() => direction !== 'RIGHT' && setNextDirection('LEFT')}
          className="bg-white/10 backdrop-blur-lg p-4 rounded-lg active:bg-white/20 transition-all border border-white/20"
        >
          <div className="text-2xl text-white">←</div>
        </button>
        <button
          onClick={() => direction !== 'UP' && setNextDirection('DOWN')}
          className="bg-white/10 backdrop-blur-lg p-4 rounded-lg active:bg-white/20 transition-all border border-white/20"
        >
          <div className="text-2xl text-white">↓</div>
        </button>
        <button
          onClick={() => direction !== 'LEFT' && setNextDirection('RIGHT')}
          className="bg-white/10 backdrop-blur-lg p-4 rounded-lg active:bg-white/20 transition-all border border-white/20"
        >
          <div className="text-2xl text-white">→</div>
        </button>
      </div>
    </div>
  );
}