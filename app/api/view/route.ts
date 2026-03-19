import { Redis } from "@upstash/redis";
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

const VIEW_WINDOW_SECONDS = 60 * 60;
const TOTAL_VIEWS_KEY = "portfolio:views:total";

function getRedisClient() {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }

  return Redis.fromEnv();
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function getVisitorId(request: Request) {
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const salt = process.env.VIEWER_SALT ?? "w4whiskers-portfolio";

  return createHash("sha256")
    .update(`${ip}:${userAgent}:${salt}`)
    .digest("hex");
}

export async function GET(request: Request) {
  const redis = getRedisClient();

  if (!redis) {
    return NextResponse.json(
      { enabled: false, totalViews: null },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const visitorId = getVisitorId(request);
    const visitorKey = `portfolio:views:visitor:${visitorId}`;

    const firstVisitInWindow = await redis.set(visitorKey, "1", {
      ex: VIEW_WINDOW_SECONDS,
      nx: true,
    });

    if (firstVisitInWindow === "OK") {
      await redis.incr(TOTAL_VIEWS_KEY);
    }

    const totalViews = await redis.get<number>(TOTAL_VIEWS_KEY);

    return NextResponse.json(
      {
        enabled: true,
        totalViews: typeof totalViews === "number" ? totalViews : 0,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { enabled: false, totalViews: null },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
