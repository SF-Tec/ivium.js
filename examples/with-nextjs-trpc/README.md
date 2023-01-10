# Ivium.js + Next.js + tRPC

This example shows how you can make a fullstack app that uses Ivium.js on the backend by combining [Next.js](https://nextjs.org) with the typed queries of [tRPC](https://trpc.io). With tRPC we can make calls from our client code that in turn execute Ivium.js and allow us to interact with IviumSoft.

## Setup

Copy this folder (with-nextjs-trpc) and paste it somewhere in your machine. Afterwards execute the following commands:

```bash
cd with-nextjs-trpc
npm i
npm run dev
```

## Development

```bash
npm run dev        # starts next.js in development mode
```
### Production

```bash
npm run build
npm run start        # starts next.js in production mode
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
