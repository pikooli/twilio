import { NextResponse } from 'next/server';
import twilio from "twilio";

export const POST = async () => {

  const voiceResponse = new twilio.twiml.VoiceResponse();

  voiceResponse.say("Hello from your pals at Twilio! Have fun.");

  voiceResponse.pause({ length: 1 });
  voiceResponse.say('Goodbye!');
  console.log(voiceResponse.toString())
  
  // Set the headers and send the response
  return new NextResponse(
    voiceResponse.toString(),
    {
      status: 200,
      headers: {
        'Content-Type': 'text/xml'
      }
  });
};
