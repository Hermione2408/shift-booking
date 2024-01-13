'use client'
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShifts } from '../../../store/shiftSlice';
import { categorizedShifts } from '@/utils/functions';
import BookingRow from '@/components/BookingRow/page';
const MyShifts = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.shifts.loading);
    const error = useSelector(state => state.shifts.error);
    const bookedShifts = useSelector(state => state.shifts.bookedShifts);

    useEffect(() => {
        dispatch(fetchShifts());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    let dataToRender;
    if(bookedShifts){
        dataToRender = categorizedShifts(bookedShifts)
    }
    return (
        <div>
            <h1>Shifts</h1>
            {
                dataToRender && Object.keys(dataToRender).map((category,i)=>{
                    return(
                        <div>
                        <div key={category}>{category}</div>
                        {
                            dataToRender[category] && dataToRender[category].length >0 && dataToRender[category].map((booking)=>{
                                return(<BookingRow data={booking} />)
                            })
                        }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default MyShifts;
