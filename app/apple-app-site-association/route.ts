import { NextResponse } from "next/server";

import { getAppleAppSiteAssociation } from "@/lib/apple-app-site-association";

const AASA_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=300, must-revalidate",
};

export function GET() {
  return NextResponse.json(getAppleAppSiteAssociation(), {
    headers: AASA_HEADERS,
  });
}
