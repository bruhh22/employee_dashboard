import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated, getUser } from '../utils/auth';

export default function ProtectedRoute({ children, adminOnly = false }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isAuth = isAuthenticated();
        const user = getUser();

        if (!isAuth) {
            router.push('/login');
        } else if (adminOnly && user.role !== 'admin') {
            router.push('/dashboard');
        } else {
            setLoading(false);
        }
    }, [router, adminOnly]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return <>{children}</>;
}