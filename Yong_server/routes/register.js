const express = require('express');
const app = express();

app.post('/post', async (req, res) => {
    const { username, getNumber } = req.body;

    try {
        console.log('게시물 저장 요청 확인함');

        // 게시물 생성
        const newPost = new CUSTOMER({
            user_ID: username,
            user_NUM: getNumber
        });

        // 데이터베이스에 저장
        await newPost.save();

        console.log('게시물 저장 성공');
        res.status(201).json({ message: '게시물 저장 성공' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});