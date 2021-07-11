import { createAnonymousActors } from "@/ic/actor";
import UserIcon from "@/svg/user-solid.svg";
import { Jazzicon } from "@ukstv/jazzicon-react";

interface Props {
  name: string;
  address: string
}

export default function Component({ name, address}: Props) {
  if (!name) name = "ghost";
  return (
    <div className="text-sm text-blue-500">
      <UserIcon className="inline-block h-4 pb-1 mr-1" />
      {name}
    </div>
  );
}
