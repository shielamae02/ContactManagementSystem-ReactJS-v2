import ContactsListDesktop from "./ContactsList";
import FavoritesSection from "./FavoritesSection";
import { FavoritesCard } from "../../components/favoritesCard";
import { GetContacts } from "../../api/contactService";
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';


const HomeView = (props) => {


    return (
        <div className="flex-grow h-full flex flex-col mt-2">
            {/* FavoritesSection (hidden on md screens and below) */}
            <div className='hidden md:block h-[15%] mb-4'>
                <FavoritesSection
                    onSeeAllClick={props.onSeeAllClick}
                    onFavoriteCardClick={props.onFavoriteCardClick}
                />
            </div>
            {/* ContactsListDesktop */}
            <div className='flex-grow 2xl:h-[82%] rounded-lg'>
                <ContactsListDesktop
                    searchQuery={props.searchQuery}
                    selectedContact={props.selectedContact}
                    onContactClick={props.onContactClick}
                    onAddContactClick={props.onAddContactClick}
                />
            </div>
        </div>
    );
}

export default HomeView;
