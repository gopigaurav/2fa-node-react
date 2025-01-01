import React, { useEffect, useState } from 'react';
import { setup2FA } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TwoFASetup = ({ onSetupComplete }) => {
    const [response, setResponse] = useState({});
    const navigate = useNavigate();

    const fetchQRCode = async () => {
        try {
            const { data, status } = await setup2FA();
            console.log(data);
            if (status === 200) {
                setResponse(data);
            } else if (status === 401) {
                toast.error('Unauthorized. Please login again.');
                navigate('/login');
            } else {
                toast.error('Something went wrong. Please try again later.');
                navigate('/login');
            }
        } catch (error) {
            toast.error('Error fetching 2FA setup. Please try again.');
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchQRCode();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 p-8">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Set up Two-Factor Authentication
                </h2>
                <div className="bg-gray-100 rounded-lg p-6 mb-6">
                    <p className="text-center text-gray-700 mb-4">
                        Scan the QR code below using your authenticator app.
                    </p>
                    <div className="flex justify-center mb-6">
                        {response.qrCode ? (
                            <img src={response.qrCode} alt="QR Code" className="w-32 h-32" />
                        ) : (
                            <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">Loading...</span>
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-center text-gray-700 mb-4">
                    Once scanned, enter the code from your authenticator app below.
                </p>
                {/* <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        placeholder="Enter code here"
                        className="p-3 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div> */}
                <div className="flex justify-center">
                    <button
                        onClick={onSetupComplete}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};
 
export default TwoFASetup;
