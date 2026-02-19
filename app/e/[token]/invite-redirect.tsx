"use client";

import { useEffect } from "react";

type InviteRedirectProps = {
  appStoreUrl: string;
};

export default function InviteRedirect({ appStoreUrl }: InviteRedirectProps) {
  useEffect(() => {
    window.location.replace(appStoreUrl);
  }, [appStoreUrl]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f0f9ff_0%,_#ffffff_45%,_#f8fafc_100%)] px-6 py-12 text-slate-900">
      <section className="mx-auto flex min-h-[75vh] w-full max-w-lg flex-col justify-between rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl shadow-sky-100 backdrop-blur">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">
            Rally Invite
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight text-slate-900">
              Opening Rally
            </h1>
            <p className="text-sm leading-6 text-slate-600">
              If Rally is installed, your invite opens in the app. Otherwise,
              you will be redirected to the App Store.
            </p>
          </div>
        </div>

        <a
          href={appStoreUrl}
          className="mt-12 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Continue to App Store
        </a>
      </section>
    </main>
  );
}
