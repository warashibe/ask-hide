import { useInternetComputer } from "@/ic/context";
import { getUserProfile } from "@/store/actions/profile";

import UserIcon from "@/svg/user-solid.svg";

export default function Component() {
  const { actors, principal } = useInternetComputer();

  const [finished, result] = getUserProfile.useBeckon({ actors, principal });

  if (finished && result?.payload?.name)
    return (
      <div className="inline-block px-2 py-1.5 mr-4 text-white lowercase bg-blue-500 rounded">
        <UserIcon className="inline-block h-5 pb-1 mr-2" />
        {result.payload.name}
      </div>
    );
  return null;
}
