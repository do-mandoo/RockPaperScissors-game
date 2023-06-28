import { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleNicknameChange = e => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // 데이터를 백엔드로 전송
      await axios.post('http://localhost:5001/saveNickname', { nickname, password });
      console.log('Nickname이 성공적으로 로그인되었습니다.');
    } catch (error) {
      console.error('Nickname 로그인 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={nickname} placeholder='nickname' onChange={handleNicknameChange} />
      <input type='text' value={password} placeholder='password' onChange={handlePasswordChange} />
      <button type='submit'>로그인</button>
    </form>
  );
}

export default LoginForm;
