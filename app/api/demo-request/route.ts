// Resend Integration
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, system, message } = await req.json();

    if (!resend) {
      return NextResponse.json({ error: 'Resend API Key is missing. Please add it to .env.local' }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Merit Advisory <onboarding@resend.dev>',
      to: ['outreach@meritadvisory.so'], 
      subject: `New Demo Request: ${system}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0f55ba; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Demo Request</h2>
          <p><strong>System Requested:</strong> ${system}</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${message || 'No additional requirements provided.'}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">
            Sent from Merit Advisory Platform
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
