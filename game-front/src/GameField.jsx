import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import AlertDialogSlide from './Modal';

const GameField = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [randomOption, setRandomOption] = useState(null);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);

  const options = ['가위', '바위', '보'];

  const handleOptionClick = option => {
    setSelectedOption(option);
    const randomIndex = Math.floor(Math.random() * 3);
    const random = options[randomIndex];
    setRandomOption(random);
    console.log(score + 1, '스코어');

    if (option === random) {
      setResult('비겼습니다.');
    } else if (
      (option === '가위' && random === '보') ||
      (option === '바위' && random === '가위') ||
      (option === '보' && random === '바위')
    ) {
      setResult('이겼습니다!');
      setScore(score + 1);
    } else {
      setResult('졌습니다...');
    }

    if (score + 1 === 3) {
      setTimeout(() => {
        alert('게임이 종료되었습니다.');
        setScore(0);
      }, 100);
    }
    setShowModal(true);

    console.log('나: ', selectedOption, '컴: ', randomOption, '결과: ', result);
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showModal]);

  return (
    <Box sx={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
      <AlertDialogSlide open={open} setOpen={setOpen} />
      <Box>상대의 선택: {randomOption}</Box>
      <Box sx={{ height: '100px', mt: '10%' }}>
        {showModal && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: '#aaa',
              width: '200px',
              height: '50px',
              margin: '0 auto',
              color: '#000',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>결과: {result}</Box>
          </Box>
        )}
      </Box>
      <Box>나의 선택: {selectedOption}</Box>
      <Box>
        <Button onClick={() => handleOptionClick('가위')}>가위</Button>
        <Button onClick={() => handleOptionClick('바위')}>바위</Button>
        <Button onClick={() => handleOptionClick('보')}>보</Button>
      </Box>
      <Box>{score}승! </Box>
    </Box>
  );
};

export default GameField;
