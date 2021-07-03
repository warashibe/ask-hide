import { Jazzicon } from "@ukstv/jazzicon-react";
import { useWeb3React } from "@web3-react/core";

export default function Component() {
  const { connector, account } = useWeb3React();

  if (account){
    return (
      <div className="inline-block px-2 py-1.5 mr-4 text-white lowercase bg-blue-500 rounded">
        <div
          style={{ width: "12px", height: "12px" }}
          className="inline-block mr-2"
        >
          <Jazzicon address={account} />
        </div>
        {account.substring(0, 5)}...
        {account.substring(account.length - 5)} {" "}
      </div>
    );
  }
  else
  {
    return (
      <div className="inline-block px-3 py-1.5 text-blue-500 border border-blue-500 bg-white-500 rounded">
        No Eth Wallet
      </div>
    );
  }
  return null;
}
