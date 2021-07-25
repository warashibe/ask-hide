import React from "react";
import Head from "next/head";
import HeaderAdmin from "@/components/HeaderAdmin"

export default function Home() {
  if (typeof window === "undefined") return null;

  return (
    <div className="bg-white-500">
      <Head>
        <title>Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderAdmin />
      <main>
         <h1 className="text-center text-5xl m-10">Admin page</h1>
      </main>
    </div>
  );
}
