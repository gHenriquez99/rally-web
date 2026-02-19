import type { Metadata } from "next";
import { headers } from "next/headers";

import InviteRedirect from "./invite-redirect";
import { APP_STORE_URL } from "@/lib/app-store";
import {
  fetchEventSharePreview,
  getInviteUnavailableMetadata,
  resolveTimeZoneFromHeaders,
} from "@/lib/invite-share-preview";

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

function getInviteOgPath(token: string): string {
  return `/e/${encodeURIComponent(token)}/og`;
}

export async function generateMetadata({
  params,
}: InvitePageProps): Promise<Metadata> {
  const { token } = await params;
  const requestHeaders = await headers();
  const timeZone = resolveTimeZoneFromHeaders(requestHeaders);
  const preview = await fetchEventSharePreview(token, { timeZone });

  const invitePath = getInvitePath(token);
  const inviteOgPath = getInviteOgPath(token);

  if (preview.state === "unavailable") {
    const fallback = getInviteUnavailableMetadata();

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
            url: inviteOgPath,
            width: 1200,
            height: 630,
            alt: "Rally invite unavailable",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: fallback.title,
        description: fallback.description,
        images: [inviteOgPath],
      },
    };
  }

  const description = `${preview.formattedDate} | ${preview.venueName}`;

  return {
    title: preview.eventName,
    description,
    robots: INVITE_ROBOTS,
    openGraph: {
      title: preview.eventName,
      description,
      url: invitePath,
      siteName: "Rally",
      type: "website",
      images: [
        {
          url: inviteOgPath,
          width: 1200,
          height: 630,
          alt: `${preview.eventName} invite`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: preview.eventName,
      description,
      images: [inviteOgPath],
    },
  };
}

export default async function InvitePage() {
  return <InviteRedirect appStoreUrl={APP_STORE_URL} />;
}
