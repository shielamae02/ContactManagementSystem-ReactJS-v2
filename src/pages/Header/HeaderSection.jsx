import { LuSearch } from 'react-icons/lu';
import DuckProfile from "../../assets/images/DuckProfile.png"
import { useState, useEffect } from 'react';
import { ModalComponent } from '../../components/modalComponent';


const Header = ({searchQuery, setSearchQuery, userData}) => {

    const [isOpen, setIsOpen] = useState(false);    
    const [showModal, setShowModal] = useState(false);

    const toggleDropDown = () =>{
        setIsOpen(!isOpen);
    }

    const handleLogOutClick = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        window.location.reload();
    }
    return (
        <header className= "py-4 w-full flex items-center justify-between gap-4">
            <div className="w-full md:w-1/2 lg:w-1/3 flex">
                <div className="items-center relative w-full">
                    <span className="absolute pl-3 inset-y-0 flex items-center">
                        <LuSearch size={24} className="text-blue" />
                    </span>
                    <input
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-lg rounded-xl p-2 pl-12 bg-white shadow-md w-full border-collapse focus:border-mistyBlue focus:border focus:outline-none"
                    />
                </div>
            </div>
            <div>
                <div className='h-14 w-14 bg-beige text-brown font-semibold text-lg cursor-pointer rounded-full flex items-center justify-center' onClick={toggleDropDown}>
                    {userData.firstName && userData.firstName[0]}{userData.lastName && userData.lastName[0]}
                </div>
                {isOpen && (
                <div className="origin-top-right absolute right-6 mt-2 w-52 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1 hover:bg-gray-100" onClick={() => setShowModal(true)}>
                        <p className="block px-4 py-2 text-md text-gray-800 font-medium">
                            Logout
                        </p>
                    </div>
                </div>
            )}
            </div>
            { showModal && (
                <ModalComponent 
                    modalTitle="Log Out"
                    modalMessage= "Are you sure you want to log out of your account"
                    modalNoMessage="No, go back"
                    modalYesMessage="Yes, log out"
                    handleModalClick={handleLogOutClick}
                    closeModal={() => setShowModal(false)}
                />
            )}
           
        </header>

    );
}

export default Header;