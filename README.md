This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Shiprocket Checkout

Add these values to `.env.local` before testing checkout:

```bash
NEXT_PUBLIC_STRAPI_URL=http://127.0.0.1:1337
SHIPROCKET_EMAIL=your_api_user_email
SHIPROCKET_PASSWORD=your_api_user_password
SHIPROCKET_PICKUP_LOCATION=Coimbatore Warehouse
```

Create the API user from the Shiprocket dashboard under Settings > API > Add New API User. The pickup location must exactly match a pickup location configured in Shiprocket.

## Render Strapi Deploy

For the backend service on Render, use Supabase's pooler connection string instead of the direct database URL. Render may not be able to reach Supabase's direct IPv6-only database host, which causes `connect ENETUNREACH ... :5432` during `strapi start`.

In Supabase, copy the Transaction Pooler or Session Pooler URI from Project Settings > Database > Connection string. Put that value in Render as:

```bash
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
HOST=0.0.0.0
PORT=10000
```

Keep the existing Strapi secret env vars (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`, and `JWT_SECRET`) set in Render too.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
