import { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [nickname, setNickname] = useState('');

  const handleInputChange = event => {
    setNickname(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      // 데이터를 백엔드로 전송
      await axios.post('http://localhost:5001/saveNickname', { nickname });
      console.log('Nickname이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Nickname 저장 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={nickname} onChange={handleInputChange} />
      <button type='submit'>저장</button>
    </form>
  );
}

export default LoginForm;
