'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShifts } from '../../../store/shiftSlice';

const MyShifts = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.shifts.loading);
    const error = useSelector(state => state.shifts.error);
    const bookedShifts = useSelector(state => state.shifts.bookedShifts)
    
    useEffect(() => {
        dispatch(fetchShifts());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
            <h1>Shifts</h1>
            <ul>
                {bookedShifts.map(shift => (
                    <li key={shift.id}>
                        {shift.area} - {new Date(shift.startTime).toLocaleString()} to {new Date(shift.endTime).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyShifts;
