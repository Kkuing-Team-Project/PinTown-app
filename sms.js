import axios from 'axios';
import { encode as base64encode } from 'base-64';
//import { encode as base64encode } from 'react-native-base64';
//0H3O0HHELHEDK2D2MFUDEZPZAIIASJ1U

function generateRandomNumber() {
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}


const sendSMS = async (phoneNumber) => {
    const num = generateRandomNumber();
    const apiKey = 'NCSL3V8WN7PQFTEG';
    const apiSecret = '0H3O0HHELHEDK2D2MFUDEZPZAIIASJ1U';
    const apiUrl = 'https://api.coolsms.co.kr/sms/2/send';

    try {
        const response = await axios.post(apiUrl, {
            messages: [
                {
                    to: `${phoneNumber}`,
                    from: '01025143059',
                    text: `안녕하세요.\n인증번호는[${num}]입니다.\n3분 안에 입력하세요.`
                },
            ],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64encode(`api_key:${apiKey}`)}`,
            },
        });

        // 응답이 정의되었고 데이터 속성이 있는지 확인
        if (response && response.data) {
            console.log('SMS 전송 성공:', response.data);
        } else {
            console.error('SMS 전송 실패: 응답이 올바르지 않음');
        }
    } catch (error) {
        console.error('SMS 전송 실패:', error.message);
    }
};

export default sendSMS;

