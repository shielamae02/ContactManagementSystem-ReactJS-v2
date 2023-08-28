import { UpdateUserDetails } from "../../api/userService";
import { InputField } from "../../components/InputField";
import { PromptComponent } from "../../components/promptComponent";
import { useState } from 'react';
import { FaCheck } from "react-icons/fa";
import DeleteAccount from "./DeleteAccount";

const UpdateUserDataView = ({ userData }) => {
  const token = sessionStorage.getItem("token");
  const [showPrompt, setShowPrompt] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: userData.userName
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: ""
  });

  const handleOnDeleteAccountClick = async (e) => {
    e.preventDefault();
    setShowModal(true);

  }

  const handleUpdateUserDataClick = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate all fields and update errors
    for (const field in formData) {
      const errorMessage = validateField(field, formData[field]);
      newErrors[field] = errorMessage;
    }

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      console.log(formData);
      try {
        if (token) {
          const response = await UpdateUserDetails(token, formData);
          setShowPrompt(true);
          console.log(response);
        }
      } catch (error) {
        console.error("Error updating user details: ", error);
      }
    }

    // Set the new errors
    setErrors(newErrors);
  };
  

  const validateField = (field, value) => {
    const namePattern = /^[a-zA-Z'-]+(?:\s[a-zA-Z'-]+)*$/;

    if (!value.trim()) {
      let fieldName = "";
      if (field === "firstName")
        fieldName = "First name";
      else if (field === "lastName")
        fieldName = "Last name";
      else if (field === "userName")
        fieldName = "Username"
      return `${fieldName} is required`;
    }
    if (value.length < 2) {
      let fieldName = "";
      if (field === "firstName")
        fieldName = "First name";
      else if (field === "lastName")
        fieldName = "Last name";
      else if (field === "userName")
        fieldName = "Username";
      return `${fieldName} must be at least 2 characters long`;
    }

    if (field === 'firstName' && !namePattern.test(value)) {
      return `First name should not contain special characters`;
    }
    if (field === 'lastName' && !namePattern.test(value)) {
      return `Last name should not contain special characters`;
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const errorMessage = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const validateForm = () => {
    let hasErrors = false;
    const newErrors = {};

    for (const field in formData) {
      const errorMessage = validateField(field, formData[field]);
      newErrors[field] = errorMessage;
      if (errorMessage) {
        hasErrors = true;
      }
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  return (
    <div className="flex flex-col w-full h-full p-3 xl:px-6 pt-6 gap-10">
      <div>
        <h1 className="text-[27px] font-semibold pb-4">Update User Profile</h1>
        <div className="px-4 xl:px-10 py-6 bg-white shadow-lg rounded-2xl relative">
          <form className=" flex-grow flex flex-col pt-8">
            <div className="flex flex-col gap-6">
              <div className="flex w-full gap-3">
                <InputField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  type="text"
                  value={formData.firstName}
                  error={errors.firstName}
                  onChange={handleInputChange}
                />
                <InputField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  value={formData.lastName}
                  error={errors.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <InputField
                id="userName"
                name="userName"
                label="Username"
                type="text"
                value={formData.userName}
                error={errors.userName}
                onChange={handleInputChange}
              />
            </div>
            <div className="pt-6  flex justify-end">
              <button onClick={handleUpdateUserDataClick} className="flex gap-3 font-medium items-center self-end px-7 py-3 rounded-lg text-white bg-green-400 cursor-pointer shadow-xl">
                <FaCheck className="" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>  
      {showPrompt && (
        <PromptComponent
          promptTitle="Success!!"
          promptMessage="Successfully updated user profile!"
          actionItem=""
          closePrompt={() => {
            setShowPrompt(false);
            //window.location.reload();
          }}
        />
      )}
      <DeleteAccount userData={userData}/>
    </div>
  )
}

export default UpdateUserDataView;


