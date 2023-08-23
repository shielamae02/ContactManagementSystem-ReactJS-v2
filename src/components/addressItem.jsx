import { FaMapMarkerAlt } from 'react-icons/fa';

export const AddressItem = ({  }) => {
    return (
        <div className='flex items-center py-4'>
             <div className='bg-paleBlue p-2 rounded-lg border border-iceBlue shadow-md'>
                <FaMapMarkerAlt size={20}  className='text-blue'/>
            </div> 
            <div className='ml-6 flex flex-col '>
                <p className='text-[16px] leading-none'>Cebu City, Cebu</p>
                <p className='text-gray-500 text-[14px] uppercase'>Home</p>
            </div>
        </div>
    );
};

