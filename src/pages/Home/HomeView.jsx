import ContactsListDesktop from "./ContactsList";
import FavoritesSection from "./FavoritesSection";

const HomeView = (props) => {
    return (
        <div className="flex-grow h-full">
            <div className='flex h-1/4'>
                <FavoritesSection />
            </div>
            <div className='h-3/4 rounded-lg'>
                <ContactsListDesktop 
                    searchQuery = {props.searchQuery}
                    selectedContact = {props.selectedContact}
                    onContactClick = {props.onContactClick}
                />
            </div>
        </div>
    );
}

export default HomeView;
