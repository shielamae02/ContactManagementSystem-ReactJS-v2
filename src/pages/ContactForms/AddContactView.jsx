import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus, FaCheck } from "react-icons/fa";
import { InputField } from "../../components/InputField"; 
import { AddContact } from "../../api/contactService";
import { PromptComponent } from "../../components/promptComponent";

const AddNewContactView = () => {
  const token = sessionStorage.getItem("token");

  const [showPrompt, setShowPrompt] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    contactNumbers: [
      {
        number: "",
        label: "",
      },
    ],
    addresses: [
      {
        details: "",
        label: "",
      },
    ],
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    contactNumbers: [],
    addresses: [],
  });

  const handleInputChange = (e, field, index) => {
    const { name, value } = e.target;
    const updatedData = { ...formData };
    
    if (field === "contactNumbers" || field === "addresses") {
      updatedData[field][index][name] = value;
    } else {
      updatedData[name] = value;
    }

    setFormData(updatedData);
    validateField(name, value, field, index);
  };

  const validateField = (name, value, field, index) => {
    const emailAddressPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const namePattern = /^[a-zA-Z'-]+(?:\s[a-zA-Z'-]+)*$/;
    const numberPattern = /^\d+$/;
    const addressPattern = /^.{2,50}$/;
    const updatedErrors = { ...errors };
  
    if (!value.trim()) {
      let fieldName = "";
      if (name === "firstName") fieldName = "First name";
      else if (name === "lastName") fieldName = "Last name";
      else if (name === "emailAddress") fieldName = "Email Address";
      updatedErrors[name] = `${fieldName} is required`;
    } else if (name === "firstName" && value.length < 2) {
      updatedErrors[name] = "First name must be at least 2 characters long";
    } else if (name === "lastName" && value.length < 2) {
      updatedErrors[name] = "Last name must be at least 2 characters long";
    } else if ((name === "firstName" || name === "lastName") && !namePattern.test(value)) {
      let fieldName = "";
      if (name === "firstName") fieldName = "First name";
      else if (name === "lastName") fieldName = "Last name";
      updatedErrors[name] = `${fieldName} should not contain special characters`;
    } else if (name === "emailAddress" && !emailAddressPattern.test(value)) {
      updatedErrors[name] = "Invalid email address format";
    } else if (name === "number" && (value.length < 3 || value.length > 11 || !numberPattern.test(value))) {
      updatedErrors.contactNumbers = updatedErrors.contactNumbers || [];
      updatedErrors.contactNumbers[index] = {
        ...updatedErrors.contactNumbers[index],
        number: "Contact number should have a minimum of 3 digits, maximum of 11 digits, and no letters allowed",
      };
    } else if (name === "label" && value.length < 2) {
      updatedErrors.contactNumbers = updatedErrors.contactNumbers || [];
      updatedErrors.contactNumbers[index] = {
        ...updatedErrors.contactNumbers[index],
        label: "Contact number label should have a minimum of 2 characters",
      };
    } else if ((name === "details" || name === "label") && !addressPattern.test(value)) {
      updatedErrors.addresses = updatedErrors.addresses || [];
      updatedErrors.addresses[index] = {
        ...updatedErrors.addresses[index],
        details: "Address details and label should be between 2 and 50 characters",
      };
    } else {
      updatedErrors[name] = "";
      if (field === "contactNumbers") {
        updatedErrors.contactNumbers = updatedErrors.contactNumbers || [];
        updatedErrors.contactNumbers[index] = {
          ...updatedErrors.contactNumbers[index],
          number: "",
          label: "",
        };
      } else if (field === "addresses") {
        updatedErrors.addresses = updatedErrors.addresses || [];
        updatedErrors.addresses[index] = {
          ...updatedErrors.addresses[index],
          details: "",
          label: "",
        };
      }
    }
  
    setErrors(updatedErrors);
  };
  
  
  
  

  const addContactNumber = () => {
    setFormData({
      ...formData,
      contactNumbers: [
        ...formData.contactNumbers,
        {
          number: "",
          label: "",
        },
      ],
    });
  };

  const addAddress = () => {
    setFormData({
      ...formData,
      addresses: [
        ...formData.addresses,
        {
          details: "",
          label: "",
        },
      ],
    });
  };

  const deleteContactNumber = (index) => {
    const updatedContactNumbers = [...formData.contactNumbers];
    updatedContactNumbers.splice(index, 1);

    setFormData({
      ...formData,
      contactNumbers: updatedContactNumbers,
    });
  };

  const deleteAddress = (index) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses.splice(index, 1);

    setFormData({
      ...formData,
      addresses: updatedAddresses,
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (token) {
          const response = await AddContact(token, formData);
          setShowPrompt(true);
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching contact details: ", error);
      }
    }
  };

  const validateForm = () => {
    let hasErrors = false;
    const newErrors = {};

    // Validate First Name and Last Name
    for (const field of ["firstName", "lastName"]) {
      const errorMessage = errors[field];
      if (errorMessage) {
        hasErrors = true;
      }
      newErrors[field] = errorMessage;
    }

    // Validate Email Address
    const emailErrorMessage = errors.emailAddress;
    if (emailErrorMessage) {
      hasErrors = true;
    }
    newErrors.emailAddress = emailErrorMessage;

    // Validate Contact Numbers
    formData.contactNumbers.forEach((contact, index) => {
      const numberErrorMessage = errors.contactNumbers[index]?.number;
      const labelErrorMessage = errors.contactNumbers[index]?.label;

      if (numberErrorMessage || labelErrorMessage) {
        hasErrors = true;
      }
      newErrors.contactNumbers = newErrors.contactNumbers || [];
      newErrors.contactNumbers[index] = {
        number: numberErrorMessage,
        label: labelErrorMessage,
      };
    });

    // Validate Addresses
    formData.addresses.forEach((address, index) => {
      const detailsErrorMessage = errors.addresses[index]?.details;
      const labelErrorMessage = errors.addresses[index]?.label;

      if (detailsErrorMessage || labelErrorMessage) {
        hasErrors = true;
      }
      newErrors.addresses = newErrors.addresses || [];
      newErrors.addresses[index] = {
        details: detailsErrorMessage,
        label: labelErrorMessage,
      };
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  return (
    <div className="flex flex-col w-full h-full p-6">
      <div>
        <h1 className="text-[27px] font-semibold pb-4">New Contact</h1>
      </div>
      <div className="px-10 py-6 bg-white h-[750px] max-h-[750px] overflow-y-auto rounded-2xl relative">
        <form className="flex-grow flex flex-col">
          <div className="flex flex-col">
            <div className="flex w-full gap-3">
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
          <div>
            <div className="text-xl font-semibold pt-6 pb-2">Contact Numbers</div>
          </div>
          {formData.contactNumbers.map((contact, index) => (
            <div className="flex items-end gap-3" key={index}>
              <div className="flex w-full gap-3">
                <InputField
                  label="Contact Number"
                  id={`contactNumber_${index}`}
                  name="number"
                  value={contact.number}
                  onChange={(e) => handleInputChange(e, "contactNumbers", index)}
                  error={errors.contactNumbers[index]?.number}
                  type="text"
                />
                <InputField
                  label="Label"
                  id={`label_${index}`}
                  name="label"
                  value={contact.label}
                  onChange={(e) => handleInputChange(e, "contactNumbers", index)}
                  error={errors.contactNumbers[index]?.label}
                  type="text"
                />
              </div>
              {index === formData.contactNumbers.length - 1 ? (
                <button onClick={addContactNumber} className="bg-blue p-4 rounded-lg">
                  <FaPlus size={18} className="text-white" />
                </button>
              ) : (
                <button onClick={() => deleteContactNumber(index)} className="p-3">
                  <IoClose size={22} className="text-red-400" />
                </button>
              )}
            </div>
          ))}
          <div>
            <div className="text-xl font-semibold pt-6 pb-2">Addresses</div>
          </div>
          {formData.addresses.map((address, index) => (
            <div className="flex items-end gap-3" key={index}>
              <div className="flex w-full gap-3">
                <InputField
                  label="Address Details"
                  id={`address_${index}`}
                  name="details"
                  value={address.details}
                  onChange={(e) => handleInputChange(e, "addresses", index)}
                  error={errors.addresses[index]?.details}
                  type="text"
                />
                <InputField
                  label="Label"
                  id={`label_${index}`}
                  name="label"
                  value={address.label}
                  onChange={(e) => handleInputChange(e, "addresses", index)}
                  error={errors.addresses[index]?.label}
                  type="text"
                />
              </div>
              {index === formData.addresses.length - 1 ? (
                <button onClick={addAddress} className="bg-blue p-4 rounded-lg">
                  <FaPlus size={18} className="text-white" />
                </button>
              ) : (
                <button onClick={() => deleteAddress(index)} className="p-3">
                  <IoClose size={22} className="text-red-400" />
                </button>
              )}
            </div>
          ))}
          <div className="pt-6 flex justify-end">
            <button
              onClick={handleContactSubmit}
              type="submit"
              className="flex gap-3 font-medium items-center self-end px-7 py-2 rounded-lg text-white bg-green-400 cursor-pointer shadow-xl"
            >
              <FaCheck className="" />
              Submit
            </button>
          </div>
          {showPrompt && (
            <PromptComponent
              promptTitle="Success!!"
              promptMessage="Contact successfully created! "
              actionItem=""
              closePrompt={() => {
                setShowPrompt(false);
                window.location.reload();
              }}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default AddNewContactView;
