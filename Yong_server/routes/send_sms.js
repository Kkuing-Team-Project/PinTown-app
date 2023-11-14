// COOLSMS API + SCERET
const coolsms = require("coolsms-node-sdk").default;
const messageService = new coolsms("NCSL3V8WN7PQFTEG", "0H3O0HHELHEDK2D2MFUDEZPZAIIASJ1U"); // coolsms API, SECRET

const connectToMongoDB = require('./db_connect');
const mongoose = require('mongoose');

const express = require('express');
const app = express();


const Schema = mongoose.Schema;
const logSchema = new Schema({ 
    num: String, // num을 문자열로 저장
    phoneNumber: String // 클라이언트에서 받을 전화번호 문자열 | phoneNumber 변수로 클라이언트에서 사용자 전화번호 받음
});

const log = mongoose.model('log', logSchema);


// 랜덤 번호 생성
function generateRandomNumber() {
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}
const num = generateRandomNumber();
console.log(num);


// SMS 발송 코드
// messageService.sendOne({
//   to: `${phoneNumber}`, // 메세지 받는 번호 | 추후 "phoneNumber"로 변경(변수로 사용자 번호 입력)
//   from: "01025143059", // 메세지 전송하는 번호 | 일단 이 번호 고정임
//   text: `안녕하세요.\n인증번호는[${num}]입니다.\n3분 안에 입력하세요.`
// }).then(res => console.log(res));


// // 전화번호 + 인증 번호 저장 -> 인증용 저장, 3분 후 삭제
// async function saveToDB() {
//     try {
//         await connectToMongoDB();
//         const newData = new log({
//             num: num,
//             phoneNumber: "01025143059" // 테스트용으로 임시로 입력 | 추후 phoneNumber 변수로 변경하여 저장
//         });

//         const savedData = await newData.save();
//         console.log('데이터가 성공적으로 저장되었습니다:', savedData);

//         // 3분 후 데이터 삭제
//         setTimeout(async () => {
//             try {
//                 await log.deleteOne({ _id: savedData._id });
//                 console.log('데이터가 성공적으로 삭제되었습니다.');
//             } catch (error) {
//                 console.error('데이터 삭제 오류:', error);
//             }
//         }, 180000);
//     } catch (error) {
//         console.error('데이터 저장 오류:', error);
//     }
// }

// saveToDB();

async function sendSMSAndSaveToDB(getNumber) {
    const num = generateRandomNumber();

    try {
        // SMS 발송
        await messageService.sendOne({
            to: `${getNumber}`,
            from: "01025143059",
            text: `안녕하세요.\n인증번호는[${num}]입니다.\n3분 안에 입력하세요.`
        });

        // 데이터베이스 저장
        await connectToMongoDB();
        const newData = new log({
            num: num,
            getNumber: getNumber
        });

        const savedData = await newData.save();
        console.log('데이터가 성공적으로 저장되었습니다:', savedData);

        // 3분 후 데이터 삭제
        setTimeout(async () => {
            try {
                await log.deleteOne({ _id: savedData._id });
                console.log('데이터가 성공적으로 삭제되었습니다.');
            } catch (error) {
                console.error('데이터 삭제 오류:', error);
            }
        }, 180000);
    } catch (error) {
        console.error('SMS 발송 및 데이터 저장 오류:', error);
    }
}

const PORT = 8081; // 변경된 포트
const HOST = '192.9.125.212'; // 변경된 호스트

app.listen(PORT, HOST, () => {
    console.log(`서버가 ${HOST}:${PORT}에서 실행 중입니다.`);
});
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// POST 요청 처리


app.post('/sms', (req, res) => {
    const getNumber = req.body;
    const phoneNumber = getNumber.getNumber.match(/\d+/)[0];

    if (phoneNumber) {
        sendSMSAndSaveToDB(phoneNumber);
        res.status(200).json({ message: 'SMS 전송 및 데이터베이스 저장이 시작되었습니다.' });
    } else {
        res.status(400).json({ error: '전화번호가 제공되지 않았습니다.' });
    }
});
// sendSMSAndSaveToDB(tttt)