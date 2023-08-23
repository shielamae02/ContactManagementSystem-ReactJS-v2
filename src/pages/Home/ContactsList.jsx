import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';

const ContactsListDesktop = ({ 
}) => {
    
    return (
        <div className="flex-grow h-full flex flex-col px-6 py-4"> 
            <div className="flex items-center justify-between py-2">
                <h1 className="text-2xl font-bold text-blue mb-1">
                    Contacts List
                </h1>
                <button className="px-6 py-2 bg-blue rounded-lg text-white font-semibold">
                    Add Contact
                </button>
            </div>

            <div className="flex-grow h-full bg-white shadow-lg rounded-2xl px-4 pt-4">
                <div className="relative overflow-y-hidden flex">
                    <div className="h-[520px] overflow-y-auto w-full max-h-[520px]">
                    <table className="w-full text-lg text-left text-gray-700 dark:text-gray-400 relative">
                            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400 self-center sticky top-0 w-full bg-white ">
                                <tr className="text-sm text-mistyBlue">
                                    <th scope="col" className="px-6 py-3 w-2/5"> 
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3" style={{ width: '25%' }}>
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3" style={{ width: '35%' }}>
                                        Phone Number
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            
                            </tbody>
                        </table>
                    </div>
    
                </div>
            </div>
        </div>
    );
}

export default ContactsListDesktop;