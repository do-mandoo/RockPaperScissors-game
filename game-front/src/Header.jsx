import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  const getUser = localStorage.getItem('game-id');
  console.log(getUser, 'agsd');
  return (
    <Box>
      <Link to='/'>홈</Link> <Link to='/signup'>회원가입</Link>{' '}
      {getUser !== null || undefined ? (
        <Button
          onClick={() => {
            localStorage.removeItem('game-id');
          }}
        >
          로그아웃
        </Button>
      ) : (
        <Link to='/login'>로그인</Link>
      )}
      {/* <Link to='/game'>게임하기</Link> */}
    </Box>
  );
};

export default Header;
