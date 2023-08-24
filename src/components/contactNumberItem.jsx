import { FaPhone } from 'react-icons/fa';

export const ContactNumberItem = ({ contactNumber }) => {
    return (
        <div className='flex items-center py-0.5'>
             <div className='bg-paleBlue p-2 rounded-lg border border-iceBlue shadow-md'>
                <FaPhone size={20}  className='text-blue'/>
            </div> 
            <div className='ml-6 p-1 flex flex-col'>
                <p className='text-lg'>{ contactNumber.number }</p>
                <p className='text-gray-500 text-sm uppercase'>{ contactNumber.label }</p>
            </div>
        </div>
    );
}