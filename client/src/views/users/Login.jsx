import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png'
import useAuth from '../../hooks/useAuth';

function Login() {
    const {setAuth} = useAuth();
    const [state, setState] = useState({
        email: "",
        password: ""
      });

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const email = state.email
        const password = state.password
        try {
            const response = await axios.post('/users/login', {
                email: email,
                password: password,
            })
            const accessToken = response.data.accessToken
            const role = response.data.role
            console.log(response)
            setAuth({ email, password, accessToken, role})
            navigate('/users')
        } catch (err) {
            return console.log(err)
        }
    };

    return (
        <>
           <div className="flex place-content-center mt-8">
                <div className="grid bg-gray-200 mt-12 py-10 px-24 gap-12 rounded-lg shadow-xl">
                    <div className="flex justify-center">
                        <img src={logo} className='rounded-2xl w-36' alt="Graddl IO" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col flex-wrap gap-4">
                                <div className="flex flex-col flex-grow">
                                    <label>Email</label>
                                    <input
                                        className={"h-10 focus:scale-105 p-2 duration-300 rounded-md"}
                                        type="text"
                                        name="email"
                                        value={state.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <label>Password</label>
                                    <input
                                        className={"h-10 focus:scale-105 p-2 duration-300 rounded-md"}
                                        type="password"
                                        name="password"
                                        value={state.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-shrink justify-center">
                                <button className='flex-shrink p-2 text-center hover:bg-indigo-800 border-b-2 border-indigo-800 font-bold hover:flex-grow duration-300 text-indigo-800 hover:text-white mt-4' type="submit">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
    
}
 
export default Login;