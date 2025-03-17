
<head>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1449278693756025"
     crossorigin="anonymous"></script>
</head>
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend_Url } from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from "lucide-react";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword,setShowPassword] =useState(false)
    const navigate = useNavigate();

    const handleForgotPassword =()=>{
        navigate('/updatepassword')
    }

    const handleSignup = () => {
        navigate("/signup");
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        try {
            const trimmedUsername = username.trim();
            const trimmedPassword = password.trim();

            const response = await axios.post(`${backend_Url}/login`, {
                username: trimmedUsername,
                password: trimmedPassword
            });
            console.log(response.data);

            if(response.data.password!=trimmedPassword){

            }

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                toast.success('Login Successful!');
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (e) {
        
            if (e.response?.status === 404) {
                toast.error('User not found. Please check your username.');
            } else if (e.response?.status === 411) {
                toast.error('Incorrect credentials. Please try again.');
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter'&& !loading) {
            handleLogin(e);
        }
    }

    return (
        <>
        
        
        <section className="min-h-fit mt-36 flex items-center justify-center ">
            <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center pt-0  mx-auto lg:py-0 w-full max-w-md">
                <h1 className="flex items-center mb-6 text-4xl font-bold text-white dark:text-white">
                    Login
                </h1>
                <div className="w-full bg-gray-800 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-white dark:text-white" htmlFor="user_identifier">Your Username</label>
                                <input
                                    type="text"
                                    id="user_identifier"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Username"
                                    required
                                    aria-label="Enter your username"
                                    aria-required="true"
                                />
                            </div>
                            <div className="relative w-full">
                            <label className="block mb-1 text-sm font-medium text-white dark:text-white" htmlFor="user_identifier">Your Password</label>
   
                                    <input
                                    type={showPassword ? "text" : "password"}
                                    id="access_code"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Password"
                                    required
                                    aria-label="Enter your password"
                                    aria-required="true"
                                    />

                                    
                                    <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-12 right-3 flex items-center text-gray-500 dark:text-gray-300"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
    
                                
                                <p className="text-white">Create Account? <span onClick={handleSignup} className="text-blue-400 cursor-pointer underline">Signup</span></p>
                                <p className="text-white"> <span onClick={handleForgotPassword} className="text-blue-400 cursor-pointer underline">Forgot Password? </span></p>
                            <button
                                type="submit"
                                className={`w-full text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>
                        {loading && (
                            <div className="text-center mt-4">
                                <svg className="inline mr-2 w-6 h-6 text-blue-600 animate-spin fill-current" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5C100 78.3512 77.6142 100 50 100C22.3858 100 0 78.3512 0 50.5C0 22.6488 22.3858 1 50 1C77.6142 1 100 22.6488 100 50.5Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4036 97.8624 35.9112 96.852 33.5926C91.5942 21.4976 80.9045 12.663 68.1209 9.2186C65.6865 8.57234 63.1458 10.0505 62.5085 12.476C61.8711 14.9015 63.3493 17.4422 65.7748 18.0795C76.9276 21.0996 85.6834 28.6907 89.5928 38.6941C90.6032 41.0127 93.0468 42.1846 95.4722 41.5473L93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            <ToastContainer
                position="top-left"
                autoClose={7000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </section>
        </>
    )
}
