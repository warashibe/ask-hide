import React from "react";
import {AuthClient} from "@dfinity/auth-client";
import {useState} from "react";
import DfinityIcon from "@/svg/dfinity.svg";

let authClient: AuthClient;
//let isAuthed: boolean = false;
export default function Component() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [icIdentity, setIcIdentity] = useState("none");
    let buttonClass =
    "px-2 py-1.5 mr-4 text-white bg-blue-500 border border-blue-500 rounded hover:bg-white hover:text-blue-500 ";

    async function AuthedCheck() {
        console.log("AuthCheck()");
        if(authClient == null){
          authClient = await AuthClient.create();
        }
        let ans = await authClient.isAuthenticated();
        return ans;
    }

    async function IcAuth(){
      if(authClient == null){
        authClient = await AuthClient.create();
      }
      authClient.login({
          onSuccess:async()=>{
              console.log("onSuccess")
              setIcIdentity(authClient.getIdentity().getPrincipal().toString());
              console.log(icIdentity);
              setIsAuthed(true);
              console.log("isAuthed", isAuthed)
          },
      })
    };
    AuthedCheck().then((ret:any) => {
      setIsAuthed(ret);
      setIcIdentity(authClient.getIdentity().getPrincipal().toString());
    })
    console.log("isAuthed", isAuthed)
  

    if({isAuthed}){
      return(
        <div className="inline-block px-3 py-2 text-base font-semibold text-white uppercase bg-blue-500 rounded-lg">
          <DfinityIcon className="inline-block h-4 pb-1 mr-2" />
            {icIdentity.substring(0, 5)} ...
        </div>
      )
    }
    else{
      return(
        <div>
          <button className={buttonClass} onClick={IcAuth}>
            IC Auth
          </button>
        </div>
      )
    }
}
