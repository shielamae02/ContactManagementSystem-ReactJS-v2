import DuckProfile from '../../assets/images/DuckProfile.png';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';


const UserProfileView = ({ userData, onEditClick }) => {
    return (
        <div className=" h-full w-full p-6 flex flex-col justify-center">
            <div className='flex items-center justify-between px-2'>
                <h1 className="text-[27px] font-semibold py-2">User Profile Card</h1>
                <div className='flex items-center gap-2 font-semibold text-mistyBlue text-lg hover:underline' onClick={onEditClick} >
                    <FiEdit size={24} className='text-mistyBlue' />
                    Edit
                </div>
            </div>
            <div className="w-full bg-white h-[70%] xl:h-4/5 rounded-3xl shadow-xl border border-gray-200 p-14 xl:p-22">
                <div className='flex bg-coral py-4 gap-6 2xl:gap-2 h-full items-center w-full justify-evenly'>
                    <img src={DuckProfile} className='h-52 xl:h-80' />
                    <div className='h-full w-0.5 rounded-full bg-beige my-2'></div>
                    <div className='flex flex-col justify-center gap-6'>
                        <h1 className='text-4xl 2xl:text-[40px] leading-0 font-semibold'>
                            {userData.firstName} {userData.lastName}
                        </h1>
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-4 items-center text-gray-600 text-[22px]'>
                                <FaUser size={32} className='text-brown' />
                                {userData.userName}
                            </div>
                            <div className='flex items-center text-gray-600 text-[22px] gap-4'>
                                <MdEmail size={32} className='text-brown' />
                                {userData.emailAddress}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfileView;