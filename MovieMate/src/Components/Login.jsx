import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend_Url } from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    
        const login =async(e)=>{
            e.preventDefault()
            try{
                const response = await axios.post(`${backend_Url}/login`,{
                    username,
                    password
                })
                if(response.status===200){
                    localStorage.setItem('token',response.data.token)
                    toast.success('Login Successful!')
                    setTimeout(()=>{
                        navigate("/");
                    },2000)
                    
                }
            }
            catch(e){
                if (e.response?.status === 404) {
                    toast.error('User not found')
                }else if(e.response?.status === 411){
                    toast.error('Invalid Credentials')
                }
            }
        }
        

    
    return(
        <section className="min-h-screen flex items-center justify-center bg-slate-600">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full max-w-md">
                <a href="#" className="flex items-center mb-6 text-4xl font-bold text-white dark:text-white">
                    Login
                </a>
                <div className="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        
                        <form className="space-y-4 md:space-y-6" onSubmit={login}>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                            >
                                Sign in
                            </button>
                            
                        </form>
                    </div>
                </div>
            </div>
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
    )
}