import Sidebar, { SidebarItem } from "../../components/sidebar";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BiSolidDashboard } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import Header from "../Header/HeaderSection";
import HomeView from '../Home/HomeView';
import RightSidebarPreview from "../RightSideBar/RightSidebarPreview";
import FavoritesPage from "../Favorites/FavoritesPage";
import UpdateUserDataView from "../ContactForms/UpdateUserDataView";
import { GetUserDetails } from "../../api/userService";
import AddNewContactView from "../ContactForms/AddContactView";
import { FaUser } from "react-icons/fa";
import UserProfileView from "../Home/UserProfileView";
import UpdateContactView from "../ContactForms/UpdateContactView";


const DashboardPage = () => {

    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [userData, setUserData] = useState({});

    const [selectedContact, setSelectedContact] = useState(null);

    const [addContact, setAddContact] = useState(false);
    const [updateContact, setUpdateContact] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);

    const onAddContact = () => setAddContact(!addContact);
    const onUpdateContact = () => setUpdateContact(!updateContact);
    const onUpdateProfile = () => setUpdateProfile(!updateProfile);

    const componentMapping = {
        0: <HomeView
            searchQuery={searchQuery}
            selectedContact={selectedContact}
            onContactClick={(contact) => {
                setSelectedContact(contact);
            }}
            onAddContactClick={() => setActiveItemIndex(3)}
            onSeeAllClick={() => setActiveItemIndex(1)}
            onFavoriteCardClick={(contact) => setSelectedContact(contact)}
            addContact={addContact}
            updateContact={updateContact}
            onUpdateContact={onUpdateContact}
        />,
        1: <FavoritesPage
                searchQuery={searchQuery}
                onFavoriteCardClick={(contact) => setSelectedContact(contact)} 
                updateContact={updateContact}
            />,
        2: <UserProfileView userData={userData} onEditClick={() => setActiveItemIndex(5)} />,
        3: <AddNewContactView onAddContact={onAddContact} handleBackToHomeClick={() => setActiveItemIndex(0)}/>,
        4: <UpdateContactView selectedContact={selectedContact} handleBackToHomeClick={() => setActiveItemIndex(0)} />,
        5: <UpdateUserDataView 
                userData={userData} 
                updateProfile={updateProfile}
                onUpdateProfile={onUpdateProfile}
        />
    }

    const fetchUserData = async () => {
        try {
            if (token) {
                const response = await GetUserDetails(token);
                setUserData(response);
            }
        } catch (error) {
            console.error("Error fetching contact details: ", error);
        }
    }

    const handleCloseContactView = () => {
        setSelectedContact(null);
        setActiveItemIndex(activeItemIndex);
    };


    useEffect(() => {
        if (token === null) {
            navigate("/", { replace: true});
        }
        //fetchUserData();
    }, [selectedContact, navigate]);

    useEffect(() => {
        fetchUserData();
    }, [updateProfile]);


    return (
        <div className="flex w-screen h-screen bg-gray-50 relative">
            <Sidebar
                item={activeItemIndex}
                setItemIndex={setActiveItemIndex}
                userData={userData  }
            >
                <SidebarItem icon={<BiSolidDashboard size={22} />} title="Dashboard" />
                <SidebarItem icon={<FaHeart size={22} />} title="Favorites" />
                <SidebarItem icon={<FaUser size={22} />} title="Profile" />
            </Sidebar>

            <main className={`w-full h-full flex flex-col ${activeItemIndex !== 0 ? 'sidebar-active' : ''}`}>
                <div className=' flex w-full items-center gap-4 px-6'>
                    <Header
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        userData={userData}
                    />
                </div>
                <div className='flex h-full main-content'>
                    <div className='flex-grow p-4 bg-purpleWhite rounded-tl-[3rem] rounded-tr-[3rem]'>
                        {selectedContact && (
                            <div className="block xl:hidden py-2 flex w-full h-full">
                                <div className="bg-gray-50 rounded-3xl bottom-h w-full">
                                    <RightSidebarPreview
                                        selectedContact={selectedContact}
                                        onEditClick={() => setActiveItemIndex(5)}
                                        userData={userData}
                                        handleEditContactClick={() => setActiveItemIndex(4)}
                                        handleCloseContactView={handleCloseContactView}
                                    />
                                </div>
                            </div>
                        )}
                        {activeItemIndex !== null && componentMapping[activeItemIndex]}
                    </div>

                    {
                        (activeItemIndex === 0 || activeItemIndex === 1) && (
                            <div className="hidden xl:block w-[32rem]">
                                <RightSidebarPreview
                                    selectedContact={selectedContact}
                                    setSelectedContact={setSelectedContact}
                                    onEditClick={() => setActiveItemIndex(5)}
                                    userData={userData}
                                    handleEditContactClick={() => setActiveItemIndex(4)}
                                    onUpdateContact={onUpdateContact}
                                />
                            </div>
                        )
                    }
                </div>
            </main>
        </div>
    )
}

export default DashboardPage;
