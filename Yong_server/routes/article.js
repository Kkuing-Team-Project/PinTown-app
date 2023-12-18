// 게시물 작성 코드
const connectToMongoDB = require("./db_connect");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

// 게시물 스케마
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// 게시물 모델
const Post = mongoose.model('Post', postSchema);

// 게시물 저장 POST 요청 처리
app.post('/articles', async (req, res) => {
    const { title, content } = req.body;

    try {
        console.log('게시물 저장 요청 확인함');

        // 게시물 생성
        await connectToMongoDB();
        const newPost = new Post({
            title: title,
            content: content
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