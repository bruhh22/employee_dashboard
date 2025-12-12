import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ShiftForm({ onSuccess }) {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        employeeId: '',
        date: '',
        startTime: '',
        endTime: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const { data } = await api.get('/api/employees');
                setEmployees(data.data);
            } catch (err) {
                console.error('Failed to load employees');
            }
        };
        fetchEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await api.post('/api/shifts', formData);
            setFormData({ employeeId: '', date: '', startTime: '', endTime: '' });
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create shift');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-lg font-bold mb-4">Assign New Shift</h2>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Employee</label>
                    <select
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    >
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp._id} value={emp._id}>{emp.name} ({emp.code})</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input
                        type="time"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <input
                        type="time"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    />
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                    >
                        Create Shift
                    </button>
                </div>
            </form>
        </div>
    );
}