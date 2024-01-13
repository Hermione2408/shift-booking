'use client'
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShifts } from '../../../store/shiftSlice';

const MyShifts = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.shifts.loading);
    const error = useSelector(state => state.shifts.error);
    const bookedShifts = useSelector(state => state.shifts.bookedShifts);

    useEffect(() => {
        dispatch(fetchShifts());
    }, [dispatch]);

    // Function to format date
    const formatDate = (date) => {
        const options = { month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    // Sort and categorize shifts
    const categorizedShifts = useMemo(() => {
        const sortedShifts = [...bookedShifts].sort((a, b) => a.startTime - b.startTime);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const categories = {
            'Today': [],
            'Tomorrow': []
        };

        sortedShifts.forEach(shift => {
            const shiftDate = new Date(shift.startTime);
            shiftDate.setHours(0, 0, 0, 0);

            if (shiftDate.getTime() === today.getTime()) {
                categories['Today'].push(shift);
            } else if (shiftDate.getTime() === tomorrow.getTime()) {
                categories['Tomorrow'].push(shift);
            } else {
                const dateLabel = formatDate(shift.startTime);
                categories[dateLabel] = categories[dateLabel] || [];
                categories[dateLabel].push(shift);
            }
        });

        return categories;
    }, [bookedShifts]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Shifts</h1>
            {Object.entries(categorizedShifts).map(([category, shifts]) => (
                <div key={category}>
                    <h2>{category}</h2>
                    <ul>
                        {shifts.map(shift => (
                            <li key={shift.id}>
                                {shift.area} - {new Date(shift.startTime).toLocaleString()} to {new Date(shift.endTime).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default MyShifts;
