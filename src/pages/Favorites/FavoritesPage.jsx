import { GetContacts } from "../../api/contactService";
import { useState, useEffect } from 'react';
import { FavoritesPageCard } from "../../components/favoritesPageCard";

const FavoritesPage = ( props ) => {
    const token = sessionStorage.getItem("token");
    const [contacts, setContacts] = useState([]);

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

    const query =  props.searchQuery ? props.searchQuery.toLowerCase() : "";  
    const filteredContacts = contacts.filter((contact) => {
        const firstName = contact.firstName || "";
        const lastName = contact.lastName;

        return (
            firstName.toLowerCase().includes(query) ||
            lastName.toLowerCase().includes(query)
        );
    })


    return (
        <div className="flex flex-col w-full h-full p-6">
             <div>
                <h1 className="text-[27px] font-semibold pb-4">Favorite Contacts</h1>
            </div>
            <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4">
                {filteredContacts.map((contact) => (
                    <>
                        { contact.favorite && (
                            <FavoritesPageCard 
                                firstName={contact.firstName} 
                                lastName={contact.lastName} 
                                emailAddress={contact.emailAddress}
                                onFavoriteCardClick={() => props.onFavoriteCardClick(contact)} 
                            />
                        )}
                    </>
                ))}
            </div>
        </div>
    )
}

export default FavoritesPage;