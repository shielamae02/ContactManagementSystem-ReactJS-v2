import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { InputField } from '../../components/InputField';
import { LoginService } from '../../api/authService';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailAddress: "",
        password: "",
      });

    const [errors, setErrors] = useState({
    emailAddress: "",
    password: "",
    });


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
          const response = await LoginService(formData);
          console.log(response);
          if(response.status === 200){
            sessionStorage.setItem("token", response.data.token);
            navigate("/dashboard", {replace: true});
          } else if (response.status === 401) {
            newErrors.password = "Wrong password.";
          } else if (response.status === 404) {
            newErrors.emailAddress = "User does not exist.";
            newErrors.password = "";
          } 
          else {
            console.log("Internal server error.");
          }
      }
  
      // Set the new errors
      setErrors(newErrors);
  };
  

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = (e) => {
      e.preventDefault();
      setShowPassword(!showPassword);
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token !== null) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    
    const validateField = (field, value) => {
        const emailAddressPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!value.trim()) {
          let fieldName = "";
            if (field === "emailAddress")
              fieldName = "Email Address";
            else if (field === "password")
              fieldName = "Password";
            return  `${fieldName} is required`;
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
            <div className='w-3/5 h-[90%] rounded-3xl bg-white border-gray-300 flex shadow-xl'>
                <div className="hidden xl:block bg-oceanBlue h-full w-3/5 rounded-tl-3xl rounded-bl-3xl">
                </div>

                <div className="flex flex-col justify-center h-full w-full rounded-tr-3xl rounded-br-3xl bg-white px-10 xl:px-18">
                    <h1 className="text-4xl text-center text-dustyBlack font-bold">
                        Welcome back
                        <span className="text-mistyBlue">!</span>
                    </h1>
                    <form className="flex flex-col mt-10 mb-3 gap-2">
                        <div className="w-full">
                            <InputField
                                id="emailAddress"
                                name="emailAddress"
                                label="Email"
                                type="emailAddress"
                                value={formData.emailAddress}
                                error={errors.emailAddress}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="w-full flex flex-col">
                            <div className="relative w-full">
                                <InputField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    error={errors.password}
                                    onChange={handleInputChange}
                                />
                                <button
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-2/3 right-4 -translate-y-1/2 cursor-pointer"
                                >
                                    {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                                </button>
                            </div>
                        </div>

                        <button onClick={handleFormSubmit} type='submit' className='bg-oceanBlue text-white font-semibold py-5 rounded-lg mt-6'> Login </button>
                    </form>

                    <h3 className='text-base text-center'>
                        Don't have an account?
                        <span className='text-mistyBlue font-semibold text-base'>
                            <Link to="/signup"> Sign up</Link>
                        </span>
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
