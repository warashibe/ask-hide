import React from "react";
import { createAnonymousActors } from "@/ic/actor";
import Spinner from "@/components/Spinner";
import { useWeb3React } from "@web3-react/core";
import EthAccount from "@/components/EthAccount";

interface Props {
  id: string;
  }

export default function Component({id}: Props) 
{
  const  actors = createAnonymousActors();
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
  const handleCheckBoxChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setUseEthAdd(event.currentTarget.checked);
  }

  const resetForm = () => {
    setPost("");
    setSuccess(false);
    setLoading(false);
    setFinished(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (finished) return;
    if (post.length === 0) return;
    setLoading(true);
    let ethAddressInput = ""
    if(account) ethAddressInput = account;
    actors.wall
      .add_answer(post, name, ethAddressInput, id)
      .then(() => {
        setSuccess(true);
        location.reload();
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
      <textarea className="w-full h-16 mb-2 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-sm focus:shadow-outline"
        placeholder=" Write your answer"
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
        <div className= "mb-3">
          <input
            className = "mb-1 w-3 h-3 ml-3 items-center mx-2"
            type="checkbox"
            value="contain Eth Address"
            name = "useEthAddressCheckBox"
            checked = {useEthAdd}
            onChange ={handleCheckBoxChange}
          />
          <label htmlFor="useEthAddressCheckBox" className="items-center mb-3 text-sm">
          Add Ethereum Address
          </label>
          <div className="mx-4">
          <EthAccount />
          </div>
        </div>
      )}
      
      <button onClick={handleSubmit}
          className=" w-2/3 mb-10 mt-5 p-4 px-8 text-xl font-semibold border border-blue-500 text-white uppercase bg-blue-500 rounded hover:bg-white hover:text-blue-500 disabled:opacity-50 flex mx-auto"
          type="submit"
          disabled={loading}
      > {loading ? (
        <>
          <Spinner />
          Sending
        </>
      ) : finished ? (
        success ? (
          "????????????"
        ) : (
          <span className="text-red-500">???? Error</span>
        )
      ) : (
        <div className="flex mx-auto">Send</div>
      )}
      </button>
    </div>
  );
}
