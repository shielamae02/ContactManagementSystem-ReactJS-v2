import { useState } from 'react';
import { TiWarning } from "react-icons/ti";
import { DeleteUserAccount } from "../../api/userService";
import { RiDeleteBin5Fill } from 'react-icons/ri';


const DeleteAccount = ({ userData }) => {
    const token = sessionStorage.getItem("token");
    const [showModal, setShowModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [confirmationData, setConfirmationData] = useState("");
    const [confirmationError, setConfirmationError] = useState("");


    const handleDeleteAction = async (e) => {
        setShowModal(false);
        setShowPasswordModal(true);
    }
    
    const dbUserDetails = userData.emailAddress + '/' + userData.userName;

    const handleConfirmDeleteAccount = async (e) => {
        e.preventDefault();
        try{
            if (dbUserDetails === confirmationData){
                if (token) {
                    sessionStorage.removeItem("token");
                     window.location.reload();
                    const response = await DeleteUserAccount(token);
                }
            } else {
                setConfirmationError("Invalid user data."); 
            }
        } catch(error){
            console.error(error);
        }
    }


    return (
        <div>
            <h1 className="text-[27px] font-semibold pb-2 flex items-center text-red-500">
                Danger Zone
                <TiWarning className="text-color-500 ml-2" size={30} />
            </h1>
            <div className="py-6 px-4 xl:px-10 bg-white shadow-lg border-4 border-red-500 rounded-2xl flex justify-between items-center font-medium">
                <h1 className="text-gray-800 text-sm 2xl:text-base">
                    Delete this account.
                </h1>
                <div
                    onClick={() => setShowModal(true)}
                    className="flex gap-3 font-medium items-center self-end px-2 xl:px-7 py-3 rounded-lg text-white text-sm xl:text-base bg-red-400 cursor-pointer shadow-xl">
                    <RiDeleteBin5Fill size={26} />
                    Delete account
                </div>
            </div>
            {showModal && (
                <DeleteModal
                    handleCloseModal={() => setShowModal(false)}
                    handleDeleteAction={handleDeleteAction}

                />
            )}
            {showPasswordModal && (
                <ConfirmWithPasswordModal
                    confirmationData={confirmationData}
                    setConfirmationData={setConfirmationData}
                    handleConfirmDeleteAccount={handleConfirmDeleteAccount}
                    setShowPasswordModal={setShowPasswordModal}
                    confirmationError={confirmationError}
                />
            )}
        </div>
    
    )
}

export default DeleteAccount;

export const ConfirmWithPasswordModal = ({ confirmationData, setConfirmationData, handleConfirmDeleteAccount, setShowPasswordModal, confirmationError }) => {
    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
            <div className={`relative xl:w-[calc(30%)] my-6 mx-auto`}>
                <div className="border-4 border-red-500 rounded-xl shadow-lg relative flex flex-col w-full bg-red-50 p-4 outline-none focus:outline-none">
                    <div className="flex flex-col items-center justify-end px-5 pt-9 gap-7">
                        <TiWarning size={55} className="text-red-500" />
                        <h1 className=" text-[28px] font-bold">
                            Confirm Deletion
                        </h1>
                    </div>
                    <div className="relative px-4 py-3 flex-auto w-full">
                        <p className="text-center mb-1">
                            To confirm, please enter email and username. 
                        </p>
                        <p className="text-center text-sm italic">
                            (ex. email@example.com/username)
                        </p>
                        <input
                            name="confirmationData" 
                            value={confirmationData}
                            onChange={(e) => setConfirmationData(e.target.value)}
                            type="text"
                            placeholder="email@example.com/username"
                            className="text-base rounded-lg p-4 m-2 bg-red-100 w-full focus:outline-none focus:border-red-300 border-2 border-red-200"
                        />
                        {confirmationError && (
                            <p className="text-red-500 text-[13px] text-end">{confirmationError}</p> 
                        )}
                    </div>
                    <div className="flex items-center justify-end p-4 w-full gap-2">
                        <button className="w-full bg-gray-100 shadow-md px-5 py-3 rounded-full font-medium" onClick={() => setShowPasswordModal(false)}>
                            Cancel
                        </button>
                        <button className="w-full bg-red-500 shadow-md rounded-full px-5 py-3 font-medium text-white" onClick={handleConfirmDeleteAccount} type="submit">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const DeleteModal = (props) => {
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className={`relative w-[calc(80%)]  2xl:w-[calc(30%)] my-6 mx-auto`}>
                    {/*content*/}
                    <div className="rounded-xl shadow-lg relative flex flex-col w-full border-4 border-red-500 bg-white p-2 outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex flex-col items-center justify-end px-5 pt-9 gap-7">
                            <TiWarning size={55} className="text-red-500" />
                            <h1 className=" text-[26px] font-bold">
                                Permanently Delete Account
                            </h1>
                        </div>
                        {/*body*/}
                        <div className="relative px-4 pt-2 pb-4 flex-auto">
                            <p className="text-center">
                                Are you sure to
                                <span className="text-red-500 font-semibold mx-1.5 ">
                                    permanently delete
                                </span>
                                your account? You
                                <span className="text-red-500 font-semibold mx-1.5 ">
                                    cannot undo
                                </span>
                                this action.
                            </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-4 w-full gap-2">
                            <button className="w-full bg-gray-100 shadow-md px-5 py-3 rounded-full font-medium" onClick={props.handleCloseModal} >
                                No, go back
                            </button>
                            <button className="w-full bg-red-500 shadow-md rounded-full px-5 py-3 font-medium text-white" onClick={props.handleDeleteAction}>
                                Yes, delete my account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}