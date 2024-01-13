"use client"
import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { fetchShifts } from '../../../store/shiftSlice';
const AvailableShifts=()=>{
    const dispatch = useDispatch();
    const availableShifts = useSelector(state => state.availableShifts);
    const bookedShifts = useSelector(state => state.bookedShifts)
    const loading = useSelector(state => state.shifts.loading);
    const error = useSelector(state => state.shifts.error);
    useEffect(() => {
        dispatch(fetchShifts());
    }, [dispatch]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log(shifts)
    return(
        <div>
            AvailableShifts
        </div>
    )
}

export default AvailableShifts