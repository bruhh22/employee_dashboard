import api from '../utils/api';

export default function ShiftTable({ shifts, onDelete, isAdmin }) {
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this shift?')) {
            try {
                await api.delete(`/api/shifts/${id}`);
                onDelete(); // Refresh list
            } catch (err) {
                alert('Failed to delete');
            }
        }
    };

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">Employee ID</th>
                        <th className="px-6 py-3">Employee</th>
                        <th className="px-6 py-3">Dept</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Time</th>
                        <th className="px-6 py-3">Duration</th>
                        {isAdmin && <th className="px-6 py-3">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {shifts.map((shift) => {
                        // Calculate duration for display
                        const start = shift.startTime.split(':').map(Number);
                        const end = shift.endTime.split(':').map(Number);
                        const durationMin = (end[0] * 60 + end[1]) - (start[0] * 60 + start[1]);
                        const hours = Math.floor(durationMin / 60);

                        return (
                            <tr key={shift._id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    {shift.employeeId?.code || 'N/A'}
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {shift.employeeId?.name || 'Unknown'}
                                </td>
                                <td className="px-6 py-4">{shift.employeeId?.department}</td>
                                <td className="px-6 py-4">{shift.date}</td>
                                <td className="px-6 py-4">
                                    {shift.startTime} - {shift.endTime}
                                </td>
                                <td className="px-6 py-4">{hours} hrs</td>
                                {isAdmin && (
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(shift._id)}
                                            className="font-medium text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                    {shifts.length === 0 && (
                        <tr>
                            <td colSpan="6" className="px-6 py-4 text-center">No shifts found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}