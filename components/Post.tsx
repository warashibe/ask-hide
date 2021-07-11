import React from "react";
import Spinner from "@/components/Spinner";
import { useWeb3React } from "@web3-react/core";
import { createAnonymousActors } from "@/ic/actor";
import EthAccount from "@/components/EthAccount";

export default function Component() {
  const actors = createAnonymousActors();
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
        setSuccess(true);
        window.location.href ='/';
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
     <div className="flex items-center h-full">
      <textarea className="w-50 h-10 mb-5 px-2 py-1 text-gray-700 placeholder-gray-600 border rounded-sm focus:shadow-outline flex-none"
        placeholder=" Write name"
        disabled={loading}
        onChange={handleNameChange}
        value={name}
      ></textarea>
      </div>
      {(account) &&(
        <div>
          <div className= "flex">
            <input
            className = "w-4 h-4 items-center"
            type="checkbox"
            value="contain Eth Address"
            name = "useEthAddressCheckBox"
            checked = {useEthAdd}
            onChange ={handleCheckBoxChange}
            />
            <label htmlFor="useEthAddressCheckBox" className="items-center text-sm ml-3">
              Add Ethereum Address as your identity
            </label>
          </div>
          <div>
            <EthAccount />          
          </div>
         </div>
         )
      }
      <button onClick={handleSubmit}
          className=" w-2/3 mb-10 p-4 text-xl text-white uppercase items-center border border-blue-500 bg-blue-500 rounded-sm hover:bg-white hover:text-blue-500 disabled:opacity-50 flex mx-auto"
          type="submit"
          disabled={loading}
      > {loading ? (
        <div className="flex mx-auto">
          <Spinner />
          Sendingss
        </div>
      ) : finished ? (
        success ? (
          "OK"
        ) : (
          <span className="text-red-500">Error</span>
        )
      ) : (
        <div className="flex mx-auto">Send</div>
      )}
      </button>
    </div>
  );
}
