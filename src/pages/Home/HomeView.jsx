import ContactsListDesktop from "./ContactsList";
import FavoritesSection from "./FavoritesSection";

const HomeView = ({ }) => {
    return (
        <div className="flex-grow h-full">
            <div className='flex h-1/4'>
                <FavoritesSection />
            </div>
            <div className='h-3/4 rounded-lg'>
                <ContactsListDesktop />
            </div>
        </div>
    );
}

export default HomeView;
