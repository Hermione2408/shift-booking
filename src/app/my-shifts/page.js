'use client'
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShifts } from '../../../store/shiftSlice';
import { categorizedShifts } from '@/utils/functions';
import BookingRow from '@/components/BookingRow/page';
import s from "./myShifts.module.css"
import { CircularProgress } from '@mui/material';
const MyShifts = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.shifts.loading);
    const error = useSelector(state => state.shifts.error);
    const bookedShifts = useSelector(state => state.shifts.bookedShifts);

    const getTotalTime = (bookings) => {
        const totalTime = bookings.reduce((total, booking) => {
            return total + (booking.endTime - booking.startTime);
        }, 0);
        
        const totalHours = Math.floor(totalTime / (1000 * 60 * 60));
        const totalMinutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    
        return `${totalHours}H${totalMinutes}M`;
    };
    
    

    useEffect(() => {
        dispatch(fetchShifts());
    }, [dispatch]);

    if (loading) {
        return <div className={s.loader}><CircularProgress color="success" size={40} /></div>;
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
            {
                dataToRender && Object.keys(dataToRender).map((category,i)=>{
                    return(
                        <div>
                        {dataToRender[category] && dataToRender[category].length >0 &&<div className={s.dayLabel}  key={category}><span>{category} </span><span className={s.totalShifts}>{dataToRender[category].length} shifts,</span><span className={s.totalTime}>{getTotalTime(dataToRender[category])} </span></div>}
                        {
                            dataToRender[category] && dataToRender[category].length >0 && dataToRender[category].map((booking)=>{
                                return(<BookingRow showCity data={booking} />)
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
