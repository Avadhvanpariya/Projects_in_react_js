import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                // Clear the authorization token from localStorage
                localStorage.removeItem('authorization');

                // Wait briefly to ensure localStorage is updated
                await new Promise(resolve => setTimeout(resolve, 100));

                // Show success message using swal
                Swal.fire({
                    icon: 'success',
                    title: 'Logout Successful',
                    text: 'You have been successfully logged out.',
                });

                navigate('/');
            } catch (error) {
                console.error('Logout failed', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Failed',
                    text: 'An error occurred while logging out. Please try again.',
                });
            }
        };

        performLogout();
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default Logout;
