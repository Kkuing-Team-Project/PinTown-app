const connectToMongoDB = require('./routes/db_connect');
const express = require('express');

const app = express();

app.use(express.json());

connectToMongoDB();

const port = 3000;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});