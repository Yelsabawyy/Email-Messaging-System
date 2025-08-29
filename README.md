# Email Messaging System

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- Send emails to multiple recipients using a REST API ([`app/api/send-email/route.ts`](app/api/send-email/route.ts))
- Uses [Nodemailer](https://nodemailer.com/about/) for email delivery
- Built with Next.js App Router

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Usage

Send a POST request to `/api/send-email` with the following JSON body:

```json
{
  "subject": "Your Subject",
  "emails": ["recipient1@example.com", "recipient2@example.com"],
  "message": "Your message here"
}
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Nodemailer Documentation](https://nodemailer.com/about/)

## Deploy

Deploy easily on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For more details, see