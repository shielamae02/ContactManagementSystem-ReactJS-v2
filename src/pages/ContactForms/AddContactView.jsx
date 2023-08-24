import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus, FaCheck } from "react-icons/fa";
import { ContactInputForm } from "../../components/contactInputForm";
import { AddContact } from "../../api/contactService";
import { PromptComponent } from "../../components/promptComponent";

const AddNewContactView = () => {
  const token = sessionStorage.getItem("token");

  const [showPrompt, setShowPrompt] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [contactNumbers, setContactNumbers] = useState([
    {
      number: "",
      label: "",
    },
  ]);

  const [addresses, setAddresses] = useState([
    {
      details: "",
      label: "",
    },
  ]);

  const addContactNumber = () => {
    setContactNumbers([
      ...contactNumbers,
      {
        number: "",
        label: "",
      },
    ]);
  };

  const addAddress = () => {
    setAddresses([
      ...addresses,
      {
        details: "",
        label: "",
      },
    ]);
  };

  const updateContactNumber = (index, field, value) => {
    const updatedContactNumbers = [...contactNumbers];
    updatedContactNumbers[index][field] = value;
    setContactNumbers(updatedContactNumbers);
  };

  const updateAddress = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  const deleteContactNumber = (index) => {
    const updatedContactNumbers = [...contactNumbers];
    updatedContactNumbers.splice(index, 1);
    setContactNumbers(updatedContactNumbers);
  };

  const deleteAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };

  const formData = {
    firstName,
    lastName,
    emailAddress,
    contactNumbers,
    addresses,
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        console.log(formData);
        const response = await AddContact(token, formData);
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching contact details: ", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-6">
      <div>
        <h1 className="text-[27px] font-semibold pb-4">New Contact</h1>
      </div>
      <div className="px-10 py-6 bg-white h-[760px] overflow-y-auto rounded-2xl relative">
        <form className="flex-grow flex flex-col">
          <div className="flex flex-col">
            <div className="flex w-full gap-3">
              <ContactInputForm
                label="First Name"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <ContactInputForm
                label="Last Name"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <ContactInputForm
              label="Email address"
              id="Email address"
              value={emailAddress}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="text-xl font-semibold pt-6 pb-2">
              Contact Numbers
            </div>
            {contactNumbers.map((contact, index) => (
              <div className="flex items-end gap-3" key={index}>
                <div className="flex w-full gap-3">
                  <ContactInputForm
                    label="Contact Number"
                    id={`contactNumber_${index}`}
                    value={contact.number}
                    onChange={(e) =>
                      updateContactNumber(index, "number", e.target.value)
                    }
                  />
                  <ContactInputForm
                    label="Label"
                    id={`label_${index}`}
                    value={contact.label}
                    onChange={(e) =>
                      updateContactNumber(index, "label", e.target.value)
                    }
                  />
                </div>
                {index === contactNumbers.length - 1 ? (
                  <button
                    onClick={addContactNumber}
                    className="bg-blue p-4 rounded-lg"
                  >
                    <FaPlus size={18} className="text-white" />
                  </button>
                ) : (
                  <button
                    onClick={() => deleteContactNumber(index)}
                    className="p-3"
                  >
                    <IoClose size={22} className="text-red-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div>
            <div className="text-xl font-semibold pt-6 pb-2">Addresses</div>
          </div>
          {addresses.map((address, index) => (
            <div className="flex items-end gap-3" key={index}>
              <div className="flex w-full gap-3">
                <ContactInputForm
                  label="Address Details"
                  id={`address_${index}`}
                  value={address.details}
                  onChange={(e) =>
                    updateAddress(index, "details", e.target.value)
                  }
                />
                <ContactInputForm
                  label="Label"
                  id={`label_${index}`}
                  value={address.label}
                  onChange={(e) => updateAddress(index, "label", e.target.value)}
                />
              </div>
              {index === addresses.length - 1 ? (
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
        </form>
      </div>
    </div>
  );
};

export default AddNewContactView;
