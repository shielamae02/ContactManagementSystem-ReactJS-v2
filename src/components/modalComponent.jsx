import React, {useState} from "react";
import { TiWarning } from "react-icons/ti";

export const ModalComponent= ({  modalTitle,
      modalMessage,
      actionItem,
      modalNoMessage,
      modalYesMessage, 
      handleModalClick,
      closeModal }) =>  {

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
                <TiWarning size={45} className="text-red-500"/>
                  <h1 className=" text-[26px] font-bold">
                      { modalTitle }
                  </h1>
              </div>
              {/*body*/}
              <div className="relative px-4 pt-1 pb-4 flex-auto">
                  <p className="text-center">
                      {modalMessage}
                      <span className="text-red-500 font-semibold ml-1 ">
                          {actionItem}
                      </span>?
                  </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-4 w-full gap-2">
                  <button className="w-full bg-gray-100 shadow-md px-5 py-2 rounded-full font-medium" onClick={closeModal}>
                      {modalNoMessage}
                  </button>
                  <button className="w-full bg-red-400 shadow-md rounded-full px-5 py-2 font-medium text-white" onClick={handleModalClick}>
                      {modalYesMessage}
                  </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}