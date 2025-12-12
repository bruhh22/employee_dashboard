import Link from 'next/link';
import { useRouter } from 'next/router';
import { removeToken, getUser } from '../utils/auth';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };

    return (
        <nav className="bg-white shadow mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-gray-800">Shift Board</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user && (
                            <>
                                <span className="text-gray-600">Hello, {user.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-600 hover:text-red-800 font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}