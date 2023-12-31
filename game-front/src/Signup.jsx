import axios from 'axios';
import { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleNicknameChange = e => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post('http://localhost:5001/register', {
        nickname,
        password,
      });
      if (res.status === 201 || res.data.success === true) {
        console.log('회원가입 성공:', res);
        navigate('/login');
      } else {
        console.error('회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <Container maxWidth='sm' sx={{ mt: 10 }}>
      <h2>회원가입</h2>
      <TextField
        label='사용자 닉네임'
        value={nickname}
        onChange={e => handleNicknameChange(e)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='비밀번호'
        type='password'
        value={password}
        onChange={e => handlePasswordChange(e)}
        fullWidth
        margin='normal'
      />
      <Button variant='contained' onClick={handleSignUp}>
        가입하기
      </Button>
      <Link to='/login'>
        <Button>이미 회원이라면 로그인하러 가기</Button>
      </Link>
    </Container>
  );
};

export default SignupForm;
