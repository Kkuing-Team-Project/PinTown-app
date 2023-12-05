// 게시물 작성 코드
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

// 게시물 스케마
const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    createdAt: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    location: String,
});

// 게시물 모델
const Post = mongoose.model('Post', postSchema);

// 게시물 저장 POST 요청 처리
app.post('/post', async (req, res) => {
    const { title, body, author, location } = req.body; // location : 게시물 작성 위치 (클라이언트에서 전송)

    try {
        console.log('게시물 저장 요청 확인함');

        // 게시물 생성
        const newPost = new Post({
            title: title, // 제목
            body: body, // 본문
            writer: author, // 작성자 아이디
            location: location, // 게시물 작성 위치
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

connectToMongoDB();
