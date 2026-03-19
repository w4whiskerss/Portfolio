import HomeContent from "@/components/HomeContent";

const channelUrl = "https://www.youtube.com/@W4Whiskers1";
const socialCountsBaseUrl = "https://api.socialcounts.org/youtube-live-subscriber-count";

type ChannelStats = {
  name: string;
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  url: string;
};

const fallbackChannelStats: ChannelStats = {
  name: "@W4Whiskers1",
  subscriberCount: "YouTube loading",
  viewCount: "Stats unavailable",
  videoCount: "Channel live",
  url: channelUrl,
};

function decodeYouTubeText(raw: string | undefined) {
  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(`"${raw.replace(/"/g, '\\"')}"`) as string;
  } catch {
    return raw;
  }
}

function formatCompactCount(value: number | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return undefined;
  }

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: value >= 1000 ? 1 : 0,
  }).format(value);
}

async function getChannelStats(): Promise<ChannelStats> {
  try {
    const response = await fetch(`${channelUrl}/about`, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return fallbackChannelStats;
    }

    const html = await response.text();
    const name =
      decodeYouTubeText(
        html.match(/channelMetadataRenderer\":\{\"title\":\"([^\"]+)\"/)?.[1],
      ) ?? fallbackChannelStats.name;
    const channelId =
      decodeYouTubeText(
        html.match(/"channelId":"([^"]+)"/)?.[1] ??
          html.match(/"externalId":"([^"]+)"/)?.[1],
      ) ?? undefined;

    if (!channelId) {
      return {
        ...fallbackChannelStats,
        name: name.startsWith("@") ? name : `@${name}`,
      };
    }

    const liveStatsResponse = await fetch(
      `${socialCountsBaseUrl}/${encodeURIComponent(channelId)}`,
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        },
        next: { revalidate: 300 },
      },
    );

    const liveStats = liveStatsResponse.ok
      ? ((await liveStatsResponse.json()) as {
          counters?: {
            api?: {
              subscriberCount?: number;
              viewCount?: number;
              videoCount?: number;
            };
            estimation?: {
              subscriberCount?: number;
              viewCount?: number;
              videoCount?: number;
            };
          };
        })
      : undefined;

    const apiCounts = liveStats?.counters?.api;
    const estimatedCounts = liveStats?.counters?.estimation;
    const subscriberCount =
      formatCompactCount(
        apiCounts?.subscriberCount ?? estimatedCounts?.subscriberCount,
      ) ?? fallbackChannelStats.subscriberCount;
    const viewCount =
      formatCompactCount(apiCounts?.viewCount ?? estimatedCounts?.viewCount) ??
      fallbackChannelStats.viewCount;
    const videoCount =
      formatCompactCount(apiCounts?.videoCount ?? estimatedCounts?.videoCount) ??
      fallbackChannelStats.videoCount;

    return {
      name: name.startsWith("@") ? name : `@${name}`,
      subscriberCount,
      viewCount,
      videoCount,
      url: channelUrl,
    };
  } catch {
    return fallbackChannelStats;
  }
}

export default async function Home() {
  const channelStats = await getChannelStats();

  return <HomeContent channelStats={channelStats} />;
}
