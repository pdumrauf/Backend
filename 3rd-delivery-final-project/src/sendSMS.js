const twilio = require("twilio");
const logger = require('./logs')

const ACCOUNT_SID = "ACefa1648d8bea49b1ff8eaf7a19dc443d";
const AUTH_TOKEN = "b0ea32f2b41595890917d6783958f56e";
const PHONE_NUMBER = "+12403013537";

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendSMS = async (body) => {
    try {
        const message = await client.messages.create({
            body,
            from: PHONE_NUMBER,
            to: "+33678513038",
        });

        console.log(message)

    } catch (e) {
      logger.error(e);
    }
};

module.exports = sendSMS;