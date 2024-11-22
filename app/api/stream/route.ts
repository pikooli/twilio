import { NextResponse } from 'next/server';

const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Start>
    <Stream url="wss://f185-90-102-109-149.ngrok-free.app/"></Stream>
  </Start>
  <Pause length="40"/>
</Response>`;

export async function POST() {
  return new NextResponse(twiml, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
