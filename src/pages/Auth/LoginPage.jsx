import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';   
import { FiEyeOff, FiEye } from 'react-icons/fi';

const LoginPage = () => {   
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    useEffect(() => {
        const token = sessionStorage.getItem("key");
        if (token){
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await LoginService(email, password);
        
        if(response.status === 200){
            console.log(response.data.token);
            sessionStorage.setItem("key", response.data.token);
            navigate("/", { replace: true });
        }
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-gray-200">
            <div className='w-3/5 h-4/5 rounded-3xl bg-white border-gray-300 flex shadow-xl p-4'>
                <div className="hidden xl:block bg-oceanBlue h-full w-3/5 rounded-tl-3xl rounded-bl-3xl">
                </div>

                <div className="flex flex-col justify-center h-full w-full rounded-tr-xl rounded-br-xl bg-white px-1 xl:px-20">
                    <h1 className="text-4xl text-center text-dustyBlack font-bold">
                        Hello again
                        <span className="text-mistyBlue">!</span>
                    </h1>
                    <form className="flex flex-col gap-1.5 mt-10 mb-5">
                    <div className="w-full">
                        <label className="block text-gray-500 text-sm mb-1" htnmlfor="email">
                            Email
                        </label>
                        <input
                            className={`text-xl rounded-md p-4 bg-gray-100 w-full focus:border-mistyBlue focus:border-1 focus:outline-none}`}
                            id = "email"
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            type = "email"
                            placeholder = "Email Address" 
                            required
                        />
                    </div>
                    <div className="w-full relative flex flex-col">
                            <label className="block text-gray-500 text-sm mb-1" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className={`text-xl rounded-md p-4 bg-gray-100 w-full focus:border-mistyBlue focus:border-1 focus:outline-none`}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                        </div>
                        <button type='submit' className='bg-oceanBlue text-white font-semibold py-5 rounded-lg mt-6'> Login </button>
                    </form>
                    <h3 className='text-sm text-center'>
                        Don't have an account? 
                        <span className='text-mistyBlue font-bold'>
                            <Link to ="/signup"> Sign up</Link>
                        </span>
                    </h3>
                </div>

            </div>
        </div>
    )
}

export default LoginPage;