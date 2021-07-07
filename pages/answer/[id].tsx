import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import WallAnswer from "@/components/WallAnswer"
import router, { useRouter } from "next/router";

export default function ask() {
  const router = useRouter();
  const id =  router.query.id as string;
 
  if (typeof window === "undefined") return null;

  return (
    <div className="bg-white-500">
      <Head>
        <title>AKS HiÐΞ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="mb-10" />
        <div className="text-xl wall-container">
          <WallAnswer id={id} />
        </div>
      </main>
    </div>
  );
}
