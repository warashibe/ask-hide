import React from "react";
import Head from "next/head";
import Post from "@/components/Post"
import Header from "@/components/Header";

export default function ask() {

  if (typeof window === "undefined") return null;

  return (
    <div className="bg-white-500">
      <Head>
        <title>AKS HiÐΞ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
      <div className="text-center text-red-500 m-2">
        </div>
        <div className="h2 text-center text-2xl mb-5"> You can ask about HiÐΞ </div>
        <div className="w-full leading-normal text-black">
            <div className="text-xl wall-container">
                  <Post />
            </div>
          </div>
      </main>
    </div>
  );
}