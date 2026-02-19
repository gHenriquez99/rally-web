const DEFAULT_APP_STORE_ID = "6759177501";

export const APP_STORE_ID =
  process.env.NEXT_PUBLIC_APP_STORE_ID ?? DEFAULT_APP_STORE_ID;

export const APP_STORE_URL = `https://apps.apple.com/app/rally/id${APP_STORE_ID}`;
