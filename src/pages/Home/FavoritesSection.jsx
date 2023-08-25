import { FavoritesCard } from "../../components/favoritesCard";
import { GetContacts } from "../../api/contactService";
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

const FavoritesSection = ({ onSeeAllClick}) => {
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

  return (
    <div className="px-6 pt-2 gap-2 flex flex-col w-full ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue">
          Favorites
        </h1>
        <h3
          onClick={onSeeAllClick}
          className="text-mistyBlue cursor-pointer hover:underline">see all</h3>
      </div>
      <div className="flex flex-grow gap-4">
        {
          contacts
            .filter(contact => contact.favorite) // Filter only favorites
            .slice(0, 3) // Take the first three favorites
            .map((contact) => (
              <FavoritesCard
                key={contact.id}
                firstName={contact.firstName}
                lastName={contact.lastName}
                emailAddress={contact.emailAddress}
              />
            ))
        }
      </div>
    </div>
  );
}

export default FavoritesSection;
