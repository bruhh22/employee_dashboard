import { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import ShiftTable from '../components/ShiftTable';
import api from '../utils/api';

export default function Dashboard() {
    const [shifts, setShifts] = useState([]);

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const { data } = await api.get('/api/shifts');
                setShifts(data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchShifts();
    }, []);

    return (
        <ProtectedRoute>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Shifts</h1>
                <ShiftTable shifts={shifts} isAdmin={false} />
            </div>
        </ProtectedRoute>
    );
}