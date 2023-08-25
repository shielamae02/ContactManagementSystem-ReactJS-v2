import { FaPhone } from 'react-icons/fa';

export const ContactNumberItem = ({ contactNumber, label }) => {
    return (
        <div className='flex items-center py-0.5'>
             <div className='bg-paleBlue p-2 text-base rounded-lg border border-iceBlue shadow-md'>
                <FaPhone size={20}  className='text-blue'/>
            </div> 
            <div className='ml-6 p-1 flex flex-col'>
                <p className='text-lg'>{ contactNumber }</p>
                <p className='text-gray-500 text-sm uppercase'>{ label }</p>
            </div>
        </div>
    );
}