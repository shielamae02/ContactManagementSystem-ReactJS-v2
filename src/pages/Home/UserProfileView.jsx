import DuckProfile from '../../assets/images/DuckProfile.png';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

const UserProfileView = ({ userData, onEditClick }) => {
    return (
        <div className="flex flex-col w-full h-full p-3 xl:p-6 justify-center items-center">
            <div className='flex items-center w-full justify-between'>
                <h1 className="text-xl xl:text-[27px] font-semibold py-2 mr-auto">User Profile Card</h1>
                <div className='flex items-center gap-2 font-semibold text-mistyBlue text-sm xl:text-lg hover:underline' onClick={onEditClick} >
                    <FiEdit size={24} className='text-mistyBlue' />
                    Profile Settings
                </div>
            </div>
            <div className="w-full bg-white h-[70%] xl:h-4/5 rounded-3xl shadow-xl border border-gray-200 p-14 xl:p-22 flex flex-col xl:flex-row justify-center xl:justify-evenly items-center gap-4">
                <div className='bg-beige h-48 w-48 xl:h-64 xl:w-64 rounded-full flex items-center justify-center text-6xl xl:text-8xl font-semibold text-brown'>
                    {userData.firstName[0]}{userData.lastName[0]}
                </div>

                <div className='w-1 rounded-full bg-gray-200 h-full hidden xl:block'></div>


               <div className='flex flex-col items-center xl:gap-6'>
                    <h1 className='text-2xl xl:text-[45px] leading-0 font-semibold'>
                        {userData.firstName} {userData.lastName}
                    </h1>
                    <div className='flex flex-col gap-2 mt-4 xl:mt-0 xl:ml-8'>
                        <div className='flex gap-4 items-center text-gray-600 xl:text-[24px]'>
                            <FaUser size={32} className='text-brown' />
                            {userData.userName}
                        </div>
                        <div className='flex items-center text-gray-600 xl:text-[24px] gap-4'>
                            <MdEmail size={32} className='text-brown' />
                            {userData.emailAddress}
                        </div>
                    </div>


               </div>
            </div>
        </div>
    );
}

export default UserProfileView;
