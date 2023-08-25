const DummyInputForm = () => {
    return (
        <div className="w-full">
            <label className="block text-gray-500 text-[13px] mb-1" htmlFor="firstName">
                FirstName
            </label>
            <input
                className={`text-xl rounded-md p-4 bg-gray-100 w-full focus:border focus:border-mistyBlue `}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                required
            />
        </div>
    );
};

export default DummyInputForm;
