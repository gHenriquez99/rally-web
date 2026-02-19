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

function getShell(content: React.ReactNode) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(circle at 15% 15%, #164e63 0%, #082f49 38%, #0f172a 100%)",
        color: "#e2e8f0",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        padding: "56px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          borderRadius: "28px",
          border: "1px solid rgba(148, 163, 184, 0.25)",
          background:
            "linear-gradient(155deg, rgba(14, 116, 144, 0.28) 0%, rgba(15, 23, 42, 0.75) 74%)",
          padding: "48px",
          flexDirection: "column",
          justifyContent: "space-between",
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
  return getShell(
    <>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          padding: "10px 18px",
          borderRadius: "999px",
          border: "1px solid rgba(125, 211, 252, 0.38)",
          fontSize: "20px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#bae6fd",
        }}
      >
        Rally Invite
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            fontSize: "76px",
            lineHeight: 1.08,
            fontWeight: 700,
            color: "#f8fafc",
            maxHeight: "170px",
            overflow: "hidden",
          }}
        >
          {eventName}
        </div>

        {venueName ? (
          <div
            style={{
              display: "flex",
              gap: "18px",
              fontSize: "32px",
              lineHeight: 1.25,
              color: "#dbeafe",
              flexWrap: "wrap",
            }}
          >
            <span>{formattedDate}</span>
            <span style={{ color: "#7dd3fc" }}>|</span>
            <span>{venueName}</span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              lineHeight: 1.25,
              color: "#dbeafe",
              flexWrap: "wrap",
            }}
          >
            <span>{formattedDate}</span>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "26px",
            color: "#cbd5e1",
          }}
        >
          Join this event on Rally
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "34px",
            fontWeight: 700,
            color: "#f8fafc",
            letterSpacing: "0.02em",
          }}
        >
          Rally
        </div>
      </div>
    </>,
  );
}

function redirectToDefaultOgImage(request: NextRequest): Response {
  const fallbackImageUrl = new URL(DEFAULT_OG_IMAGE_PATH, request.url).toString();

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
