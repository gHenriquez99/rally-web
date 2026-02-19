import type { Metadata } from "next";
import { headers } from "next/headers";

import InviteRedirect from "./invite-redirect";
import { APP_STORE_URL } from "@/lib/app-store";
import {
  fetchEventSharePreview,
  getInviteFallbackMetadata,
  resolveTimeZoneFromHeaders,
} from "@/lib/invite-share-preview";
import { DEFAULT_OG_IMAGE_PATH, SITE_TITLE } from "@/lib/site-metadata";

type InvitePageProps = {
  params: Promise<{
    token: string;
  }>;
};

const INVITE_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

function getInvitePath(token: string): string {
  return `/e/${encodeURIComponent(token)}`;
}

export async function generateMetadata({
  params,
}: InvitePageProps): Promise<Metadata> {
  const { token } = await params;
  const requestHeaders = await headers();
  const timeZone = resolveTimeZoneFromHeaders(requestHeaders);
  const preview = await fetchEventSharePreview(token, { timeZone });

  const invitePath = getInvitePath(token);

  if (preview.state === "unavailable") {
    const fallback = getInviteFallbackMetadata();

    return {
      title: fallback.title,
      description: fallback.description,
      robots: INVITE_ROBOTS,
      openGraph: {
        title: fallback.title,
        description: fallback.description,
        url: invitePath,
        siteName: "Rally",
        type: "website",
        images: [
          {
            url: fallback.imagePath,
            width: 1200,
            height: 630,
            alt: SITE_TITLE,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: fallback.title,
        description: fallback.description,
        images: [fallback.imagePath],
      },
    };
  }

  const description = preview.venueName
    ? `${preview.formattedDate} | ${preview.venueName}`
    : preview.formattedDate;
  const inviteTitle = `Rally Invite Link For ${preview.eventName}`;

  return {
    title: inviteTitle,
    description,
    robots: INVITE_ROBOTS,
    openGraph: {
      title: inviteTitle,
      description,
      url: invitePath,
      siteName: "Rally",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: SITE_TITLE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: inviteTitle,
      description,
      images: [DEFAULT_OG_IMAGE_PATH],
    },
  };
}

export default async function InvitePage() {
  return <InviteRedirect appStoreUrl={APP_STORE_URL} />;
}
