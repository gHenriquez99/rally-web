# Rally Web

Next.js web app for Rally marketing pages and deep-link fallbacks.

## Local development

```bash
npm run dev
```

## Universal Links setup

This repo serves Apple App Site Association (AASA) JSON at:

- `https://rallyapp.app/.well-known/apple-app-site-association`
- `https://rallyapp.app/apple-app-site-association`

### Required environment variables

Set these in your deployment environment (and optionally in `.env.local` for local checks):

```bash
APPLE_TEAM_ID=YOUR_TEAM_ID
NEXT_PUBLIC_APP_STORE_ID=0000000000
```

- `APPLE_TEAM_ID`: your 10-character Apple Team ID from Apple Developer.
- `NEXT_PUBLIC_APP_STORE_ID`: numeric App Store ID for the Rally iOS app.

### Universal Link contract

- Claimed domain: `rallyapp.app`
- iOS bundle ID: `com.rallyapp.app`
- Claimed paths: `/e/*`
- Derived AASA `appID`: `${APPLE_TEAM_ID}.com.rallyapp.app`

### Verify AASA responses

Run these checks after deploy:

```bash
curl -i https://rallyapp.app/.well-known/apple-app-site-association
curl -i https://rallyapp.app/apple-app-site-association
```

Expected:

- HTTP `200 OK`
- `Content-Type: application/json` (charset is fine)
- no redirect
- valid JSON payload with expected `appID` and `paths`

## iOS app-side configuration (outside this repo)

In your iOS app target:

1. Enable `Associated Domains` capability.
2. Add `applinks:rallyapp.app` in entitlements.
3. Ensure signing Team ID + bundle ID match AASA `appID`.
4. Reinstall the app after AASA changes (TestFlight/App Store or uninstall/reinstall).

## Invite link previews (`/e/[token]`)

Invite pages now render dynamic metadata and a dynamic OG image for iMessage/social scrapers using:

- `public.get_event_share_preview(p_share_token text)` (anon-safe RPC)
- `/e/[token]` metadata (`generateMetadata`)
- `/e/[token]/og` image endpoint (`next/og`)

### Verify preview behavior

Replace `<token>` with a real invite share token:

```bash
curl -s https://rallyapp.app/e/<token> | rg -n "og:|twitter:|Invite unavailable"
curl -i https://rallyapp.app/e/<token>/og
```

Check:

- Valid token: metadata includes event name + date + venue, and image points to `/e/<token>/og`.
- Invalid/expired/deleted token: fallback `Invite unavailable` metadata and fallback OG image content.
- Response headers include crawler caching:
  - `Cache-Control: public, s-maxage=300, stale-while-revalidate=86400`
- Invite page is not indexable:
  - metadata robots `noindex,nofollow`
  - `X-Robots-Tag: noindex, nofollow`

### Verify in iMessage

1. Send `https://rallyapp.app/e/<valid-token>` in iMessage.
2. Confirm the card shows the event-specific preview.
3. Repeat with an invalid/expired token and confirm the fallback card.
