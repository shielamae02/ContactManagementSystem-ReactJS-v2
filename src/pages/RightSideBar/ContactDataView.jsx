import { useState, useEffect } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { AddressItem } from '../../components/addressItem';
import { ContactNumberItem } from '../../components/contactNumberItem';
import { ModalComponent } from '../../components/modalComponent';
import { PromptComponent } from '../../components/promptComponent';
import { DeleteContact } from '../../api/contactService';



const ContactDataView = ( {selectedContact, handleEditContactClick} ) => {
    const token = sessionStorage.getItem("token");
    const [showModal, setShowModal] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);


    useEffect(() => {
        
      }, [showPrompt, selectedContact]);



    const handleDeleteClick = async (e) => {
        e.preventDefault();
        try {
            if(token){
                setContactToDelete(selectedContact);
                const response = await DeleteContact(token, selectedContact.id);
                setShowModal(false);
                if(response === "Successfully deleted contact."){
                    setShowPrompt(true);
                }
            }
        } catch (error){
            console.error(error.response);
        }
    }


    return (
        <div className="h-full w-full flex flex-col items-center px-8 py-6 relative ">
            <div className="flex w-full justify-end gap-2 pb-3">
            <div className='relative group'>
                <div className={`
                    absolute -top-8 left-1/2 transform -translate-x-1/2 bg-paleBlue rounded-md px-2 py-1
                    text-blue text-sm font-semibold invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100
                `}>
                    Edit
                </div>
                    <div className='bg-oceanBlue p-2 rounded-full shadow-md cursor-pointer group'>
                        <BiEditAlt size={26} className='text-white'onClick={handleEditContactClick} />
                    </div>
                </div>
                <div className='relative group' onClick={() => setShowModal(true)}>
                    <div className={`
                        absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-50 rounded-md px-2 py-1
                        text-red-400 text-sm font-semibold invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100
                    `}>
                        Delete
                    </div>
                    <div className='bg-red-400 p-2 rounded-full shadow-md cursor-pointer group'>
                        <RiDeleteBin5Fill size={26} className='text-white' />
                    </div>
                    </div>
            </div>
             
            <div className='flex items-center w-full p-4 rounded-2xl bg-paleBlue border border-iceBlue'>
                <div className="h-20 w-20 bg-beige rounded-full mr-6 flex items-center justify-center text-3xl font-bold text-brown">{selectedContact.firstName[0]}{selectedContact.lastName[0]}</div>
                    <div flex flex-col>
                        <h1 className="font-semibold text-xl 2xl:text-2xl flex truncate overflow-hidden">
                            {selectedContact.firstName} {selectedContact.lastName} 
                        </h1>
                        <div className='flex items-center'> 
                                <MdEmail size={22  } className='text-blue mr-1.5'/>
                            <p className='text-gray-600 italic text-base break-normal'>{selectedContact.emailAddress} </p>
                        </div>
                    </div>
                </div>

            <div className="border-b my-6 border-gray-300 w-full" />
            <div className='flex flex-col w-full flex-grow h-[500px] overflow-y-auto'>
    <h1 className="font-semibold text-[22px] text-gray-700 sticky top-0 py-1 ">Contact Information</h1>
    <div>
        {selectedContact.contactNumber1 !== null && (
            <ContactNumberItem
                contactNumber={selectedContact.contactNumber1}
                label={selectedContact.numberLabel1}
            />
        )}
        {selectedContact.contactNumber2!== null && (
            <ContactNumberItem
                contactNumber={selectedContact.contactNumber2}
                label={selectedContact.numberLabel2}
            />
        )}
        {selectedContact.contactNumber3 !== null && (
            <ContactNumberItem
                contactNumber={selectedContact.contactNumber3}
                label={selectedContact.numberLabel3}
            />
        )}
    </div>
    <div className="border-b my-2 border-gray-300 w-full" />
    <div>
        {/* Check if addressDetails1 is not null, then render the AddressItem */}
        {selectedContact.addressDetails1 && (
            <AddressItem
                details={selectedContact.addressDetails1}
                label={selectedContact.addressLabel1}
            />
        )}
        {selectedContact.addressDetails2  && (
            <AddressItem
                details={selectedContact.addressDetails2}
                label={selectedContact.addressLabel2}
            />
        )}
    </div>
</div>

            { showModal && (
                <ModalComponent 
                    modalTitle="Delete Contact"
                    modalMessage= "Are you sure you want to delete"
                    actionItem={`${selectedContact.firstName} ${selectedContact.lastName}`}
                    modalNoMessage="No, keep it."
                    modalYesMessage="Yes, delete!"
                    handleModalClick={handleDeleteClick}
                    closeModal={() => setShowModal(false)}
                />
            )}
            {showPrompt  && (
                <PromptComponent
                    promptTitle="Success!!"
                    promptMessage="You have successfully deleted "
                    actionItem={`${contactToDelete.firstName} ${contactToDelete.lastName}`}
                    closePrompt={() => {
                        setShowPrompt(false);
                        setContactToDelete(null);
                        window.location.reload();
                    }}
                />
            )}
        </div>
    );
}

export default ContactDataView;