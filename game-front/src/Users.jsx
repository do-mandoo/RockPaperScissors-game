import { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [nicknames, setNicknames] = useState([]);

  useEffect(() => {
    fetchNicknames();
  }, []);

  const fetchNicknames = async () => {
    try {
      // 백엔드로부터 nickname들 가져오기
      const response = await axios.get('http://localhost:5001/nicknames');
      setNicknames(response.data);
    } catch (error) {
      console.error('Nickname 불러오기 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <div>
      <h2>Nicknames:</h2>
      <ul>
        {nicknames.map(nickname => (
          <li key={nickname}>{nickname}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
