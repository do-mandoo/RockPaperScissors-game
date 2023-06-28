import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/login', { nickname, password });
      console.log(response, 'resersr');
      const data = response.data;
      console.log(data, 'data');
      localStorage.setItem('game-id', nickname);
      navigate('/game');
    } catch (error) {
      console.error(error, '로그인 실패');
    }
  };

  return (
    <Container maxWidth='sm' sx={{ mt: 10 }}>
      <h2>로그인</h2>
      <TextField
        label='사용자 닉네임'
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='비밀번호'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        margin='normal'
      />
      <Button variant='contained' onClick={handleLogin}>
        로그인하기
      </Button>
      <Link to='/signup'>
        <Button>회원이 아니라면 가입하러 가기</Button>
      </Link>
      {/* <Box
        sx={{
          mt: '150px',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link to='/game'>
          <Button
            sx={{
              fontSize: '30px',
              fontWeight: 'bold',
              bgcolor: 'blue',
              color: '#fff',
              p: '10px 30px',
              transition: 'unset',
              '&:hover': {
                bgcolor: '#fff',
                border: '3px solid blue',
                color: 'blue',
              },
            }}
          >
            게임 시작 GO !
          </Button>
        </Link>
      </Box> */}
    </Container>
  );
}

export default LoginForm;
