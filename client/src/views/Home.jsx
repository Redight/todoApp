import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

function Home() {
    const {auth} = useAuth()
    return (
        <>
            {auth?.email &&
             <p className='text-2xl text-white'>{auth.email}</p>
            }
            <div className='flex place-content-center mt-96 text-white'>
                <p className='text-bold text-2xl'>Home</p>
            </div>
        </>
    );
}

export default Home;