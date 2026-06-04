# Alpha Alpha Upsilon Chapter — Sigma Nursing Landing Site

Next.js landing site for **Sigma Nursing — Alpha Alpha Upsilon Chapter (#5940)** at Obafemi Awolowo University. Features dynamic events (Firebase), registration with Paystack payments, and CSV-friendly registration exports.

**Rebrand in one place:** edit [`src/config/site.ts`](src/config/site.ts).

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Firebase Firestore + Admin SDK
- Paystack (payments + webhooks)
- Framer Motion (animations)
- Email: stub by default; optional [Firebase Trigger Email](https://extensions.dev/extensions/firebase/firestore-send-email) extension

## Getting started

```bash
npm install
cp .env.example .env.local
# Add firebase-service-account.json and fill .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, features, events preview |
| `/events` | Events list + registration modal + Paystack |
| `/about` | About the chapter |

## Firebase setup

1. Enable **Firestore** in [Firebase Console](https://console.firebase.google.com).
2. Deploy security rules from [`firebase/firestore.rules`](firebase/firestore.rules) (Console → Firestore → Rules, or `firebase deploy --only firestore:rules`).
3. Create composite index: collection `events`, fields `status` (Ascending) + `startDate` (Ascending) — or deploy [`firebase/firestore.indexes.json`](firebase/firestore.indexes.json).
4. Add and publish events in **Firebase Console** → Firestore → `events` collection (`status: "published"`).

### Export registrations as CSV

Firebase Console → Firestore → `registrations` collection → **Export collection**. Fields are flat scalars for easy CSV import.

## Paystack setup

1. Add `PAYSTACK_SECRET_KEY` and `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` to `.env.local`.
2. Set webhook URL to `https://YOUR_DOMAIN/api/webhooks/paystack` (use [ngrok](https://ngrok.com) for local testing).
3. Enable `charge.success` events on the webhook.

Flow: form submit → Firestore registration → Paystack checkout → webhook updates status → email (stub or extension).

## Email (optional)

Default: `EMAIL_PROVIDER=stub` (logs to server console).

To enable real email via Firebase Extension:

1. Upgrade Firebase to **Blaze** plan.
2. Install **Trigger Email from Firestore** extension.
3. Configure SMTP (e.g. SendGrid free tier: 100 emails/day).
4. Set `EMAIL_PROVIDER=firebase_extension` in `.env.local`.

## Environment variables

See [`.env.example`](.env.example). Never commit `.env.local` or `firebase-service-account.json`.

### Vercel

1. Import the GitHub repo on [vercel.com](https://vercel.com).
2. Add all `NEXT_PUBLIC_*` variables from `.env.local`.
3. **Firebase Admin:** add `FIREBASE_SERVICE_ACCOUNT_JSON` with the **entire** contents of `firebase-service-account.json` (one variable — do not use the file path on Vercel).
4. Set `NEXT_PUBLIC_SITE_URL` to your Vercel URL after the first deploy, then redeploy.
5. Paystack webhook: `https://YOUR-VERCEL-URL/api/webhooks/paystack`

Local development can keep using `FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json` instead.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |

## License

Private — chapter use.
