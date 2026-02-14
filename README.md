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
