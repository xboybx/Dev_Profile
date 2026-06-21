import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from('contact_messages')
    .insert([body])
    .select()
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send notifications asynchronously without blocking the user response if possible, 
  // but await them to ensure serverless context doesn't terminate before they finish.
  const { name, email, message } = body;
  
  // 1. Resend Email Notification
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL_TO || 'j.jaswanth@icloud.com';
  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: toEmail,
          subject: `🔴 Action Required: New Portfolio message from ${name}`,
          html: `
            <div style="background-color: #050505; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px;">
              <div style="max-width: 580px; margin: 0 auto; border: 1px solid #1c1c1c; background-color: #000000; padding: 32px; border-radius: 8px;">
                <div style="text-align: center; margin-bottom: 32px; border-bottom: 1px solid #1c1c1c; padding-bottom: 24px;">
                  <div style="font-size: 22px; font-weight: 700; letter-spacing: 0.15em; color: #ffffff; text-transform: uppercase;">JASWANTH</div>
                  <div style="font-size: 10px; letter-spacing: 0.08em; color: #666666; text-transform: uppercase; margin-top: 6px;">Portfolio Contact Form Responder</div>
                </div>
                
                <div style="background-color: #1a0808; border: 1px dashed #5a1818; padding: 16px; border-radius: 6px; margin-bottom: 24px; color: #ff6b6b; font-size: 13px; line-height: 1.5; font-weight: 500;">
                  <span style="margin-right: 8px; font-size: 14px;">🔴</span>A person is trying to contact you through your developer portfolio contact form — respond immediately.
                </div>

                <div style="margin-bottom: 20px;">
                  <span style="color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">Name</span>
                  <div style="color: #ffffff; font-size: 15px; font-weight: 400; margin-top: 4px;">${name}</div>
                </div>
                <div style="margin-bottom: 20px;">
                  <span style="color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">Email</span>
                  <div style="font-size: 15px; margin-top: 4px;">
                    <a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a>
                  </div>
                </div>
                <div style="margin-bottom: 24px;">
                  <span style="color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">Message</span>
                  <div style="color: #dddddd; font-size: 14px; line-height: 1.6; margin-top: 6px; white-space: pre-wrap;">${message}</div>
                </div>
                <div style="border-top: 1px solid #1c1c1c; padding-top: 16px; font-size: 10px; color: #444444; text-align: center;">
                  Portfolio Contact Engine
                </div>
              </div>
            </div>
          `,
        }),
      });
    } catch (err) {
      console.error('Failed to send Resend email:', err);
    }
  }

  // 2. Discord Webhook Notification (Instant Phone Alert)
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhookUrl) {
    try {
      await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [
            {
              title: '🔴 Urgent Notification',
              description: 'A person is trying to contact you through your developer portfolio contact form — respond immediately.',
              color: 15548997, // Discord Alert Red
              fields: [
                {
                  name: 'Name',
                  value: name || 'N/A',
                  inline: true,
                },
                {
                  name: 'Email',
                  value: email || 'N/A',
                  inline: true,
                },
                {
                  name: 'Message',
                  value: message || 'N/A',
                },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    } catch (err) {
      console.error('Failed to send Discord webhook:', err);
    }
  }

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updateData } = body;

  const { data, error } = await supabaseAdmin
    .from('contact_messages')
    .update(updateData)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('contact_messages')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}