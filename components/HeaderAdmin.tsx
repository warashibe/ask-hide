import React from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { injected } from "@/eth/connectors";
import { useEagerConnect, useInactiveListener } from "@/eth/hooks";
import AskBtn from "@/components/AskBtn"
import Link from "next/link";
import ICPrincipal from "@/components/header/ICPrincipal";
import ICLogin from "@/components/header/ICLogin";
import ICAuth from "@/components/header/ICAuth";

export default function Component() {

  return (
    <div>    
      <header className="flex justify-between itens-center h-16 px-8">
            <p className="flex items-center text-3xl font-bold text-blue-500 justfy-start">
                <Link href="/"><a>ASK HiÐΞ</a></Link>
            </p>

              <div className="flex items-center justify-ends">
                <div>
                  <ICAuth />             
                </div>
              </div>
      </header>
      <hr className="border-1"/>
    </div>
  );
}
