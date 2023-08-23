import Sidebar, { SidebarItem } from "../../components/sidebar";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../Header/HeaderSection";
import HomeView from '../Home/HomeView';
import RightSidebarPreview from "../RightSideBar/RightSidebarPreview";
import FavoritesPage from "../Favorites/FavoritesPage";
import { BiSolidDashboard } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';

const DashboardPage = () => {

    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if(token === null){
            navigate("/login");
        } 
    }, [token]);

    const [activeItemIndex, setActiveItemIndex] = useState(0);


    const componentMapping = {
        0 : <HomeView />,
        1 : <FavoritesPage />
    }

    return (
        <div className="flex w-screen h-screen bg-gray-50 relative">
                 <Sidebar 
                    item = {activeItemIndex} 
                    setItemIndex = {setActiveItemIndex}
                >
                    <SidebarItem icon={<BiSolidDashboard size={22}/>} title="Dashboard"/>
                    <SidebarItem icon={<FaHeart size={22}/>} title="Favorites"/>
                </Sidebar>

            <main className="w-full h-full flex flex-col">
                <div className=' flex w-full items-center gap-4 px-6'>
                    <Header />
                </div>
                <div className='flex h-full'>
                    <div className='bg-gray-400 flex-grow block md:hidden'>
                        list mobile
                    </div>
                    <div className=' flex-grow hidden md:block p-4 bg-purpleWhite rounded-tl-[3rem] rounded-tr-[3rem]'>
                        {componentMapping[activeItemIndex]}
                    </div>
                    <div className="hidden xl:block w-[32rem]">
                        <RightSidebarPreview />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardPage;