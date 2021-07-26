import React from "react";
import {AuthClient} from "@dfinity/auth-client";
import {useState} from "react";
import {useEffect} from 'react';
import DfinityIcon from "@/svg/dfinity.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, fas } from '@fortawesome/free-solid-svg-icons'

let authClient: AuthClient;
//let isAuthed: boolean = false;
export default function Component() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [icIdentity, setIcIdentity] = useState("none");
    let buttonClass =
    "px-2 py-1.5 mr-4 text-white bg-blue-500 border border-blue-500 rounded hover:bg-white hover:text-blue-500 ";

    async function AuthedCheck() {
        if(authClient == null){
          authClient = await AuthClient.create();
        }
        let ans = await authClient.isAuthenticated();
        setIsAuthed(ans);
        console.log(isAuthed)
        if(ans){
          setIcIdentity(authClient.getIdentity().getPrincipal().toString());
        }
    }

    function IcAuth(){
      console.log("icauth()")
      authClient.login({
          onSuccess:async()=>{
            setIcIdentity(authClient.getIdentity().getPrincipal().toString());
            setIsAuthed(true);
            console.log("isAuthed", isAuthed);
          },
      })
    };

    function IcLogout(){
      console.log("Iclogout()");
      authClient.logout().then(() =>{
          setIcIdentity("none");
          setIsAuthed(false);
          console.log(icIdentity);
      });
    }

    useEffect(() =>{
      AuthedCheck();
    });

    if(isAuthed){
      return(
        <div>
          <div className="inline-block px-3 py-2 text-base font-semibold text-white uppercase bg-blue-500 rounded-lg">
            <DfinityIcon className="inline-block h-4 pb-1 mr-2" />
              {icIdentity.substring(0, 5)} ...
          </div>
          <button onClick={IcLogout} className="h-5 ml-5 fa5x items-center">
          <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
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
