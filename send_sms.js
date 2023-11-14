// COOLSMS API + SCERET
const coolsms = require("coolsms-node-sdk").default;
const messageService = new coolsms("API", "SECRET"); // coolsms API, SECRET

const connectToMongoDB = require('./db_connect');
const mongoose = require('mongoose');

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

async function sendSMSAndSaveToDB(phoneNumber) {
    const num = generateRandomNumber();

    try {
        // SMS 발송
        await messageService.sendOne({
            to: phoneNumber,
            from: "01025143059",
            text: `안녕하세요.\n인증번호는[${num}]입니다.\n3분 안에 입력하세요.`
        });

        // 데이터베이스 저장
        await connectToMongoDB();
        const newData = new log({
            num: num,
            phoneNumber: phoneNumber
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

// POST 요청 처리
app.post('/sms', (req, res) => {
    const getNumber = req.body.getNumber;

    if (getNumber) {
        sendSMSAndSaveToDB(getNumber);
        res.status(200).send('SMS 전송 및 데이터베이스 저장이 시작되었습니다.');
    } else {
        res.status(400).send('전화번호가 제공되지 않았습니다.');
    }
});