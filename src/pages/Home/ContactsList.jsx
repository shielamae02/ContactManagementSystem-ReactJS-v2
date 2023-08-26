import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { GetContacts, UpdateContact } from '../../api/contactService';
import SnackBarComponent from '../../components/snackbarComponent';

const ContactsListDesktop = (props) => {
    const token = sessionStorage.getItem("token");
    const [contacts, setContacts] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleSetIsFavorite = async (contact) => {
        contact.favorite = !contact.favorite;
        const response = await UpdateContact(token, contact.id, contact);
        setShowSnackbar(contact.id);
        setIsFavorite(!isFavorite);

        setTimeout(() => {
            setShowSnackbar(false);
        }, 1500);

    }

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                if (token) {
                    const contactsResponse = await GetContacts(token);
                    setContacts(contactsResponse);
                }
            } catch (error) {
                console.error("Error fetching contact details: ", error);
            }
        }
        fetchContacts();
    }, [contacts]);

    const query = props.searchQuery ? props.searchQuery.toLowerCase() : "";
    const filteredContacts = contacts.filter((contact) => {
        const firstName = contact.firstName || "";
        const lastName = contact.lastName;

        return (
            firstName.toLowerCase().includes(query) ||
            lastName.toLowerCase().includes(query)
        );
    })

    function getRandomColor() {
        const taupeShades = [100, 200, 300, 400, 500, 600, 700, 800, 900];
        const randomIndex = Math.floor(Math.random() * taupeShades.length);
        return `taupe-${taupeShades[randomIndex]}`;
    }


    return (
        <div className="flex-grow h-full flex flex-col px-6 py-4">
            <div className="flex items-center justify-between py-2">
                <h1 className="text-2xl font-bold text-blue mb-1">
                    Contacts List
                </h1>
                <button onClick={props.onAddContactClick} className="px-6 py-2 bg-blue rounded-lg text-white font-semibold">
                    Add Contact
                </button>
            </div>

            <div className="flex-grow h-full bg-white shadow-lg rounded-2xl px-4 pt-4">
                <div className="relative overflow-y-hidden flex">
                    <div className="h-[520px] overflow-y-auto w-full max-h-[520px]">
                        <table className="w-full text-lg text-left text-gray-700 dark:text-gray-400 relative">
                            <thead className="text-xs text-gray-900 uppercase dark:text-gray-500 self-center sticky top-0 w-full bg-white ">
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
                            <tbody className='text-gray-500'>
                                {filteredContacts.map((contact) => (
                                    <tr
                                        key={contact.id}
                                        className={`hover:bg-paleBlue cursor-pointer h-full ${contact.id === props.selectedContact?.id
                                            ? 'bg-paleBlue'
                                            : ''}`}
                                        onClick={() => props.onContactClick(contact)}
                                    >
                                        <td className="px-6 py-2 h-full  flex items-center">
                                            <div className="flex items-center justify-center text font-medium h-12 w-12 bg-beige text-brown mr-6 rounded-xl">
                                                <div className="h-full w-full flex items-center justify-center">
                                                {contact.firstName[0]}{contact.lastName[0]}
                                                </div>
                                            </div>
                                            {`${contact.firstName} ${contact.lastName}`}
                                        </td>
                                        <td className="px-6 py-2" style={{ width: '25%' }}>
                                            {contact.emailAddress}
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className='flex items-center'>
                                                <div className='w-4/5'>
                                                    {contact.contactNumber1}
                                                </div>
                                                <button onClick={() => handleSetIsFavorite(contact)}>
                                                    {
                                                        contact.favorite ? <FaHeart size={24} className='text-red-400' /> : <FaRegHeart size={24} />
                                                    }
                                                </button>
                                                {showSnackbar && (
                                                    <SnackBarComponent favorite={contact.favorite} />
                                                )}
                                            </div>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactsListDesktop;
