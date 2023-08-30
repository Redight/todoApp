import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link, redirect } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState()

    const handleDelete = async (uuid) => {
        await axios({
            method: 'delete',
            url: `http://localhost:8000/users/${uuid}`
        })
        const updatedUsers = users.filter(user => user.uuid !== uuid);
        setUsers(updatedUsers)
    }

    function isMale(gender) {
        if(gender == 'Male'){
            return(
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://api.dicebear.com/6.x/pixel-art/svg" alt="Bonnie image"/>
            )
        } else {
            return(
                <img className="w-24 h-24" src="https://api.dicebear.com/6.x/pixel-art/svg?seed=John" alt="" />
            )
        }
    }
    
    useEffect( () => {
            
        axios.get('/users',{
          })
            .then(function (response) {
              setUsers(response.data)
            });
    }, []);
    return (
        <>
            <div className='flex flex-col gap-10 mt-12 bg-gray-100 mx-24 p-6 rounded-lg'>
                <div className="flex flex-shrink self-center bg-white">
                    <h1 className='text-2xl px-16 py-4 border-2 border-gray-700'>Users</h1>
                </div>
                <div className="flex flex-row place-content-center flex-wrap gap-x-24 gap-y-10 place-items-center">

                    {users?.map((user) => (
                        <div key={user.uuid} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800">
                            <div className="flex justify-end px-4 pt-4">
                                <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                                    <span className="sr-only">Open dropdown</span>
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                    </svg>
                                </button>
                                <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2" aria-labelledby="dropdownButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                    </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex flex-col items-center pb-10">
                                {isMale(user.gender)}                                
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.firstname} {user.lastname}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{user.role}</span>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <Link className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-slate-800 bg-gray-200 rounded-lg hover:scale-115 duration-150 focus:outline-none focus:ring-blue-300' to={`/users/${user.uuid}`}> Details </Link>
                                    <button
                                        onClick={() => handleDelete(user.uuid)}
                                        href="#"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
 
export default Users;