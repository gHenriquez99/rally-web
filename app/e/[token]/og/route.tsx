import type { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

import {
  fetchEventSharePreview,
  resolveTimeZoneFromHeaders,
} from "@/lib/invite-share-preview";
import { DEFAULT_OG_IMAGE_PATH } from "@/lib/site-metadata";

export const runtime = "edge";

type InviteOgRouteContext = {
  params: Promise<{
    token: string;
  }>;
};

const OG_IMAGE_HEADERS = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
};

const PALETTE = {
  background: "hsl(0 0% 12.9%)",
  foreground: "hsl(0 0% 98%)",
  card: "hsl(0 0% 18.8%)",
  cardForeground: "hsl(0 0% 98%)",
  primary: "hsl(210 95% 72%)",
  primaryForeground: "hsl(210 20% 12%)",
} as const;

function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function truncateAtWordBoundary(text: string, maxChars: number): string {
  const normalized = normalizeText(text);
  if (normalized.length <= maxChars) {
    return normalized;
  }

  const truncated = normalized.slice(0, maxChars + 1);
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  const cutoffIndex =
    lastSpaceIndex > maxChars * 0.6 ? lastSpaceIndex : maxChars;

  return `${truncated.slice(0, cutoffIndex).trimEnd()}...`;
}

function getTitleFontSize(nameLength: number): number {
  if (nameLength > 58) {
    return 52;
  }

  if (nameLength > 38) {
    return 62;
  }

  return 72;
}

function getSecondaryLine(
  formattedDate: string,
  venueName: string | null,
): string {
  if (!venueName) {
    return normalizeText(formattedDate);
  }

  return normalizeText(`${formattedDate} | ${venueName}`);
}

function getShell(content: React.ReactNode) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: `radial-gradient(circle at 12% 8%, hsl(210 95% 72% / 0.2) 0%, ${PALETTE.background} 43%, ${PALETTE.background} 100%)`,
        color: PALETTE.foreground,
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "44px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          borderRadius: "32px",
          border: "1px solid hsl(210 95% 72% / 0.22)",
          background: `linear-gradient(160deg, hsl(0 0% 18.8% / 0.97) 0%, hsl(0 0% 18.8% / 0.88) 100%)`,
          padding: "46px",
          flexDirection: "column",
          justifyContent: "flex-start",
          boxShadow: "0 14px 40px hsl(0 0% 0% / 0.38)",
        }}
      >
        {content}
      </div>
    </div>
  );
}

function getAvailableImage({
  eventName,
  formattedDate,
  venueName,
}: {
  eventName: string;
  formattedDate: string;
  venueName: string | null;
}) {
  const title = truncateAtWordBoundary(eventName, 76);
  const titleFontSize = getTitleFontSize(title.length);
  const secondaryLine = truncateAtWordBoundary(
    getSecondaryLine(formattedDate, venueName),
    92,
  );

  return getShell(
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "11px 18px",
            borderRadius: "999px",
            background: PALETTE.primary,
            color: PALETTE.primaryForeground,
            fontSize: "24px",
            letterSpacing: "0.1em",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Rally Event Invite
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: `52px`,
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: PALETTE.cardForeground,
              maxWidth: "1040px",
              maxHeight: "236px",
              overflow: "hidden",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "48px",
              lineHeight: 1.2,
              color: PALETTE.primary,
              maxWidth: "980px",
              overflow: "hidden",
              fontWeight: 800,
            }}
          >
            {secondaryLine}
          </div>
        </div>
      </div>
    </>,
  );
}

function redirectToDefaultOgImage(request: NextRequest): Response {
  const fallbackImageUrl = new URL(
    DEFAULT_OG_IMAGE_PATH,
    request.url,
  ).toString();

  return new Response(null, {
    status: 307,
    headers: {
      ...OG_IMAGE_HEADERS,
      Location: fallbackImageUrl,
    },
  });
}

export async function GET(
  request: NextRequest,
  { params }: InviteOgRouteContext,
) {
  const { token } = await params;
  const timeZone = resolveTimeZoneFromHeaders(request.headers);
  const preview = await fetchEventSharePreview(token, { timeZone });

  if (preview.state === "unavailable") {
    return redirectToDefaultOgImage(request);
  }

  return new ImageResponse(
    getAvailableImage({
      eventName: preview.eventName,
      formattedDate: preview.formattedDate,
      venueName: preview.venueName,
    }),
    {
      width: 1200,
      height: 630,
      headers: OG_IMAGE_HEADERS,
    },
  );
}
