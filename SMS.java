import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

public class CoolSMSSender {
    public static void main(String[] args) {
        String apiKey = "YOUR_API_KEY";
        String apiSecret = "YOUR_API_SECRET";

        Message coolsms = new Message(apiKey, apiSecret);

        try {
            // 메시지 전송 예제
            coolsms.sendSMS("발신자 전화번호", "수신자 전화번호", "메시지 내용", "발신자명");

        } catch (CoolsmsException e) {
            System.out.println(e.getMessage());
            System.out.println(e.getCode());
        }
    }
}
