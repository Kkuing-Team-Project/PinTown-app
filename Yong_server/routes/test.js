// 문자 비용 아까워서 만든 SMS 관련 코드들
// 아래 코드들은 지금은 다 send_sms.js에 입력 됨

const connectToMongoDB = require('./db_connect');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const logSchema = new Schema({ 
    num: String, // num을 문자열로 저장
    phoneNumber: String // 클라이언트에서 받을 전화번호 문자열
});

const log = mongoose.model('log', logSchema);

// 랜덤 숫자열 생성
function generateRandomNumber() {
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}
const num = generateRandomNumber();
console.log(num);

// 검증하기 위해 데이터베이스 저장
async function saveToDB() {
    try {
        await connectToMongoDB();
        const newData = new log({
            num: num,
            phoneNumber: "01025143059" // 테스트용으로 임시로 지정
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
        console.error('데이터 저장 오류:', error);
    }
}

saveToDB();