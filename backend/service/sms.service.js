const twilio = require('twilio')

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, MESSAGING_SERVICE_SID, } = require("../config/config");


const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const sendSMS = async (message, receiverNumber) => {
    try {
        console.log('SMS service: start sending');

      const smsRes = await client.messages.create({
            body: message,
            to: receiverNumber,
            messagingServiceSid: MESSAGING_SERVICE_SID
        });

        console.log(`SMS response: ${smsRes.status}`);
    } catch (e) {
        console.error(`SMS service: ${e.message}`);
    }
};

module.exports = {
    sendSMS,
};