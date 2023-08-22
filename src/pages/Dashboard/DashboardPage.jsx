const DashboardPage = () => {
    return (
        <div className="flex w-screen h-screen bg-gray-50 relative">
            DashboardPage

            <main className={`w-full h-full flex flex-col`}>
                <div className=' flex w-full items-center gap-4 px-6'>
                    header
                </div>
                <div className='flex h-full'>
                    <div className='bg-gray-400 flex-grow block md:hidden'>
                        list mobile
                    </div>
                    <div className=' flex-grow hidden md:block p-4 bg-purpleWhite rounded-tl-[3rem] rounded-tr-[3rem]'>
                        main
                    </div>
                    <div className="hidden xl:block w-[32rem]">
                        user contact views
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardPage;