import { AddContact } from "../../../api/contactService";
import { useState, useEffect } from "react";
import DummyInputForm from "../dummyInput";
import { InputField } from "../../../components/inputField";

const AddContactDataForm = () => {
    const token = sessionStorage.getItem("token");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        emailAddress: ""
    });

        const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        emailAddress: ""
    });

    const validateField = (field, value) => {
        const emailAddressPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const namePattern = /^[a-zA-Z'-]+(?:\s[a-zA-Z'-]+)*$/;
    
        if (!value.trim()) {
            let fieldName = "";
            if (field === "firstName")
              fieldName = "First name";
            else if (field === "lastName")
              fieldName = "Last name";
            else if (field === "emailAddress")
              fieldName = "Email Address";
            return  `${fieldName} is required`;
          }
        if (value.length < 2) {
          let fieldName = "";
            if (field === "firstName")
              fieldName = "First name";
            else if (field === "lastName")
              fieldName = "Last name";
          return `${fieldName} must be at least 2 characters long`;
        }
    
        if (field === 'firstName' && !namePattern.test(value)) {
          return `First name should not contain special characters`;
        }
        if (field === 'lastName' && !namePattern.test(value)) {
          return `Last name should not contain special characters`;
        }
        if (field === 'emailAddress' && !emailAddressPattern.test(value)) {
          return `Invalid ${field} format`;
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
        <form className="flex flex-col gap-2">
            <div className="flex gap-3">
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
                    id="emailAddress"
                    name="emailAddress"
                    label="Email Address"
                    type="emailAddress"
                    value={formData.emailAddress}
                    error={errors.emailAddress}
                    onChange={handleInputChange}
                />
        </form>
    );
}

export default AddContactDataForm;