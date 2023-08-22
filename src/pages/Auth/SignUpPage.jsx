import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEyeOff, FiEye } from 'react-icons/fi';

// Custom input component with validation
const InputField = ({ id, name, label, type, value, error, onChange }) => (
  <div className="w-full">
    <label className="block text-gray-500 text-[13px] mb-1" htmlFor={id}>
      {label}
    </label>
    <input
      className={`text-xl rounded-md p-4 bg-gray-100 w-full focus:border focus:border-mistyBlue focus:outline-none ${
        error ? 'border border-red-700' : ''
      }`}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={label}
      required
    />
    {error && <p className="text-red-500 text-[13px]">{error}</p>}
  </div>
);

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  useEffect(() => {
    const token = sessionStorage.getItem('key');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const validateField = (field, value) => {
    
    if (!value.trim()) {
        let fieldName = "";
        if (field === "firstName")
          fieldName = "First name";
        else if (field === "lastName")
          fieldName = "Last name";
        else if (field === "userName")
          fieldName = "Username";
        else if (field === "email")
          fieldName = "Email";
        else if (field === "password")
          fieldName = "Password";
        else if (field === "confirmPassword")
          fieldName = "Confirm Password";
      
        return fieldName ? `${fieldName} is required` : "Field is required";
      }
    if (field === 'firstName' && value.length < 2) {
      return `${field} must be at least 2 characters long`;
    }
    if (field === 'email' && !emailPattern.test(value)) {
      return `Invalid ${field} format`;
    }
    if (field === 'password' && value.length < 6) {
      return `${field} must be at least 6 characters long`;
    }
    if (field === 'confirmPassword' && value !== formData.password) {
      return 'Passwords do not match';
    }
    return '';
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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
    } else {
      console.log('Form contains errors.');
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-200">
      <div className="w-3/5 h-[90%] rounded-3xl bg-white border-gray-300 flex shadow-xl p-4">
        <div className="flex flex-col justify-center h-full w-full rounded-tr-xl rounded-br-xl bg-white px-10 xl:px-18">
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
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              error={errors.email}
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
                <button onClick={togglePasswordVisibility} className="absolute top-[58%] right-4 -translate-y-1/2 cursor-pointer ">
                    {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22}/>}
                </button>
            </div>
            <div className='relative'>
            <InputField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPasswordpassword}
                error={errors.confirmPasswordpassword}
                onChange={handleInputChange}
                />
                <button onClick={toggleConfirmPasswordVisibility} className="absolute top-[65%] right-4 -translate-y-1/2 cursor-pointer ">
                    {showConfirmPassword ? <FiEyeOff size={22} /> : <FiEye size={22}/>}
                </button>
            </div>
            <button onClick={handleFormSubmit} type="submit" className="bg-oceanBlue text-white font-semibold py-5 rounded-lg mt-6">
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
        <div className="hidden 2xl:block bg-oceanBlue h-full w-3/5 rounded-tr-3xl rounded-br-3xl"></div>
      </div>
    </div>
  );
};

export default SignupPage;
