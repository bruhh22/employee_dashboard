import { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import Navbar from '../../components/Navbar';
import ShiftTable from '../../components/ShiftTable';
import ShiftForm from '../../components/ShiftForm';
import api from '../../utils/api';

export default function AdminShifts() {
    const [shifts, setShifts] = useState([]);

    const fetchShifts = async () => {
        try {
            const { data } = await api.get('/api/shifts');
            setShifts(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchShifts();
    }, []);

    return (
        <ProtectedRoute adminOnly={true}>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

                <ShiftForm onSuccess={fetchShifts} />

                <h2 className="text-xl font-semibold mb-4">All Employee Shifts</h2>
                <ShiftTable
                    shifts={shifts}
                    onDelete={fetchShifts}
                    isAdmin={true}
                />
            </div>
        </ProtectedRoute>
    );
}