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

app.post('/saveNickname', async (req, res) => {
  const { nickname } = req.body;
  console.log(nickname, 'nickname');

  try {
    // 데이터베이스에 nickname 저장
    await pool.query('INSERT INTO public."user" (nickname) VALUES ($1)', [nickname]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Nickname 저장 중 오류가 발생했습니다.', error);
    res.sendStatus(500);
  }
});

app.get('/nicknames', async (req, res) => {
  try {
    // 데이터베이스에서 모든 nickname 가져오기
    const { rows } = await pool.query('SELECT * FROM "user"');
    console.log(rows, 'rows');
    const nicknames = rows.map(row => row.nickname);
    res.json(nicknames);
  } catch (error) {
    console.error('Nickname 불러오기 중 오류가 발생했습니다.', error);
    res.sendStatus(500);
  }
});

app.listen(5001, () => {
  console.log('서버가 실행되었습니다.');
});
