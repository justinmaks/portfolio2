'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';

type Coordinate = { x: number; y: number };

const numRows = 20;
const numCols = 20;
const cellSize = 20;

export default function Snake() {
  const [snake, setSnake] = useState<Coordinate[]>([{ x: 2, y: 2 }]);
  const [food, setFood] = useState<Coordinate>({ x: 5, y: 5 });
  const [dir, setDir] = useState<Coordinate>({ x: 1, y: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  const resetGame = useCallback(() => {
    setSnake([{ x: 2, y: 2 }]);
    setFood({ x: 5, y: 5 });
    setDir({ x: 1, y: 0 });
    setIsGameOver(false);
    setScore(0);
  }, []);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (isGameOver) {
        resetGame();
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (dir.y === 0) setDir({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (dir.y === 0) setDir({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (dir.x === 0) setDir({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (dir.x === 0) setDir({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    },
    [dir, isGameOver, resetGame],
  );

  useEffect(() => {
    const gameInterval = window.setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0], x: prevSnake[0].x + dir.x, y: prevSnake[0].y + dir.y };

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
          setFood({
            x: Math.floor(Math.random() * numCols),
            y: Math.floor(Math.random() * numRows),
          });
          setScore((prev) => {
            const nextScore = prev + 10;
            setHighestScore((prevHigh) => Math.max(prevHigh, nextScore));
            return nextScore;
          });
        }

        return newSnake;
      });
    }, 100);

    window.addEventListener('keydown', handleKeydown);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [dir, food, handleKeydown]);

  const gridCells = useMemo(() => Array.from({ length: numRows * numCols }), []);

  if (isGameOver) {
    return (
      <Box textAlign="center" color="white">
        <Typography variant="h4" gutterBottom>
          Highest Score: {highestScore}
        </Typography>
        <Typography variant="h3" gutterBottom>
          You lost!
        </Typography>
        <Typography variant="body1">Press any arrow key or WASD to restart.</Typography>
      </Box>
    );
  }

  return (
    <Box textAlign="center" color="white">
      <Typography variant="h4" gutterBottom>
        Highest Score: {highestScore}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Score: {score}
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        mt={4}
      >
        <Box
          display="grid"
          gridTemplateColumns={`repeat(${numCols}, ${cellSize}px)`}
          gap={0.5}
        >
          {gridCells.map((_, index) => {
            const x = index % numCols;
            const y = Math.floor(index / numCols);
            const isSnakePart = snake.some((part) => part.x === x && part.y === y);
            const isFood = food.x === x && food.y === y;
            return (
              <Box
                key={`${x}-${y}`}
                width={cellSize}
                height={cellSize}
                sx={{
                  backgroundColor: isSnakePart ? 'green' : isFood ? 'red' : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}


