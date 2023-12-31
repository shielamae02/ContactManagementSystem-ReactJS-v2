import { FavoritesCard } from "../../components/favoritesCard";
import { GetContacts } from "../../api/contactService";
import { useState, useEffect } from 'react';
import Heart from '../../assets/images/Heart.png';

const FavoritesSection = ({ onSeeAllClick, onFavoriteCardClick, updateContact }) => {
  const token = sessionStorage.getItem("token");
  const [contacts, setContacts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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
  }, [updateContact]);


  return (
    <div className="px-6 pt-2 gap-2 flex flex-col w-full ">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold text-blue">
            Favorites
          </h1>
          {
            isLoaded && contacts.filter(contact => contact.favorite).length !== 0 && (
              <h3
                onClick={onSeeAllClick}
                className="text-mistyBlue cursor-pointer hover:underline font-medium">see all
              </h3>
            )
          }
        </div>
        {
          isLoaded && contacts.filter(contact => contact.favorite).length === 0 && (
            <div className="flex flex-col items-center"> 
              <img src={Heart} alt="No Contacts" className='h-[50px]' />
              <h1 className="font-medium mt-2 text-lg">
                Your favorites yet!
              </h1>
            </div>
          
          )
        }
      </div>
      <div className="grid grid-cols-3 gap-4">
        {
          contacts
            .filter(contact => contact.favorite)
            .splice(0,3)
            .map((contact) => (
              <FavoritesCard
                key={contact.id}
                firstName={contact.firstName} 
                lastName={contact.lastName}
                emailAddress={contact.emailAddress}
                onFavoriteCardClick={() => onFavoriteCardClick(contact)}
              />
            ))
        }
      </div>
    </div>
  );
}

export default FavoritesSection;
