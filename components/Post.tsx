import React from "react";
import { useInternetComputer } from "@/ic/context";
import Spinner from "@/components/Spinner";
import { useWeb3React } from "@web3-react/core";
import { getUserProfile } from "@/store/actions/profile";
import router from "next/router";

export default function Component() {
  const { actors, principal } = useInternetComputer();
  // const [profileFinished, profileResult] = getUserProfile.useBeckon({
  //   actors,
  //   principal,
  // });
  const { account } = useWeb3React();

  const [post, setPost] = React.useState("");
  const [name, setName] = React.useState("");
  const [useEthAdd, setUseEthAdd] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  
  const handlePostChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.value.length > 255) return;
    setPost(event.currentTarget.value);
  };
  const handleNameChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.value.length > 20) return;
    setName(event.currentTarget.value);
  };
  const handleCheckBoxChange = (event: React.FocusEvent<HTMLInputElement>) =>{
    setUseEthAdd(event.currentTarget.checked);
  }

  const resetForm = () => {
    setPost("");
    setName("");
    setSuccess(false);
    setLoading(false);
    setFinished(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (finished) return;
    if (post.length === 0) return;
    setLoading(true);
    let accountInput = "";
    if(account && useEthAdd){
      accountInput = account;
    }
    actors.wall
      .write(post, name, accountInput)
      .then(() => {
        actors.wall.get().then((resp: string) => {
        });
        setSuccess(true);
        router.push("/");
      })
      .catch((error: any) => {
        setSuccess(false);
      })
      .finally(() => {
        resetForm();
      });
  };

  return (
    <div className="mb-10">
      <textarea className="w-full h-16 mb-2 px-2 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-sm focus:shadow-outline"
        placeholder=" Write question"
        disabled={loading}
        onChange={handlePostChange}
        value={post}
      ></textarea>
     <div className="flex items-center justify-start h-full">
      <textarea className="w-50 h-10 mb-5 px-2 py-1 text-gray-700 placeholder-gray-600 border rounded-sm focus:shadow-outline flex-none"
        placeholder=" Write name"
        disabled={loading}
        onChange={handleNameChange}
        value={name}
      ></textarea>
      {(account) &&(
        <label htmlFor="useEthAddressCheckBox" className="mb-5 px-7">
          Add Ethereum Address
          <input
            className = "mb-1 w-5 h-5 ml-3"
            type="checkbox"
            value="contain Eth Address"
            name = "useEthAddressCheckBox"
            checked = {useEthAdd}
            onChange ={handleCheckBoxChange}
        ></input>
         </label>)
      }
      </div>
      <button onClick={handleSubmit}
          className=" w-full mb-10 mt-5 p-4 px-8 text-xl font-semibold text-blue-900 uppercase bg-blue-300 rounded-sm hover:bg-yellow-200 disabled:opacity-50"
          type="submit"
          disabled={loading}
      > {loading ? (
        <>
          <Spinner />
          Sendingss
        </>
      ) : finished ? (
        success ? (
          "👍👍👍"
        ) : (
          <span className="text-red-500">🤖 Error</span>
        )
      ) : (
        "Send"
      )}
      </button>
    </div>
  );
}
