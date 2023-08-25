import { FaMapMarkerAlt } from 'react-icons/fa';

export const AddressItem = ({ details, label }) => {
    return (
        <div className='flex items-center py-4'>
             <div className='bg-paleBlue text-base p-2 rounded-lg border border-iceBlue shadow-md'>
                <FaMapMarkerAlt size={20}  className='text-blue'/>
            </div> 
            <div className='ml-6 flex flex-col '>
                <p className='text-lg leading-none'>{ details }</p>
                <p className='text-gray-500 text-sm uppercase'>{ label }</p>
            </div>
        </div>
    );
};

