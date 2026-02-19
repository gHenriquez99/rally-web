import { NextResponse, type NextRequest } from "next/server";

import {
  INVITE_PREVIEW_REASON_HEADER,
  INVITE_PREVIEW_STATE_HEADER,
  SUPABASE_HOST_HEADER,
} from "@/lib/invite-preview-debug";

const PAGE_DEBUG_HEADERS = [
  INVITE_PREVIEW_STATE_HEADER,
  INVITE_PREVIEW_REASON_HEADER,
  SUPABASE_HOST_HEADER,
] as const;

export const config = {
  matcher: ["/e/:token"],
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const debugProbeUrl = new URL(`${request.nextUrl.pathname}/og`, request.url);
  debugProbeUrl.searchParams.set("__debug_probe", "1");

  try {
    const ogProbeResponse = await fetch(debugProbeUrl, {
      method: "HEAD",
      redirect: "manual",
    });

    for (const headerName of PAGE_DEBUG_HEADERS) {
      const headerValue = ogProbeResponse.headers.get(headerName);
      if (headerValue) {
        response.headers.set(headerName, headerValue);
      }
    }
  } catch {
    // Best-effort debug instrumentation should not block invite page responses.
  }

  return response;
}
