import ContactsListDesktop from "./ContactsList";
import FavoritesSection from "./FavoritesSection";
import { FavoritesCard } from "../../components/favoritesCard";
import { GetContacts } from "../../api/contactService";
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';


const HomeView = (props) => {

    return (
        <div className="flex-grow h-full">
            <div className='flex h-[15%] mb-8'>
                <FavoritesSection 
                    onSeeAllClick = {props.onSeeAllClick}
                    onFavoriteCardClick={props.onFavoriteCardClick}
                />
            </div>
            <div className='h-[82%] rounded-lg'>
                <ContactsListDesktop 
                    searchQuery = {props.searchQuery}
                    selectedContact = {props.selectedContact}
                    onContactClick = {props.onContactClick}
                    onAddContactClick = {props.onAddContactClick}
                />
            </div>
        </div>
    );
}

export default HomeView;
