import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEyeOff, FiEye } from 'react-icons/fi';

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const [emailError, setEmailError] = useState(""); 
    const [passwordError, setPasswordError] = useState(""); 

    useEffect(() => {
        const token = sessionStorage.getItem("key");
        if (token) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const validateEmail = (email) => {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if(!email.trim()){
            setEmailError("Email address is required");
        }
        if (!emailPattern.test(email)) {
            setEmailError("Invalid email format"); 
            return false;
        }

        setEmailError("");
        return true;
    }

    const validatePassword = (password) => {
        if(!password.trim()){
            setPasswordError("Password is required");
        }
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long"); 
            return false;
        }
        setPasswordError(""); 
        return true;
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    }

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (isEmailValid && isPasswordValid) {
            console.log(email);
            console.log(password);
        }
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-gray-200">
            <div className='w-3/5 h-4/5 rounded-3xl bg-white border-gray-300 flex shadow-xl p-4'>
                <div className="hidden xl:block bg-oceanBlue h-full w-3/5 rounded-tl-3xl rounded-bl-3xl">
                </div>

                <div className="flex flex-col justify-center h-full w-full rounded-tr-xl rounded-br-xl bg-white px-10 xl:px-18">
                    <h1 className="text-4xl text-center text-dustyBlack font-bold">
                        Hello again
                        <span className="text-mistyBlue">!</span>
                    </h1>
                    <form className="flex flex-col mt-10 mb-3 gap-2">
                        <div className="w-full">
                            <label className="block text-gray-500 text-sm mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                className={`text-xl rounded-md p-4 bg-gray-100 w-full focus:border focus:border-mistyBlue focus:outline-none} 
                                    ${emailError ? "border border-red-400" : ""}`}
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                type="email"
                                placeholder="Email Address"
                                required
                            />
                            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                        </div>

                        <div className="w-full relative flex flex-col">
                            <label className="block text-gray-500 text-sm mb-1" htmlFor="password">
                                Password
                            </label>
                            <div className="relative w-full">
                                <input
                                    className={`text-xl rounded-md p-4 bg-gray-100 w-full focus:border focus:border-mistyBlue focus:outline-none} 
                                    ${emailError ? "border border-red-400" : ""}`}
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                                >
                                    {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                                </button>
                            </div>
                            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
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
