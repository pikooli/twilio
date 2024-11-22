import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const PHONE_NUMBER = "+12029722380"

const client = twilio(accountSid, authToken);

async function createCall() {
  const call = await client.calls.create({
    from: PHONE_NUMBER,
    to: "+33641760365",
    url: "http://demo.twilio.com/docs/voice.xml",
  });

  console.log(call.sid);
}

export const GET = async () => {
  await createCall();
  return Response.json({ message: "Call created" });
};