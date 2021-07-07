import { createAnonymousActors } from "@/ic/actor";
import UserIcon from "@/svg/user-solid.svg";
import { Jazzicon } from "@ukstv/jazzicon-react";

interface Props {
  name: string;
  address: string
}

export default function Component({ name, address}: Props) {
  if (!name) return null;
  return (
    <div className="text-sm text-blue-500">
      <UserIcon className="inline-block h-4 pb-1 mr-1" />
      {name}
      <div
        style={{ width: "12px", height: "12px" }}
        className="inline-block ml-3 mr-1"
      >
        <Jazzicon address={address} />
      </div>
      {address.substring(0, 6)}...
      {address.substring(address.length - 4)} {" "}
    </div>
  );
}
