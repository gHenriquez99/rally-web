import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  INVITE_PREVIEW_REASON_HEADER,
  INVITE_PREVIEW_STATE_HEADER,
} from "@/lib/invite-preview-debug";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/site-metadata";

const DEFAULT_TIMEZONE = "UTC";
const TIMEZONE_HEADERS = [
  "x-vercel-ip-timezone",
  "x-time-zone",
  "cf-timezone",
] as const;

export type EventSharePreviewRow = {
  id: string;
  event_name: string | null;
  event_date: string | null;
  venue_name: string | null;
  share_token_expires_at: string | null;
  deleted_at: string | null;
};

export type InvitePreviewState = "available" | "unavailable";

type InviteUnavailableReason =
  | "missing"
  | "deleted"
  | "expired"
  | "invalid"
  | "rpc_error";

type InvitePreviewAvailable = {
  state: "available";
  eventId: string;
  eventName: string;
  eventDateIso: string;
  formattedDate: string;
  venueName: string | null;
};

type InvitePreviewUnavailable = {
  state: "unavailable";
  reason: InviteUnavailableReason;
};

export type InviteSharePreview = InvitePreviewAvailable | InvitePreviewUnavailable;

export function getInviteFallbackMetadata() {
  return {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    imagePath: DEFAULT_OG_IMAGE_PATH,
  };
}

export function getInvitePreviewDebugHeaders(
  preview: InviteSharePreview,
): Record<string, string> {
  if (preview.state === "available") {
    return {
      [INVITE_PREVIEW_STATE_HEADER]: preview.state,
    };
  }

  return {
    [INVITE_PREVIEW_STATE_HEADER]: preview.state,
    [INVITE_PREVIEW_REASON_HEADER]: preview.reason,
  };
}

function toNullableString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
}

function normalizeRow(value: unknown): EventSharePreviewRow | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const row = value as Record<string, unknown>;
  const id = toNullableString(row.id);

  if (!id) {
    return null;
  }

  return {
    id,
    event_name: toNullableString(row.event_name),
    event_date: toNullableString(row.event_date),
    venue_name: toNullableString(row.venue_name),
    share_token_expires_at: toNullableString(row.share_token_expires_at),
    deleted_at: toNullableString(row.deleted_at),
  };
}

function isValidTimeZone(timeZone: string): boolean {
  try {
    Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return true;
  } catch {
    return false;
  }
}

export function resolveTimeZoneFromHeaders(
  headersStore: Pick<Headers, "get">,
): string {
  for (const headerName of TIMEZONE_HEADERS) {
    const timeZoneValue = headersStore.get(headerName);

    if (!timeZoneValue) {
      continue;
    }

    const trimmedValue = timeZoneValue.trim();
    if (trimmedValue && isValidTimeZone(trimmedValue)) {
      return trimmedValue;
    }
  }

  return DEFAULT_TIMEZONE;
}

export function formatEventDateOnly(
  eventDateIso: string,
  timeZone: string,
): string | null {
  const eventDate = new Date(eventDateIso);

  if (Number.isNaN(eventDate.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(eventDate);
}

export async function fetchEventSharePreview(
  shareToken: string,
  options?: {
    timeZone?: string;
    now?: Date;
  },
): Promise<InviteSharePreview> {
  const trimmedToken = shareToken.trim();

  if (!trimmedToken) {
    return { state: "unavailable", reason: "missing" };
  }

  let data: unknown = null;

  try {
    const supabase = getSupabaseServerClient();
    const result = await supabase.rpc("get_event_share_preview", {
      p_share_token: trimmedToken,
    });

    if (result.error) {
      return { state: "unavailable", reason: "rpc_error" };
    }

    data = result.data;
  } catch {
    return { state: "unavailable", reason: "rpc_error" };
  }

  const row = normalizeRow(Array.isArray(data) ? data[0] : data);
  if (!row) {
    return { state: "unavailable", reason: "missing" };
  }

  if (row.deleted_at) {
    return { state: "unavailable", reason: "deleted" };
  }

  const now = options?.now ?? new Date();
  if (row.share_token_expires_at) {
    const expirationDate = new Date(row.share_token_expires_at);
    if (Number.isNaN(expirationDate.getTime()) || expirationDate <= now) {
      return { state: "unavailable", reason: "expired" };
    }
  }

  if (!row.event_name || !row.event_date) {
    return { state: "unavailable", reason: "invalid" };
  }

  const formattedDate = formatEventDateOnly(
    row.event_date,
    options?.timeZone ?? DEFAULT_TIMEZONE,
  );

  if (!formattedDate) {
    return { state: "unavailable", reason: "invalid" };
  }

  return {
    state: "available",
    eventId: row.id,
    eventName: row.event_name,
    eventDateIso: row.event_date,
    formattedDate,
    venueName: row.venue_name,
  };
}
