import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import DuckProfile from '../../assets/images/DuckProfile.png';


const UserDataView = () => {
    return (
        <div className="h-full w-full flex flex-col items-center px-12 pt-12 pb-7 ">
            <img src={DuckProfile} alt="My Image" className='h-56' />
            <div>
                <h1 className="font-semibold text-2xl pt-6 ">Jeremy Jules</h1>
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
                            <p className='text-lg'>jeremyjules</p>
                            <p className='text-gray-500 text-sm uppercase'>username</p>
                        </div>
                    </div>
                    <div className='flex items-center py-2.5'> 
                        <div className='bg-paleBlue border border-iceBlue p-2 rounded-lg shadow-lg'>
                            <MdEmail size={20}  className='text-blue'/>
                        </div>
                        <div className='ml-6 p-1 flex flex-col'>
                            <p className='text-lg'>jeremy@example.com</p>
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
                <button className="flex flex-grow text-white items-center text-base font-semibold border borde-red-400 bg-red-400 py-4 px-3 justify-center rounded-xl">
                <span className='mr-2'>
                        <RiDeleteBin5Fill size={20}/>
                    </span>
                    Delete Account
                </button>
            </div>
        </div>
    );
}


export default UserDataView;