import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Wall from "@/components/Wall";

export default function Home() {
  const [search, setSearch] = React.useState("");

  if (typeof window === "undefined") return null;

  const handleChange =(event: any) =>{
    setSearch(event.target.value)
  };

  const handleSubmit = (event: any) =>{
    event.preventDefault();
  };
 
  return (
    <div className="bg-white-500">
      <Head>
        <title>ASK HiÐΞ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
        <div className="w-2/3 flex container mx-auto">
          <img src="ask.png" className="mt-6 mx-auto"/>
        </div>
        <div className="text-center">
          <div className="text-6xl mb-10">
          ASK HiÐΞ
          </div>
        </div>
        <div className="text-center text-red-500 mb-5">
          ベーター運用中<br/>
          不定期に停止する可能性があります<br/>
        </div>
        <form className="w-2/3 flex border border-gray-700 rounded-full primary-bg-600 container mx-auto" id="search-bar" onSubmit={handleSubmit}>
          <span className="inline-flex items-center px-3 text-sm my-2 sm:ml-2">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
          </span>
          <input className=" rounded-r-full focus:outline-none flex-1 block w-full rounded-none sm:text-sm border-gray-700 cursor-pointer focus:border-gray-700 bg-blue-200 p-2 text-black" placeholder="search" onChange={handleChange} />
        </form>
        <div className="pt-10 pb-10 bg-right-top bg-no-repeat bg-contain sm:pb-32">
          <div className="text-xl wall-container">            
            <hr/>
            <Wall search={search} />
          </div>
        </div>
      </main>
    </div>
  );
}
