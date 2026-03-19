import { NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL?.trim();

function isConfiguredWebhook(url: string | undefined) {
  if (!url) {
    return false;
  }

  return (
    url.startsWith("https://discord.com/api/webhooks/") &&
    !url.includes("YOUR_DISCORD_WEBHOOK_URL_HERE")
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: unknown;
      message?: unknown;
    };

    const email =
      typeof body.email === "string" ? body.email.trim().slice(0, 160) : "";
    const message =
      typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";

    if (!email || !message) {
      return NextResponse.json(
        { message: "Email and message are required." },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { message: "Enter a valid email address." },
        { status: 400 },
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { message: "Message should be at least 10 characters." },
        { status: 400 },
      );
    }

    if (!isConfiguredWebhook(DISCORD_WEBHOOK_URL)) {
      return NextResponse.json(
        {
          message:
            "Contact form is not connected yet. Add DISCORD_WEBHOOK_URL in Vercel to turn it on.",
        },
        { status: 503 },
      );
    }

    const webhookUrl = DISCORD_WEBHOOK_URL!;
    const forwardedFor = request.headers.get("x-forwarded-for") ?? "unknown";
    const userAgent = request.headers.get("user-agent") ?? "unknown";

    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "New Portfolio Contact",
            color: 0xff8c1a,
            fields: [
              {
                name: "Email",
                value: email,
                inline: false,
              },
              {
                name: "Message",
                value: message,
                inline: false,
              },
              {
                name: "Visitor",
                value: `||IP: ${forwardedFor}||\n||UA: ${userAgent.slice(0, 250)}||`,
                inline: false,
              },
            ],
          },
        ],
      }),
    });

    if (!discordResponse.ok) {
      return NextResponse.json(
        { message: "Discord webhook rejected the request." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message: "Message sent successfully.",
    });
  } catch {
    return NextResponse.json(
      { message: "Could not process your message right now." },
      { status: 500 },
    );
  }
}
