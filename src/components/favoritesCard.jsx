import { FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

export const FavoritesCard = ({ firstName, lastName, emailAddress }) => {
    return (
        <div className="w-full bg-white flex  rounded-2xl shadow-md px-6 py-4 gap-4"> 
        <div className='flex w-full gap-2'>
            <div className='hidden 2xl:block '>
                <div className='bg-beige rounded-xl h-12 w-12 flex items-center justify-center text-xl text-brown mr-2 font-medium'>
                            {firstName[0]}{lastName[0]}
                </div>
            </div>
         
                <div className='h-full w-1 rounded-full bg-beige block 2xl:hidden'></div>
                <div className='flex flex-col w-full'>
                    <p className='text-lg font-medium'>{firstName} {lastName}</p>
                    <p className='text-sm flex justify-between'>{emailAddress}
                        <span>
                            <FaHeart className='text-red-400'/>
                        </span>
                    </p>
                </div>
            </div>
          
        </div>
    );
}

