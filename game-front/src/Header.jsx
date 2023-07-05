import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const getUser = localStorage.getItem('game-id');
  const navigate = useNavigate();
  console.log(getUser, 'agsd');
  return (
    <Box>
      {getUser !== null && getUser !== undefined ? (
        <>
          <Link to='/'>홈</Link>{' '}
          <Button
            onClick={() => {
              localStorage.removeItem('game-id');
              navigate('/');
            }}
          >
            로그아웃
          </Button>
        </>
      ) : (
        <>
          <Link to='/'>홈</Link> <Link to='/signup'>회원가입</Link> <Link to='/login'>로그인</Link>
        </>
      )}
      {/* <Link to='/game'>게임하기</Link> */}
    </Box>
  );
};

export default Header;
