import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated, getUser } from '../utils/auth';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated()) {
            const user = getUser();
            if (user.role === 'admin') {
                router.replace('/admin/shifts');
            } else {
                router.replace('/dashboard');
            }
        } else {
            router.replace('/login');
        }
    }, [router]);

    return null;
}