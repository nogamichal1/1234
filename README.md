# HOGS CRM – Starter

Next.js 14 (App Router) + Firebase Auth + Tailwind + TypeScript.

## Development

```bash
pnpm install       # or npm / yarn
cp .env.local.example .env.local
# fill NEXT_PUBLIC_FIREBASE_APP_ID
pnpm dev
```

## Deploy to Vercel
1. Import this repository.
2. Set environment variables from `.env.local.example`.
3. Deploy – gotowe!


## Vercel env checklist
| Key | Example value |
|-----|---------------|
| NEXT_PUBLIC_FIREBASE_API_KEY | AIzaSyBp53ZGr1C0WZldw7XghfxZics2fOcushs |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | hogs-crm.firebaseapp.com |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | hogs-crm |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | hogs-crm.appspot.com |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | 313138877652 |
| NEXT_PUBLIC_FIREBASE_APP_ID | 1:313138877652:web:abcd1234 |


## MySQL configuration
This project now stores contractors in the MySQL database provided:
```
DATABASE_URL=mysql://root:da2xY2vyCVrxlb2Q@54.38.137.2:3706/kontrahenci_db
```
Make sure the schema exists and run `pnpm prisma generate` or `npx prisma db push` to create tables before first start.
