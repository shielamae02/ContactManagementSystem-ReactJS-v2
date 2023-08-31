import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { InputField } from "../../components/inputField";
import { AddContact } from "../../api/contactService";
import { PromptComponent } from "../../components/promptComponent";
import { TextAreaInputField } from "../../components/textAreaInputField";
import { InputDropdown } from "../../components/inputDropdown";

const AddNewContactView = ({ onAddContact }) => {
  const token = sessionStorage.getItem("token");

  const [showPrompt, setShowPrompt] = useState(false);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    contactNumber1: "",
    numberLabel1: "",
    contactNumber2: "",
    numberLabel2: "",
    contactNumber3: "",
    numberLabel3: "",
    addressDetails1: "",
    addressLabel1: "Home",
    addressDetails2: "",
    addressLabel2: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    contactNumber1: "",
    numberLabel1: "",
    contactNumber2: "",
    numberLabel2: "",
    contactNumber3: "",
    numberLabel3: "",
    addressDetails1: "",
    addressLabel1: "",
    addressDetails2: "",
    adderssLabel2: ""
  });


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['firstName', 'lastName', 'emailAddress', 'contactNumber1', 'numberLabel1', 'addressDetails1'];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (formData[field].trim() === '') {
        newErrors[field] = `Field is required`;
      } else {
        newErrors[field] = '';
      }
    });

    // Update optional fields to null if they are empty
    const formDataWithNull = Object.entries(formData).reduce((acc, [key, value]) => {
      if (!requiredFields.includes(key) && value.trim() === '') {
        acc[key] = null;
      } else {
        // Check if value is a string before calling trim
        acc[key] = typeof value === "string" ? (value.trim() === "" ? null : value) : value;
      }
      return acc;
    }, {});

    // Validate all fields and update errors
    for (const field in formDataWithNull) {
      if (!requiredFields.includes(field)) {
        const errorMessage = validateField(field, formDataWithNull[field]);
        newErrors[field] = errorMessage;
      }
    }

    // Sets default values to labels if their corresponding fields have values
    if (formDataWithNull.contactNumber2 !== null && formDataWithNull.numberLabel2 === null) {
      formDataWithNull.numberLabel2 = "Phone"
    }
    if (formDataWithNull.contactNumber3 !== null && formDataWithNull.numberLabel3 === null) {
      formDataWithNull.numberLabel3 = "Phone"
    }
    if (formDataWithNull.addressDetails2 !== null && formDataWithNull.addressLabel2 === null) {
      formDataWithNull.addressLabel2 = "Home"
    }
    

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      try {
        if (validateForm() && token) {
          const response = await AddContact(token, formDataWithNull);
          if(response.status === 201){
              setFormData(response);
              onAddContact();
              setShowPrompt(true);
          }
        }
      } catch (error) {
        console.error("Error adding contact: ", error);
      }
    }

    setErrors(newErrors);
  };


  const validateField = (field, value) => {
    const emailAddressPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const namePattern = /^[a-zA-Z'-]+(?:\s[a-zA-Z'-]+)*$/;
    const numberPattern = /^[0-9]+$/;

    if (value == null) {
      return ""; 
    }


    if (typeof value === 'string' && !value.trim()) {
      let fieldName = "";
      switch (field) {
        case "firstName":
          fieldName = "First name";
          break;
        case "lastName":
          fieldName = "Last name";
          break;
        case "emailAddress":
          fieldName = "Email Address";
          break;
        case "addressDetails1":
        case "numberLabel1":
        case "contactNumber1":
        case "addressLabel1":
          fieldName = "Required field"; 
          break;
        default:
          return "";
      }

      if (field === "firstName" || field === "lastName" || field === "emailAddress" || field === "addressDetails1" ||
        field === "numberLabel1" || field === "contactNumber1" || field === "addressLabel1") {
        return `Field is required`;
      }

      return ""; // Optional fields won't trigger an error for empty values
    }

    if (field === "firstName" && !namePattern.test(value)) {
      return `First name should not contain special characters or numbers`;
    }
    if (field === "lastName" && !namePattern.test(value)) {
      return `Last name should not contain special characters or numbers`;
    }
    if ((field === "contactNumber1" || field === "contactNumber2" || field === "contactNumber3") && !numberPattern.test(value)) {
      return `Contact number should not contain special characters or letters`;
    }
    if (value.length < 3) {
      if (field === "contactNumber1" || field === "contactNumber2" || field === "contactNumber3")
        return "Contact number must be at least 3 digits long";
    }

    if (value.length < 2 && field !== "emailAddress") {
      let fieldName = "";
      switch (field) {
        case "firstName":
          fieldName = "First name";
          break;
        case "lastName":
          fieldName = "Last name";
          break;
        case "numberLabel1":
          fieldName = "Contact label";
          break;
        case "addressDetails1":
          fieldName = "Address details";
          break;
        case "addressLabel1":
          fieldName = "Address label";
          break;
        default:
          break;
      }
      return `${fieldName} must be at least 2 characters long`;
    }

    if (value.length > 11) {
      if (field === "contactNumber1") return "Contact number must not exceed 11 digits";
    }

    if (field === "emailAddress" && !emailAddressPattern.test(value)) {
      return `Invalid email address format`;
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
    <div className="flex flex-col w-full h-full px-1 2xl:p-6">
      <div className="justify-between flex items-center">
        <h1 className="text-[27px] font-semibold p-4">New Contact</h1>
      </div>
      <div className="px-4 2xl:px-20 py-16 bg-white  max-h-[825px] shadow-md overflow-y-auto rounded-2xl relative">
        <form className="flex-grow flex flex-col" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row w-full gap-3">
              <InputField
                label="First Name"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
                error={errors.firstName}
                type="text"
              />
              <InputField
                label="Last Name"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
                error={errors.lastName}
                type="text"
              />
            </div>
            <InputField
              label="Email address"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={(e) => handleInputChange(e, "emailAddress")}
              error={errors.emailAddress}
              type="email"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xl font-semibold pt-8 pb-2">Contact Numbers</div>
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="w-full md:w-1/3 mb-3 md:mb-0">
                <InputField
                  label="Label"
                  id="numberLabel1"
                  name="numberLabel1"
                  value={formData.numberLabel1}
                  onChange={(e) => handleInputChange(e, "numberLabel1")}
                  error={errors.numberLabel1}
                  type="text"
                />
              </div>
              <div className="w-full md:w-2/3">
                <InputField
                  label="Contact Number"
                  id="contactNumber1"
                  name="contactNumber1"
                  value={formData.contactNumber1}
                  onChange={(e) => handleInputChange(e, "contactNumber1")}
                  error={errors.contactNumber1}
                  type="text"
                />
              </div>
            </div>
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="w-full md:w-1/3 mb-3 md:mb-0">
                <InputField
                  label="Label"
                  id="numberLabel2"
                  name="numberLabel2"
                  value={formData.numberLabel2}
                  onChange={(e) => handleInputChange(e, "numberLabel2")}
                  error={errors.numberLabel2}
                  type="text"
                />
              </div>
              <div className="w-full md:w-2/3">
                <InputField
                  label="Contact Number"
                  id="contactNumber2"
                  name="contactNumber2"
                  value={formData.contactNumber2}
                  onChange={(e) => handleInputChange(e, "contactNumber2")}
                  error={errors.contactNumber2}
                  type="text"
                />
              </div>
            </div>
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="w-full md:w-1/3 mb-3 md:mb-0">
                <InputField
                  label="Label"
                  id="numberLabel3"
                  name="numberLabel3"
                  value={formData.numberLabel3}
                  onChange={(e) => handleInputChange(e, "numberLabel3")}
                  error={errors.numberLabel3}
                  type="text"
                />
              </div>
              <div className="w-full md:w-2/3">
                <InputField
                  label="Contact Number"
                  id="contactNumber3"
                  name="contactNumber3"
                  value={formData.contactNumber3}
                  onChange={(e) => handleInputChange(e, "contactNumber3")}
                  error={errors.contactNumber3}
                  type="text"
                />
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-3">
            <div className="text-xl font-semibold pt-8 pb-2">Addresses</div>
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="flex flex-col w-full md:flex-1 gap-3">
                <InputDropdown
                  formData={formData.addressLabel1}
                  setFormData={setFormData}
                  name="addressLabel1"
                  initialValue="Home"
                />
                <TextAreaInputField
                  label="Address"
                  id="addressDetails1"
                  name="addressDetails1"
                  value={formData.addressDetails1}
                  onChange={(e) => handleInputChange(e, "addressDetails1")}
                  error={errors.addressDetails1}
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full md:flex-1 gap-3 md:mt-0">
                <InputDropdown
                  formData={formData.addressLabel2}
                  setFormData={setFormData}
                  name="addressLabel2"
                  initialValue="Home"
                />
                <TextAreaInputField
                  label="Address"
                  id="addressDetails2"
                  name="addressDetails2"
                  value={formData.addressDetails2}
                  onChange={(e) => handleInputChange(e, "addressDetails2")}
                  error={errors.addressDetails2}
                  type="text"
                />
              </div>
            </div>

          </div>
          <div className="pt-6  flex justify-end">
            <button
              type="submit"
              className="flex gap-3 font-medium items-center self-end px-8 py-3 rounded-lg text-white bg-green-400 cursor-pointer shadow-xl">
              <FaCheck className="" />
              Submit
            </button>
          </div>
        </form>
        {showPrompt && (
          <PromptComponent
            promptTitle="Success!!"
            promptMessage="Successfully created contact!"
            actionItem=""
            closePrompt={() => {
              setShowPrompt(false);
              window.location.reload();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AddNewContactView;