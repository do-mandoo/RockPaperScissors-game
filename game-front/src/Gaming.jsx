import { Box } from '@mui/material';
import GameField from './GameField';
import GameStartView from './GameStartView';
import { useState } from 'react';

const Gaming = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const handleStart = () => {
    setGameStarted(true);
  };
  return <Box>{!gameStarted ? <GameStartView onStart={handleStart} /> : <GameField />}</Box>;
};

export default Gaming;
