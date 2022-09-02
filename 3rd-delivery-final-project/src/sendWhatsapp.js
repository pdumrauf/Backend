const twilio = require("twilio");

const ACCOUNT_SID = "ACefa1648d8bea49b1ff8eaf7a19dc443d";
const AUTH_TOKEN = "7c9445f6de842323b939030bbea5a882";
const PHONE_NUMBER = "whatsapp:+14155238886";

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendWhatsapp = async (body) => {
    try {
        const message = await client.messages.create({
            body,
            from: PHONE_NUMBER,
            to: "whatsapp:+33678513038",
        });

        //console.log(message)
    } catch (e) {
        console.log(e);
    }
};

module.exports = sendWhatsapp;