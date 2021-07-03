import { createAnonymousActors } from "@/ic/actor";
import UserIcon from "@/svg/user-solid.svg";

interface Props {
  user: string;
}

export default function Component({ user}: Props) {
  const actors = createAnonymousActors();
    return (
      <div className="text-sm text-blue-700">
        <UserIcon className="inline-block h-4 pb-1 mr-1" />
        {user}
      </div>
    );
}
