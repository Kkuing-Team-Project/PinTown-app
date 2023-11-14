// smsLogic.js
const coolsms = require("coolsms-node-sdk").default;
const connectToMongoDB = require('./path/to/db_connect');
const log = require('./path/to/logModel');

const messageService = new coolsms("NCSL3V8WN7PQFTEG", "0H3O0HHELHEDK2D2MFUDEZPZAIIASJ1U");

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
    throw error; // 에러를 호출한 곳으로 전달
  }
}

module.exports = sendSMSAndSaveToDB;
