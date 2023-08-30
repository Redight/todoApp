import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function User() {
    const [user, setUser] = useState();
    const { uuid } = useParams()

    useEffect(() => {
        async function fetchUsers() {
            try {
                await axios({
                    method: 'get',
                    url: `http://localhost:8000/users/${uuid}`
                  })
                    .then(function (response) {
                      setUser(response.data)
                    });
            } catch (err) {
                console.error('error fetching user details:', err)
            }
        }
        fetchUsers();
    }, []);
    if (user) {
        return (
            <>
                <div key={user.uuid} className='flex flex-row bg-green-200'>
                    <div>
                        <p>Name</p>
                        <p>
                            {user.name}
                        </p>
                    </div>
                    <div>
                        <p>Email</p>
                        <p>
                            {user.email}
                        </p>
                    </div>
                    <div>
                        <p>Role</p>
                        <p>
                            {user.role}
                        </p>
                    </div>
                </div>
            </>
        );
    }
    else{
        return(
            <div>not found</div>
        )
    }
}
