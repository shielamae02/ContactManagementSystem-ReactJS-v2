import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react'

export const InputDropdown = ({ formData, setFormData, handleInputChange, name, initialValue }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(initialValue ?? "Home");
    const [showCustomModal, setShowCustomModal] = useState(false);
    const [inputValue, setInputValue] = useState("" ?? "Home");


    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionClick = (option) => {
        if (option == 'Custom') {
            setShowCustomModal(true);
        } else {
            setSelectedOption(option);
            toggleDropdown();
            setFormData((prevData) => ({
                ...prevData,
                [name]: option
            }));
        }
    }

    return (
        <div className="w-full pt-2">
            <label className="block text-gray-400 font-medium text-xs mb-1" htnmlfor="dropdown">
                Label
            </label>
            <div>
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="
                        text-base bg-gray-100 w-full p-4 text-gray-500
                        rounded-lg text-center flex justify-between items-center"
                        type="button"
                    >
                        {selectedOption}
                        <FaChevronDown size={26} className='text-mistyBlue' />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute top-16 w-full bg-gray-200 divide-y divide-gray-100 rounded-lg shadow">
                            <ul className="py-2 text-smdark:text-gray-200">
                                <li>
                                    <p
                                        onClick={() => handleOptionClick('Home')}
                                        className="block px-4 py-2  hover:bg-gray-700  text-gray-800  dark:hover:text-white">
                                        Home
                                    </p>
                                </li>
                                <li>
                                    <p
                                        onClick={() => handleOptionClick('Work')}
                                        className="block px-4 py-2  hover:bg-gray-700  text-gray-800  dark:hover:text-white">
                                        Work
                                    </p>
                                </li>
                                <li>
                                    <p
                                        onClick={() => {
                                            handleOptionClick('Custom')
                                        }}
                                        className="block px-4 py-2  hover:bg-gray-700 text-gray-800 dark:hover:text-white">
                                        Custom
                                    </p>
                                </li>
                            </ul>
                        </div>
                    )}
                    {showCustomModal &&
                        <CustomModal
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            handleModalClick={(inputValue) => {
                                setSelectedOption(inputValue);
                                setFormData((prevData) => ({
                                    ...prevData,
                                    [name]: inputValue
                                }));

                                setShowCustomModal(false);
                                setDropdownOpen(false);
                                setInputValue(""); 
                            }} />
                    }
                </div>
            </div>
        </div>
    )
}

export const CustomModal = ({ handleModalClick, inputValue, setInputValue }) => {


    const handleSubmit = () => {
        handleModalClick(inputValue);
    }
    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focu5s:outline-none">
            <div className=' bg-gray-900 p-4 rounded-md w-[calc(60%)] 2xl:w-[calc(20%)]'>
                <h1 className='text-xl text-white font-semibold'>Custom label name</h1>
                <input
                    className=' text-white w-full outline-none bg-transparent border-b-2 py-4'
                    placeholder='Label name'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className='flex items-center justify-end gap-3 mt-6'>
                    <p
                        onClick={() => handleModalClick("Home")}
                        className='text-gray-400'>
                        Cancel
                    </p>
                    <p className='text-green-300 font-medium' onClick={handleSubmit}>
                        Submit
                    </p>
                </div>
            </div>
        </div>
    )
}