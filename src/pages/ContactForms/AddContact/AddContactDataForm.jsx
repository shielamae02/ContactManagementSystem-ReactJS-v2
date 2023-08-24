import { AddContact } from "../../../api/contactService";
import { useState, useEffect } from "react";
import DummyInputForm from "../dummyInput";

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

    const validateField = (name, value, field, index) => {
      const emailAddressPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const namePattern = /^[a-zA-Z'-]+(?:\s[a-zA-Z'-]+)*$/;
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
      } else {
        updatedErrors[name] = "";
      }
    
      if (field === "contactNumbers" || field === "addresses") {
        updatedErrors[field] = updatedErrors[field] || [];
        updatedErrors[field][index] = updatedErrors[name];
      }
    
      setErrors(updatedErrors);
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