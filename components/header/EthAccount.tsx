import { Jazzicon } from "@ukstv/jazzicon-react";
import { useWeb3React } from "@web3-react/core";
import { isConnected } from "@/eth/connectors";

export default function Component() {
  const { connector, account } = useWeb3React();

  if (isConnected(connector) && account)
    return (
      <div className="inline-block px-2 py-1.5 mr-4 text-white lowercase bg-blue-500 rounded">
        <div
          style={{ width: "12px", height: "12px" }}
          className="inline-block mr-2"
        >
          <Jazzicon address={account} />
        </div>
        {account.substring(0, 4)}...
        {account.substring(account.length - 3)} {" "}
      </div>
    );

  return null;
}
