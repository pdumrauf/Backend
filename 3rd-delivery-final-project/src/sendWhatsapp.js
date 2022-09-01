const twilio = require("twilio");

const ACCOUNT_SID = "ACe87fed0ac4660dd435107afba7ea4ee6";
const AUTH_TOKEN = "c2c7e6d6265de9cd96730445c5ec446b";
const PHONE_NUMBER = "whatsapp:+14155238886";

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendWhatsapp = async (body) => {
    try {
        const message = await client.messages.create({
            body,
            from: PHONE_NUMBER,
            to: "whatsapp:+33678513038",
        });

        console.log(message)
    } catch (e) {
        console.log(e);
    }
};

module.exports = sendWhatsapp;