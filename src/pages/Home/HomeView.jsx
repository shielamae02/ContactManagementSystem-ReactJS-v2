import ContactsListDesktop from "./ContactsList";
import FavoritesSection from "./FavoritesSection";

const HomeView = (props) => {
    return (
        <div className="flex-grow h-full flex flex-col mt-2">
            <div className='hidden md:block h-[15%] mb-4'>
                <FavoritesSection
                    onSeeAllClick={props.onSeeAllClick}
                    onFavoriteCardClick={props.onFavoriteCardClick}
                    updateContact={props.updateContact}
                />
            </div>
            <div className='flex-grow 2xl:h-[82%] rounded-lg'>
                <ContactsListDesktop
                    searchQuery={props.searchQuery}
                    selectedContact={props.selectedContact}
                    onContactClick={props.onContactClick}
                    onAddContactClick={props.onAddContactClick}
                    addContact={props.addContact}
                    updateContact={props.updateContact}
                    onUpdateContact={props.onUpdateContact}
                    updateSelectedContact={props.updateSelectedContact}
                />
            </div>
        </div>
    );
}

export default HomeView;
