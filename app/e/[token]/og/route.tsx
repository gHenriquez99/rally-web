import type { NextRequest } from "next/server";

import { DEFAULT_OG_IMAGE_PATH } from "@/lib/site-metadata";

export const runtime = "edge";

const OG_IMAGE_HEADERS = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
};

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

export async function GET(request: NextRequest) {
  return redirectToDefaultOgImage(request);
}
