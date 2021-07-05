import React from "react";
import Head from "next/head";

export default function Home() {
  if (typeof window === "undefined") return null;

  return (
    <div className="bg-white-500">
      <Head>
        <title>Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        under oonstruction
      </main>
    </div>
  );
}
