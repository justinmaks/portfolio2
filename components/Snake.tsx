'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

type Coordinate = { x: number; y: number };

const numRows = 20;
const numCols = 20;
const tickMs = 100;
const swipeThreshold = 24;

const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const LEFT = { x: -1, y: 0 };
const RIGHT = { x: 1, y: 0 };

const keyDirections: Record<string, Coordinate> = {
  ArrowUp: UP,
  w: UP,
  W: UP,
  ArrowDown: DOWN,
  s: DOWN,
  S: DOWN,
  ArrowLeft: LEFT,
  a: LEFT,
  A: LEFT,
  ArrowRight: RIGHT,
  d: RIGHT,
  D: RIGHT,
};

const initialSnake: Coordinate[] = [{ x: 2, y: 2 }];
const initialFood: Coordinate = { x: 5, y: 5 };

function randomFood(snake: Coordinate[]): Coordinate {
  // Never spawn food on the snake.
  for (;;) {
    const spot = {
      x: Math.floor(Math.random() * numCols),
      y: Math.floor(Math.random() * numRows),
    };
    if (!snake.some((part) => part.x === spot.x && part.y === spot.y)) return spot;
  }
}

export default function Snake() {
  const [snake, setSnake] = useState<Coordinate[]>(initialSnake);
  const [food, setFood] = useState<Coordinate>(initialFood);
  const [isGameOver, setIsGameOver] = useState(false);
  // The game waits for the first key/swipe/tap instead of running into a wall on load.
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  // Direction lives in refs so input never restarts the game loop. `moved` is the
  // direction of the last completed step; turns are validated against it, so two quick
  // presses inside one tick can't reverse the snake into itself.
  const queued = useRef<Coordinate>(RIGHT);
  const moved = useRef<Coordinate>(RIGHT);
  const touchStart = useRef<Coordinate | null>(null);

  const resetGame = useCallback(() => {
    queued.current = RIGHT;
    moved.current = RIGHT;
    setSnake(initialSnake);
    setFood(initialFood);
    setIsGameOver(false);
    setScore(0);
    setStarted(false);
  }, []);

  const steer = useCallback((next: Coordinate) => {
    const last = moved.current;
    setStarted(true);
    if (next.x === -last.x && next.y === -last.y) return;
    queued.current = next;
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const next = keyDirections[e.key];
      if (!next) return;
      // Arrow keys would otherwise scroll the page while playing.
      e.preventDefault();
      if (isGameOver) {
        resetGame();
        return;
      }
      steer(next);
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isGameOver, resetGame, steer]);

  useEffect(() => {
    if (isGameOver || !started) return undefined;

    const gameInterval = window.setInterval(() => {
      const dir = queued.current;
      moved.current = dir;
      setSnake((prevSnake) => {
        const head = { x: prevSnake[0].x + dir.x, y: prevSnake[0].y + dir.y };

        if (
          head.x < 0 ||
          head.x >= numCols ||
          head.y < 0 ||
          head.y >= numRows ||
          prevSnake.some((part) => part.x === head.x && part.y === head.y)
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake.slice(0, -1)];

        if (head.x === food.x && head.y === food.y) {
          newSnake.push(prevSnake[prevSnake.length - 1]);
          setFood(randomFood(newSnake));
          setScore((prev) => {
            const nextScore = prev + 10;
            setHighestScore((prevHigh) => Math.max(prevHigh, nextScore));
            return nextScore;
          });
        }

        return newSnake;
      });
    }, tickMs);

    return () => clearInterval(gameInterval);
  }, [food, isGameOver, started]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < swipeThreshold) {
      // A plain tap starts the game in its current direction.
      setStarted(true);
      return;
    }
    if (Math.abs(dx) > Math.abs(dy)) steer(dx > 0 ? RIGHT : LEFT);
    else steer(dy > 0 ? DOWN : UP);
  };

  const gridCells = useMemo(() => Array.from({ length: numRows * numCols }), []);

  if (isGameOver) {
    return (
      <Box
        component="button"
        type="button"
        onClick={resetGame}
        sx={{
          textAlign: 'center',
          color: 'white',
          background: 'none',
          border: 0,
          font: 'inherit',
          cursor: 'pointer',
          mt: { xs: 6, md: 10 },
        }}
      >
        <Typography variant="h4" gutterBottom>
          Highest Score: {highestScore}
        </Typography>
        <Typography variant="h3" gutterBottom>
          You lost!
        </Typography>
        <Typography variant="body1">
          Press an arrow key / WASD, or tap here, to restart.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        textAlign: 'center',
        color: 'white',
        width: '100%',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Highest Score: {highestScore}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Score: {score}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <Box
          role="img"
          aria-label={`Snake board, score ${score}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, 1fr)`,
            gap: { xs: '2px', sm: 0.5 },
            width: 'min(480px, 100%)',
            // Swipes steer the snake instead of scrolling the page.
            touchAction: 'none',
          }}
        >
          {gridCells.map((_, index) => {
            const x = index % numCols;
            const y = Math.floor(index / numCols);
            const isSnakePart = snake.some((part) => part.x === x && part.y === y);
            const isFood = food.x === x && food.y === y;
            return (
              <Box
                key={`${x}-${y}`}
                sx={{
                  aspectRatio: '1',
                  backgroundColor: isSnakePart ? 'green' : isFood ? 'red' : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
            );
          })}
        </Box>
      </Box>
      <Typography variant="body2" sx={{ mt: 2, opacity: started ? 0.6 : 1 }}>
        {started
          ? 'Arrow keys / WASD, or swipe on the board.'
          : 'Press an arrow key / WASD, or tap / swipe the board to start.'}
      </Typography>
    </Box>
  );
}
