import React from "react";
import { HiBadgeCheck } from "react-icons/hi";

export const  PromptComponent = ({ promptTitle,
    promptMessage,
    actionItem,
    closePrompt }) => {

  return (
    <>
        <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" 
        >
        <div className={`relative w-[calc(23%)] my-6 mx-auto`}>
            {/*content*/}
            <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white p-2 outline-none focus:outline-none">
            {/*header*/}
            <div className="flex flex-col items-center justify-end px-5 pt-9 gap-7">
                <HiBadgeCheck size={55} className="text-green-400"/>
                <h1 className=" text-[26px] font-bold">
                    {promptTitle}
                </h1>
            </div>
            {/*body*/}
            <div className="relative px-4 pt-1 pb-4 flex-auto">
                <p className="text-center">
                    {promptMessage}
                    <span className="text-green-600 font-semibold ml-1 ">
                        {actionItem}
                    </span>
                </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-4 w-full gap-2">
                <button className="w-1/2 bg-green-400 shadow-md rounded-full px-5 py-2 font-medium text-white" onClick={closePrompt}>
                    Close
                </button>
            </div>
            </div>
        </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}