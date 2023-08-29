import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { InputField } from '../../components/InputField';
import { SignUpService } from '../../api/authService';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });
  

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  }
  
  const handleFormSubmit = async (e) => {
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
      const response = await SignUpService(formData);
      console.log(response);
      if (response.status === 201) {
        sessionStorage.setItem("token", response.data.token);
        navigate("/dashboard", { replace: true });
      } else if (response.status === 401) {
        newErrors.password = "Wrong password.";
      } else if (response.status === 409) {
        newErrors.emailAddress = "User already exists.";
      } else {
        console.log("Internal server error.");
      }
    }
  
    // Set the new errors
    setErrors(newErrors);
  };
  
  
  const emailAddressPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const namePattern = /^[a-zA-Z'-]+(?:\s[a-zA-Z'-]+)*$/;

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token !== null) {
      navigate('/', { replace: true });
    }
  }, []);

  const validateField = (field, value) => {
    
    if (!value.trim()) {
        let fieldName = "";
        if (field === "firstName")
          fieldName = "First name";
        else if (field === "lastName")
          fieldName = "Last name";
        else if (field === "userName")
          fieldName = "Username";
        else if (field === "emailAddress")
          fieldName = "Email Address";
        else if (field === "password")
          fieldName = "Password";
        else if (field === "confirmPassword")
          fieldName = "Confirm Password";
      
        return  `${fieldName} is required`;
      }
    if (value.length < 2 && field !== "emailAddress" && field !=="password" && field !== "confirmPassword") {
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

    if (field === 'emailAddress' && !emailAddressPattern.test(value)) {
      return `Invalid email address format`;
    }
    if (field === 'password' && value.length < 6) {
      return `Password must be at least 6 characters long`;
    }
    if (field === 'confirmPassword' && value !== formData.password) {
      return 'Passwords do not match';
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
    <div className="flex justify-center items-center w-screen h-screen bg-gray-200">
      <div className="w-3/5 h-[90%] rounded-3xl bg-white border-gray-300 flex shadow-xl rounded-tl-3xl rounded-bl-3xl">
        <div className="flex flex-col justify-center h-full w-full rounded-tl-3xl rounded-bl-3xl bg-white p-28 xl:px-18">
          <h1 className="text-4xl text-center text-dustyBlack font-bold">
            Create Account
            <span className="text-mistyBlue">.</span>
          </h1>
          <form className="flex flex-col mt-8 mb-3 gap-2" onSubmit={handleFormSubmit}>
            <div className="w-full flex gap-3">
              <InputField
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                className="text-sm"
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
            <InputField
              id="emailAddress"
              name="emailAddress"
              label="Email Address"
              type="emailAddress"
              value={formData.emailAddress}
              error={errors.emailAddress}
              onChange={handleInputChange}
            />
            <div className='relative'>
                <InputField
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                error={errors.password}
                onChange={handleInputChange}
                />
                <button onClick={togglePasswordVisibility} className="absolute top-[65%] right-4 -translate-y-1/2 cursor-pointer ">
                    {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22}/>}
                </button>
            </div>
            <div className='relative'>
            <InputField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                error={errors.confirmPassword}
                onChange={handleInputChange}
              />
                <button onClick={toggleConfirmPasswordVisibility} className="absolute top-[65%] right-4 -translate-y-1/2 cursor-pointer ">
                    {showConfirmPassword ? <FiEyeOff size={22} /> : <FiEye size={22}/>}
                </button>
            </div>
            <button  type="submit" className="bg-oceanBlue text-white font-semibold py-5 rounded-lg mt-6">
              Sign Up
            </button>
          </form>
          <h3 className="text-base text-center">
            Already have an account?
            <span className="text-mistyBlue font-semibold text-base">
              <Link to="/login"> Log in</Link>
            </span>
          </h3>
        </div>
        <div className="hidden 2xl:block bg-oceanBlue h-full w-2/5 rounded-tr-3xl rounded-br-3xl"></div>
      </div>
    </div>
  );
};

export default SignupPage;
