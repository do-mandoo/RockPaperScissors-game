import { useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GameField = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [randomOption, setRandomOption] = useState(null);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [loseScore, setLoseScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);

  const getUser = localStorage.getItem('game-id');
  const navigate = useNavigate();

  const options = ['가위', '바위', '보'];
  const optionImages = {
    가위: '/가위그림.png',
    바위: '/바위그림.png',
    보: '/보그림.png',
  };

  useEffect(() => {
    navigate;
  }, [navigate]);

  // 3번 이기면 알럿이 뜨고 score0으로 초기화.
  const handleWin = () => {
    setScore(score + 1);

    if (score + 1 === 3) {
      setTimeout(() => {
        alert('게임이 종료되었습니다.');
        setScore(0);
        setLoseScore(0);
        setDrawScore(0);
      }, 100);
    }
  };

  const handleLose = () => {
    setLoseScore(loseScore + 1);
  };
  const handleDraw = () => {
    setDrawScore(drawScore + 1);
  };

  const handleOptionClick = myOption => {
    setSelectedOption(myOption);
    const randomIndex = Math.floor(Math.random() * 3);
    const random = options[randomIndex];
    setRandomOption(random);

    if (myOption === random) {
      setResult('비겼습니다.');
      handleDraw();
    } else if (
      (myOption === '가위' && random === '보') ||
      (myOption === '바위' && random === '가위') ||
      (myOption === '보' && random === '바위')
    ) {
      setResult('이겼습니다!');
      handleWin();
    } else {
      setResult('졌습니다...');
      handleLose();
    }

    setShowModal(true);
  };

  // 이겼습니다,비겼습니다,졌습니다를 0.5초동안 모달로 띄우기.
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showModal]);

  // 로그인이 안되어있다면 index페이지로 이동
  useEffect(() => {
    if (getUser === null || getUser === undefined) {
      return navigate('/');
    }
  }, [getUser, navigate]);

  return (
    <Box sx={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
      {/* Fight Zone----- */}
      <Box sx={styled.fZBox}>
        <Box sx={styled.fZBackText}>fight zone</Box>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'space-between',
            minHeight: '400px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography>상대의 선택</Typography>
            <Box>{randomOption && <img src={optionImages[randomOption]} alt={randomOption} />}</Box>
          </Box>
          <Box sx={{ height: '100px', mt: '10%' }}>
            {showModal && (
              <Box sx={styled.modalBox}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>{result}</Box>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              {selectedOption && <img src={optionImages[selectedOption]} alt={selectedOption} />}
            </Box>
            <Typography>나의 선택</Typography>
          </Box>
        </Box>
      </Box>
      {/* -----Fight Zone */}
      <Box>
        {score}승! {loseScore}패! {drawScore}무!
      </Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton sx={styled.iconBtn} onClick={() => handleOptionClick('가위')}>
          <Box sx={styled.btnBox}>
            <img src={optionImages['가위']} alt='가위' />
            <Typography sx={styled.btnTypo}>가위</Typography>
          </Box>
        </IconButton>
        <IconButton sx={styled.iconBtn} onClick={() => handleOptionClick('바위')}>
          <Box sx={styled.btnBox}>
            <img src={optionImages['바위']} alt='바위' />
            <Typography sx={styled.btnTypo}>바위</Typography>
          </Box>
        </IconButton>
        <IconButton sx={styled.iconBtn} onClick={() => handleOptionClick('보')}>
          <Box sx={styled.btnBox}>
            <img src={optionImages['보']} alt='보' />
            <Typography sx={styled.btnTypo}>보</Typography>
          </Box>
        </IconButton>
      </Box>
    </Box>
  );
};

export default GameField;

const styled = {
  fZBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column nowrap',
    border: '6px solid rgba(0, 17, 255, 0.745)',
    borderRadius: '10px',
    mr: '10px',
    minWidth: '700px',
    minHeight: '400px',
    margin: '20px auto',
    position: 'relative',
  },
  fZBackText: {
    position: 'absolute',
    fontSize: '100px',
    color: 'rgba(0,0,0,0.2)',
    textTransform: 'uppercase',
    fontFamily: 'Shadows Into Light',
  },
  modalBox: {
    display: 'flex',
    justifyContent: 'center',
    bgcolor: '#3f3f3f',
    width: '300px',
    height: '60px',
    margin: '0 auto',
    color: '#fff',
    fontSize: '30px',
    fontWeight: 'bold',
  },
  iconBtn: {
    borderRadius: '10px',
    mr: '10px',
    transition: 'unset',
    '&:hover': { bgcolor: '#aaa' },
  },
  btnBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'unset',
    bgcolor: '#fff',
  },
  btnTypo: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};
