import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png'


function Register() {
    const [errors, setErrors] = useState([]);
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        gender: ""
      });


    const navigate = useNavigate()

    const validateForm = () => {
        const newErrors = [];
    
        if (!state.firstname) {
          newErrors.push('First Name is required');
        }

        if (!state.lastname) {
          newErrors.push('Last Name is required');
        }
    
        if (!state.email) {
          newErrors.push('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(state.email)) {
          newErrors.push('Email is invalid');
        }

        if (!state.gender) {
          newErrors.push('Gender is required');
        }
    
        if (!state.password) {
          newErrors.push('Password is required');
        } else if (state.password.length < 6) {
          newErrors.push('(Password must be at least 6 characters long');
        }
        
        return newErrors;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            console.log(state);
            try {
                await axios.post('http://localhost:8000/users', {
                    firstname: state.firstname,
                    lastname: state.lastname,
                    email: state.email,
                    password: state.password,
                    gender: state.gender
                  })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                });
            navigate("/login")

            } catch (err) {
                console.log(err.message)
                newErrors.push(err)
            }
          } else {
            setErrors(newErrors);
          }
    };

    return (
        <>
            <div className="flex place-content-center mt-8">
                <div className="grid bg-gray-200 mt-12 p-10 gap-12 rounded-lg shadow-xl">
                    <div className="flex justify-center">
                        <img src={logo} className='rounded-lg hover:rotate-180 duration-300' alt="Graddl IO" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row flex-wrap gap-4">
                                <div className="flex flex-col flex-grow">
                                    <label>Firstname</label>
                                    <input
                                        className={"h-10 focus:scale-105 p-2 duration-300"}
                                        type="text"
                                        name="firstname"
                                        value={state.firstname}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <label>Lastname</label>
                                    <input
                                        className={"h-10 focus:scale-105 p-2 duration-300"}
                                        type="text"
                                        name="lastname"
                                        value={state.lastname}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label>Email</label>
                                <input
                                    className={"h-10 focus:scale-105 p-2 duration-300"}
                                    type="text"
                                    name="email"
                                    value={state.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex flex-row flex-wrap gap-4">
                                <div className="flex flex-col flex-grow sm:w-1/4">
                                    <label>Gender</label>
                                    <input
                                        className={"h-10 focus:scale-105 p-2 duration-300"}
                                        type="text"
                                        name="gender"
                                        value={state.gender}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <label>Password</label>
                                    <input
                                        className={"h-10 focus:scale-105 p-2 duration-300"}
                                        type="password"
                                        name="password"
                                        value={state.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            {errors.length > 0 &&
                                <div className='flex flex-col justify-center bg-yellow-500 text-white px-12 py-4 drop-shadow-lg'>
                                        {errors.map((err) => {
                                            return (
                                                <div className='ease-in duration-200'>
                                                    <li className='ease-in duration-200'>{err}</li>
                                                </div>

                                            )
                                        })}
                                </div>
                            }
                            <div className="flex flex-shrink justify-center">
                                <button className='flex-shrink p-2 text-center hover:bg-indigo-800 border-b-2 border-indigo-800 font-bold hover:flex-grow duration-300 text-indigo-800 hover:text-white mt-6' type="submit">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
    
}
 
export default Register;