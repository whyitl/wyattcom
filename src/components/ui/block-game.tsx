'use client';

import { useState, useEffect, useCallback } from 'react';

type Block = {
  x: number;
  y: number;
  color: string;
};

type Tetromino = {
  shape: number[][];
  color: string;
};

const TETROMINOES: Tetromino[] = [
  { shape: [[1, 1, 1, 1]], color: '#00f0f0' }, // I
  { shape: [[1, 1], [1, 1]], color: '#f0f000' }, // O
  { shape: [[0, 1, 0], [1, 1, 1]], color: '#a000f0' }, // T
  { shape: [[1, 1, 0], [0, 1, 1]], color: '#00f000' }, // S
  { shape: [[0, 1, 1], [1, 1, 0]], color: '#f00000' }, // Z
  { shape: [[1, 0, 0], [1, 1, 1]], color: '#0000f0' }, // J
  { shape: [[0, 0, 1], [1, 1, 1]], color: '#f0a000' }, // L
];

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 15;

export function BlockGame() {
  const [board, setBoard] = useState<(string | null)[][]>(
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null))
  );
  const [currentPiece, setCurrentPiece] = useState<Tetromino | null>(null);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const getRandomTetromino = (): Tetromino => {
    return TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];
  };

  const canMove = useCallback((piece: Tetromino, x: number, y: number, newBoard: (string | null)[][]): boolean => {
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col]) {
          const newX = x + col;
          const newY = y + row;
          
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return false;
          }
          
          if (newY >= 0 && newBoard[newY][newX]) {
            return false;
          }
        }
      }
    }
    return true;
  }, []);

  const mergePiece = useCallback((piece: Tetromino, x: number, y: number, boardState: (string | null)[][]): (string | null)[][] => {
    const newBoard = boardState.map(row => [...row]);
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col] && y + row >= 0) {
          newBoard[y + row][x + col] = piece.color;
        }
      }
    }
    return newBoard;
  }, []);

  const clearLines = useCallback((boardState: (string | null)[][]): { newBoard: (string | null)[][]; linesCleared: number } => {
    const newBoard = boardState.filter(row => row.some(cell => cell === null));
    const linesCleared = BOARD_HEIGHT - newBoard.length;
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(null));
    }
    
    return { newBoard, linesCleared };
  }, []);

  const spawnNewPiece = useCallback(() => {
    const newPiece = getRandomTetromino();
    const startX = Math.floor(BOARD_WIDTH / 2) - Math.floor(newPiece.shape[0].length / 2);
    const startY = 0;
    
    if (!canMove(newPiece, startX, startY, board)) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }
    
    setCurrentPiece(newPiece);
    setCurrentPosition({ x: startX, y: startY });
  }, [board, canMove]);

  const moveDown = useCallback(() => {
    if (!currentPiece || gameOver) return;
    
    const newY = currentPosition.y + 1;
    
    if (canMove(currentPiece, currentPosition.x, newY, board)) {
      setCurrentPosition({ ...currentPosition, y: newY });
    } else {
      const newBoard = mergePiece(currentPiece, currentPosition.x, currentPosition.y, board);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      setBoard(clearedBoard);
      setScore(prev => prev + linesCleared * 100);
      
      setTimeout(() => spawnNewPiece(), 100);
    }
  }, [currentPiece, currentPosition, board, gameOver, canMove, mergePiece, clearLines, spawnNewPiece]);

  const moveHorizontal = useCallback((direction: number) => {
    if (!currentPiece || gameOver) return;
    
    const newX = currentPosition.x + direction;
    
    if (canMove(currentPiece, newX, currentPosition.y, board)) {
      setCurrentPosition({ ...currentPosition, x: newX });
    }
  }, [currentPiece, currentPosition, board, gameOver, canMove]);

  const rotate = useCallback(() => {
    if (!currentPiece || gameOver) return;
    
    const rotated: Tetromino = {
      shape: currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map(row => row[i]).reverse()
      ),
      color: currentPiece.color,
    };
    
    if (canMove(rotated, currentPosition.x, currentPosition.y, board)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, currentPosition, board, gameOver, canMove]);

  const startGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)));
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    const newPiece = getRandomTetromino();
    setCurrentPiece(newPiece);
    setCurrentPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveHorizontal(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveHorizontal(1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
        case ' ':
          e.preventDefault();
          rotate();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, gameOver, moveHorizontal, moveDown, rotate]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    const interval = setInterval(() => {
      moveDown();
    }, 500);
    
    return () => clearInterval(interval);
  }, [isPlaying, gameOver, moveDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isPlaying || gameOver) return;
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isPlaying || gameOver || !touchStart) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const minSwipeDistance = 30;

    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          moveHorizontal(1); // Swipe right
        } else {
          moveHorizontal(-1); // Swipe left
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          moveDown(); // Swipe down
        } else {
          rotate(); // Swipe up
        }
      }
    }

    setTouchStart(null);
  };

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    if (currentPiece) {
      for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
          if (currentPiece.shape[row][col] && currentPosition.y + row >= 0) {
            displayBoard[currentPosition.y + row][currentPosition.x + col] = currentPiece.color;
          }
        }
      }
    }
    
    return displayBoard;
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg shadow-2xl">
      <h2 className="text-lg font-bold text-white mb-2">Block Game</h2>
      
      <div className="mb-2 text-white text-sm">
        Score: <span className="font-bold text-yellow-400">{score}</span>
      </div>
      
      <div 
        className="border-4 border-slate-700 bg-slate-950 shadow-inner touch-none"
        style={{ 
          width: BOARD_WIDTH * CELL_SIZE, 
          height: BOARD_HEIGHT * CELL_SIZE 
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${CELL_SIZE}px)` }}>
          {renderBoard().map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="border border-slate-800"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: cell || '#0f172a',
                  boxShadow: cell ? 'inset 0 0 0 2px rgba(255,255,255,0.1)' : 'none',
                }}
              />
            ))
          )}
        </div>
      </div>
      
      {/* Mobile Controls */}
      {isPlaying && !gameOver && (
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => moveHorizontal(-1)}
              className="w-12 h-12 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white text-lg font-bold rounded shadow-lg transition-colors flex items-center justify-center"
              aria-label="Move left"
            >
              ←
            </button>
            <button
              onClick={() => rotate()}
              className="w-12 h-12 bg-purple-700 hover:bg-purple-600 active:bg-purple-500 text-white text-lg font-bold rounded shadow-lg transition-colors flex items-center justify-center"
              aria-label="Rotate"
            >
              ↻
            </button>
            <button
              onClick={() => moveHorizontal(1)}
              className="w-12 h-12 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white text-lg font-bold rounded shadow-lg transition-colors flex items-center justify-center"
              aria-label="Move right"
            >
              →
            </button>
          </div>
          <button
            onClick={() => moveDown()}
            className="w-full h-10 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white text-lg font-bold rounded shadow-lg transition-colors flex items-center justify-center"
            aria-label="Move down"
          >
            ↓
          </button>
          <div className="text-white text-xs text-center opacity-70">
            Swipe or use buttons
          </div>
        </div>
      )}
      
      <div className="mt-3 flex gap-2">
        {!isPlaying && (
          <button
            onClick={startGame}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded shadow-lg transition-colors"
          >
            {gameOver ? 'Play Again' : 'Start Game'}
          </button>
        )}
      </div>
      
      {gameOver && (
        <div className="mt-2 text-red-500 font-bold text-sm">
          Game Over!
        </div>
      )}
    </div>
  );
}



