import ToasrProvider from "@/providers/ToasrProvider";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head aria-description="wellcome to Vision.io">
        <title>Vision.io</title>
      </Head>
      <ToasrProvider />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
