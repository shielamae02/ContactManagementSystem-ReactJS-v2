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
    }, [userData]);

    return (
        <div className="h-full w-full flex flex-col items-center px-12 pt-12 pb-7 ">
            {/* <img src={DuckProfile} alt="My Image" className='h-56' /> */}
            <div className='h-48 w-48 bg-beige text-5xl font-medium text-brown rounded-full flex items-center justify-center'>
                {props.userData.firstName && props.userData.firstName[0]}
                {props.userData.lastName && props.userData.lastName[0]}
            </div>
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
        </div>
    );
}


export default UserDataView;