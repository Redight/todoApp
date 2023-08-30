import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
    const navigate = useNavigate()
    const [user, setUser] = useState()

    const handleLogout = () => {
        navigate('/login')
    }

    return(
        <>
        <nav className='bg-white border-gray-200 rounded-b-full'>
            <div className='flex flex-row h-16 justify-between '>
                <ul className="flex">
                        <Link
                            className="hover:bg-yellow-500 hover:text-white duration-200 text-gray-700 px-8 py-4 rounded-bl-full" 
                            to={"/"}
                        >
                            <p className="text-lg">Home</p>
                        </Link>
                        <Link
                            className="hover:bg-yellow-500 hover:text-white duration-200 text-gray-700 px-6 py-4" 
                            to={"/users"}
                        >
                            <p className="text-lg">Users</p>
                        </Link>
                </ul>
                <ul className="flex">
                    <div className="flex">
                        <Link
                            className="hover:bg-yellow-500 hover:text-white duration-200 text-gray-700 px-8 py-4" 
                            to={"/register"}
                        >
                            <p className="text-lg">Register</p>
                        </Link>
                        <Link
                            className="hover:bg-yellow-500 hover:text-white duration-200 text-gray-700 px-8 py-4" 
                            to={"/login"}
                        >
                            <p className="text-lg">Login</p>
                        </Link>

                    </div>
                    <button
                    className="hover:bg-yellow-500 hover:text-white duration-200 text-gray-700 px-8 py-4 rounded-br-full" 
                    onClick={() => handleLogout()}
                    >
                        <p className="text-lg">Logout</p>
                    </button>
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Navbar;