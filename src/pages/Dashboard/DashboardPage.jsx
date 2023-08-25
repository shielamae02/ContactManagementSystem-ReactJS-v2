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
import { GetContacts } from "../../api/contactService";


const DashboardPage = () => {

    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);
    const [userData, setUserData] = useState({});  


    const componentMapping = {
        0 : <HomeView 
                searchQuery = {searchQuery}
                selectedContact = {selectedContact}
                onContactClick = {(contact) => {
                    setSelectedContact(contact);
                }}
                onAddContactClick={() => setActiveItemIndex(3)}
            />,
        1 : <FavoritesPage />,
        2 : <UserProfileView userData={userData}/>,
        3 : <AddNewContactView />,
        4 : <UpdateContactView selectedContact={selectedContact}/>,
        5 : <UpdateUserDataView userData={userData}/>
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


    useEffect(() => {
        if(token === null){
            navigate("/login");
        } 
        fetchUserData();
    }, [token, selectedContact, userData]);


    return (
        <div className="flex w-screen h-screen bg-gray-50 relative">
                 <Sidebar 
                    item = {activeItemIndex} 
                    setItemIndex = {setActiveItemIndex}
                >
                    <SidebarItem icon={<BiSolidDashboard size={22}/>} title="Dashboard"/>
                    <SidebarItem icon={<FaHeart size={22}/>} title="Favorites"/>
                    <SidebarItem icon={<FaUser size={22}/>}  title="Profile"/>
                </Sidebar>

            <main className="w-full h-full flex flex-col">
                <div className=' flex w-full items-center gap-4 px-6'>
                    <Header 
                        searchQuery={searchQuery} 
                        setSearchQuery={setSearchQuery} 
                    />
                </div>
                <div className='flex h-full'>
                    <div className='bg-gray-400 flex-grow block md:hidden'>
                        list mobile
                    </div>
                    <div className=' flex-grow hidden md:block p-4 bg-purpleWhite rounded-tl-[3rem] rounded-tr-[3rem]'>
                        {componentMapping[activeItemIndex]}
                    </div>
                    <div className="hidden xl:block w-[32rem]">
                        <RightSidebarPreview 
                            selectedContact={selectedContact}
                            onEditClick={() => setActiveItemIndex(5)}
                            userData={userData}
                            handleEditContactClick={() => setActiveItemIndex(4)}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardPage;
