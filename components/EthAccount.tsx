import { Jazzicon } from "@ukstv/jazzicon-react";
import { useWeb3React } from "@web3-react/core";

export default function Component() {
  const { connector, account } = useWeb3React();

  if (account){
    return (
      <div className="inline-block py-1.5 text-sm text-blue-500 lowercase items-center">
        <div
          style={{ width: "12px", height: "12px" }}
          className="inline-block mr-2"
        >
          <Jazzicon address={account} />
        </div>
        {account.substring(0, 6)}...
        {account.substring(account.length - 6)} {" "}
      </div>
    );
  }
  else
  {
    return (
      <div className="px-3 py-1.5 text-blue-500 text-sm border border-blue-500 bg-white-500 rounded">
        No Address founded
      </div>
    );
  }
  return null;
}
