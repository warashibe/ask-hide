import React from "react";
import Head from "next/head";
import { useInternetComputer } from "@/ic/context";
import Header from "@/components/Header";
import { useWeb3React } from "@web3-react/core";

export default function Home() {

  if (typeof window === "undefined") return null;
  

  return (
    <div className="bg-white-500">
    <Head>
        <title>ASK HiÐΞ</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <div className="container mx-auto mt-20 ml-20 mr-10">
      <form method="get" action="#" className="box-border">
        <input type="text" placeholder="　キーワード検索" className="h-10 fous: outline-0 rounded mr-3"/>
        <input type="submit" value="検索" className="cursor-pointer border-none bg-blue-500 h-10 w-10 rounded"/>
      </form>
    </div>
    </div>
  );
}
