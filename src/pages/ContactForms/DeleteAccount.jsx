import { UpdateUserDetails } from "../../api/userService";
import { InputField } from "../../components/InputField";
import { PromptComponent } from "../../components/promptComponent";
import { useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";
import { DeleteUserAccount } from "../../api/userService";


const DeleteAccount = ({ userData }) => {
    const token = sessionStorage.getItem("token");
    const [showModal, setShowModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");

    const handleDeleteAction = async (e) => {
        setShowModal(false);
        setShowPasswordModal(true);
    }



    const handleConfirmDeleteAccount = async (e) => {
        e.preventDefault();
        console.log(userData.password)
        try{
            if (userData.password === password){
                console.log(useData.password);
                console.log("Same password!");
                if (token) {
                    // const response = await DeleteUserAccount(token);
                    // console.log("Successfully deleted account: ", response);
                }
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
            <div className="px-10 py-6 bg-white shadow-lg border-4 border-red-500 rounded-2xl flex justify-between items-center font-medium">
                <h1 className="text-gray-800">
                    Delete this account.
                </h1>
                <div
                    onClick={() => setShowModal(true)}
                    className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg">
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
                    password={password}
                    setPassword={setPassword}
                    handleConfirmDeleteAccount={handleConfirmDeleteAccount}
                />
            )}
        </div>
    )
}

export default DeleteAccount;

export const ConfirmWithPasswordModal = ({ password, setPassword, handleConfirmDeleteAccount }) => {
    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
            <div className={`relative w-[calc(30%)] my-6 mx-auto`}>
                <div className="border-4 border-red-500 rounded-xl shadow-lg relative flex flex-col w-full bg-red-50 p-4 outline-none focus:outline-none">
                    <div className="flex flex-col items-center justify-end px-5 pt-9 gap-7">
                        <TiWarning size={55} className="text-red-500" />
                        <h1 className=" text-[28px] font-bold">
                            Confirm Deletion
                        </h1>
                    </div>
                    <div className="relative px-4 py-3 flex-auto">
                        <p className="text-center mb-1">
                            To confirm deletion, please enter your password.
                        </p>
                        <input
                            name="password" 
                            value= {password}
                            onChange = {(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="text-base rounded-lg p-4 m-2 bg-red-100 w-full focus:outline-none focus:border-red-300 border-2 border-red-200"
                        />
                    </div>
                    <div className="flex items-center justify-end p-4 w-full gap-2">
                        <button className="w-full bg-gray-100 shadow-md px-5 py-3 rounded-full font-medium" onClick={() => setShowPasswordModal(false)}>
                            Cancel
                        </button>
                        <button className="w-full bg-red-500 shadow-md rounded-full px-5 py-3 font-medium text-white" onClick={handleConfirmDeleteAccount}>
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
                <div className={`relative w-[calc(50%)]  2xl:w-[calc(30%)] my-6 mx-auto`}>
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