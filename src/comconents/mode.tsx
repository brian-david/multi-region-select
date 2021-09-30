import React from "react";
import { useStore } from "react-redux";

export const Mode = () => {
   const store = useStore();
   if (store.getState().drawState.value){
      return (
         <h1>Drawing Mode</h1>
      )
   }else{
      return(
         <h1>Editing Mode</h1>
      )
   }
}