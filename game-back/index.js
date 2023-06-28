require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors()); // 모든 도메인에서의 요청을 허용

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT, // PostgreSQL 포트 번호
});

app.use(express.json());

// app.post('/saveNickname', async (req, res) => {
//   const { nickname } = req.body;
//   console.log(nickname, 'nickname');

//   try {
//     // 데이터베이스에 nickname 저장
//     await pool.query('INSERT INTO public."user" (nickname) VALUES ($1)', [nickname]);
//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Nickname 저장 중 오류가 발생했습니다.', error);
//     res.sendStatus(500);
//   }
// });

// app.get('/nicknames', async (req, res) => {
//   try {
//     // 데이터베이스에서 모든 nickname 가져오기
//     const { rows } = await pool.query('SELECT * FROM "user"');
//     console.log(rows, 'rows');
//     const nicknames = rows.map(row => row.nickname);
//     res.json(nicknames);
//   } catch (error) {
//     console.error('Nickname 불러오기 중 오류가 발생했습니다.', error);
//     res.sendStatus(500);
//   }
// });

// 회원가입 엔드포인트
app.post('/register', async (req, res) => {
  const { nickname, password } = req.body;

  try {
    const query = 'INSERT INTO public."user" (nickname, password) VALUES ($1, $2)';
    await pool.query(query, [nickname, password]);

    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error('회원가입 중 오류가 발생했습니다:', error);
    res.status(500).json({ message: '회원가입에 실패했습니다.' });
  }
});

// 로그인 엔드포인트
app.post('/login', async (req, res) => {
  const { nickname, password } = req.body;
  console.log(nickname, password);
  try {
    const query = 'SELECT * FROM public."user" WHERE nickname = $1 AND password = $2';
    const result = await pool.query(query, [nickname, password]);
    const user = result.rows[0];

    if (user) {
      res.status(200).json({ message: '로그인이 성공했습니다.' });
    } else {
      res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    console.error('로그인 중 오류가 발생했습니다:', error);
    res.status(500).json({ message: '로그인에 실패했습니다.' });
  }
});

app.listen(5001, () => {
  console.log('서버가 실행되었습니다.');
});
