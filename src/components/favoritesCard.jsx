import { FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

export const FavoritesCard = ({ firstName, lastName, emailAddress }) => {
    return (
        <div className="w-full  bg-white flex  rounded-2xl shadow-md py-4 px-6 gap-4"> 
                <div className='bg-beige h-14 w-14 rounded-full flex items-center justify-center text-xl text-brown'>
                    SL
                </div>
                <div className='flex flex-col'>
                    <p className='text-lg font-medium'>{firstName} {lastName}</p>
                    <p className='text-sm'>{emailAddress}</p>
                </div>
        </div>
    );
}

