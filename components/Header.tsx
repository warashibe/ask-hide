import React from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { injected } from "@/eth/connectors";
import { useEagerConnect, useInactiveListener } from "@/eth/hooks";
import UserName from "@/components/header/Username";
import EthAccount from "@/components/header/EthAccount";
import BrickwallIcon from "@/svg/brick-wall.svg";
import MetamaskIcon from "@/svg/metamask.svg";
import AskBtn from "@/components/header/AskBtn"
import Link from "next/link";
import ClearBtn from "@/components/ClearBtn"

export default function Component() {
  const {
    error: ethError,
    connector: ethConnector,
    activate: ethActivate,
  } = useWeb3React();

  // Attempt to activate pre-existing connection
  const triedEager = useEagerConnect();

  // Marks which ethConnector is being activated
  const [activatingConnector, setActivatingConnector] = React.useState<
    InjectedConnector | undefined
  >(undefined);

  const activating = injected === activatingConnector;
  const connected = injected === ethConnector;
  const connectDisabled = !triedEager || activating || connected || !!ethError;

  // Listen to and react to network events
  useInactiveListener(!triedEager || !!activatingConnector);

  // handle logic to recognize the ethConnector currently being activated
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === ethConnector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, ethConnector]);

  let ethButtonClass =
    "inline-block px-3 py-2 text-base font-semibold uppercase rounded-lg focus:outline-none " +
    (ethError
      ? "bg-red-700 hover:bg-red-700 text-white"
      : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-green-900");

  return (
    <nav>
      <div className="px-2 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-6">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0 text-3xl font-bold text-blue-500 ">
                <Link href="/">ASK HiÐΞ</Link>
            </div>
            <div className="hidden sm:block sm:ml-6 sm:w-full ">
              <div className="flex items-center justify-end h-full">
                <div>
                  <AskBtn />                  
                  <EthAccount />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-1"/>
    </nav>
  );
}
