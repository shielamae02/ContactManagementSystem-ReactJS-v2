import { GetContacts } from "../../api/contactService";
import { useState, useEffect } from 'react';
import  Favorites from "../../assets/svg/Favorites.svg";
import {FavoritesPageCard} from "../../components/favoritesPageCard";
import ContactDataView from "../RightSideBar/ContactDataView";

const FavoritesPage = ( props ) => {
    const token = sessionStorage.getItem("token");
    const [contacts, setContacts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        console.log("Favorites page is fetching!");
        const fetchContacts = async () => {
            try {
                if (token) {
                    const contactsResponse = await GetContacts(token);
                    setContacts(contactsResponse);
                    setIsLoaded(true);
                }
            } catch (error) {
                console.error("Error fetching contact details: ", error);
            }
        }
        fetchContacts();
    }, [props.updateContact]);

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
        <div className="flex flex-col w-full h-full p-3 xl:p-6">
             <div>
                <h1 className="text-[27px] font-semibold pb-4">Favorite Contacts</h1>
            </div>
            {
                isLoaded && contacts.filter(contact => contact.favorite).length === 0 && (
                    <>
                        <div className="flex flex-col items-center mt-20 justify-center font-semibold text-xl ">
                            <img src={Favorites} alt="No Contacts" className='h-96'/>
                            Your favorites go here!
                        </div>
                    </>
                )
              
            }
            <div className="grid grid-cols-2 2xl:grid-cols-3 gap-2 xl:gap-4">
                {filteredContacts.map((contact) => (
                    <>
                        { contact.favorite && (
                            <FavoritesPageCard 
                                key={contact.id}
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