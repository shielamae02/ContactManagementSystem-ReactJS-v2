import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import DuckProfile from '../../assets/images/DuckProfile.png';
import { GetUserDetails, DeleteUserAccount } from '../../api/userService';
import { useState, useEffect } from 'react'; 
import { ModalComponent } from '../../components/modalComponent';


const UserDataView = ( props ) => {
    const token = sessionStorage.getItem("token");
    const [userData, setUserData] = useState({});  
    const [showModal, setShowModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (token) {
                    const response = await GetUserDetails(token);
                    setUserData(response);
                }
            } catch (error) {
                console.error("Error fetching contact details: ", error);
            }
        }
        fetchUserData();
    }, [token, userData]);

    const deleteAccount = async (e) => {
        e.preventDefault();
        try {
            if(token){
                const response = await DeleteUserAccount(token);
                console.log(response);
            }
        } catch (error){
            console.error(error.response);
        }
    }
 

    return (
        <div className="h-full w-full flex flex-col items-center px-12 pt-12 pb-7 ">
            {/* <img src={DuckProfile} alt="My Image" className='h-56' /> */}
            <div>
                <h1 className="font-semibold text-2xl pt-6 ">{props.userData.firstName} {props.userData.lastName}</h1>
            </div>

            <div className="border-b my-8 border-1.5 border-gray-300 w-full" />

            <div className='flex flex-col w-full flex-grow'>
                <h1 className="font-semibold text-xl text-gray-700 py-2">User Information</h1>
                <div className='py-1'>
                    <div className='flex items-center py-2.5'> 
                        <div className='bg-paleBlue p-2 rounded-lg shadow-lg border border-iceBlue'>
                            <FaUser size={20}  className='text-blue'/>
                        </div>
                        <div className='ml-6 p-1 flex flex-col'>
                            <p className='text-lg'>{props.userData.userName}</p>
                            <p className='text-gray-500 text-sm uppercase'>username</p>
                        </div>
                    </div>
                    <div className='flex items-center py-2.5'> 
                        <div className='bg-paleBlue border border-iceBlue p-2 rounded-lg shadow-lg'>
                            <MdEmail size={20}  className='text-blue'/>
                        </div>
                        <div className='ml-6 p-1 flex flex-col'>
                            <p className='text-lg'>{props.userData.emailAddress}</p>
                            <p className='text-gray-500 text-sm uppercase'>email address</p>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div className="w-full  gap-4 flex text-sm">
                <button  className="flex w-1/2 ml:w-full text-base bg-white items-center border border-blue text-blue font-semibold py-4 px-3 justify-center rounded-xl p-4">
                    <span className='mr-2'>
                        <BiEditAlt size={20}/>
                    </span>
                    Edit Profile
                </button>
                <button className="flex flex-grow text-white items-center text-base font-semibold border borde-red-400 bg-red-400 py-4 px-3 justify-center rounded-xl" onClick={() => setShowModal(true)}>
                <span className='mr-2'>
                        <RiDeleteBin5Fill size={20}/>
                    </span>
                    Delete Account
                </button>
            </div>
            { showModal && (
                <ModalComponent 
                    modalTitle="Delete Account"
                    modalMessage= "Are you sure you want to delete your account? This action cannot be undone."
                    modalNoMessage="No, go back."
                    modalYesMessage="Yes, delete my account"
                    handleModalClick={handleDeleteAccountClick}
                    closeModal={() => setShowModal(false)}
                />
            )}
        </div>
    );
}


export default UserDataView;