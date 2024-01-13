import React, { useState } from "react";
import s from "./row.module.css";
import { bookShift, cancelShift,fetchShifts } from "../../../store/shiftSlice";
import { useDispatch,useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const BookingRow = ({ data,showBookedText,isOverLapping,isStarted }) => {
    const [bookingInProgress,setBookingInProgress]=useState(false)
    const [cancelInProgress,setCancelInProgress]=useState(false)

    const dispatch=useDispatch()
    // Convert timestamps to time strings
    const startTime = new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(data.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleCancel = async() => {
        setCancelInProgress(true)
        console.log(`Cancelling booking with ID: ${data.id}`);
        let response= await dispatch(cancelShift(data.id));
        console.log(response,"cancelled")
        setCancelInProgress(false)
        dispatch(fetchShifts())
    };
    const handleBook =async()=> {
        console.log(`booking booking with ID: ${data.id}`);
        setBookingInProgress(true)
        let response=await dispatch(bookShift(data.id));
            console.log(response,"reponse")
            setBookingInProgress(false)
        dispatch(fetchShifts())
    }
    console.log(isOverLapping,"SSSS")


    return (
        <div className={s.rowContainer}>
            <span className={s.timeRange}> {isOverLapping}{`${startTime} - ${endTime}`}</span>
            <div>
             {showBookedText && data.booked && <span className={`${s.infotext} ${s.booked}`}>Booked</span>}
             {!data.booked && isOverLapping && <span className={`${s.infotext} ${s.overlap}`}>Overlapping</span>}
             {(data.booked==false)? <button className={`${s.bookedLabel} ${isOverLapping ? s.disabledBtn:""}`} onClick={handleBook}>{bookingInProgress?<CircularProgress color="success" size={20} />:"Book"}</button>: <button className={`${s.cancelButton} ${isStarted ? s.disabledBtn:""}`} onClick={handleCancel}>{cancelInProgress ? <CircularProgress color="secondary" size={20} /> :"Cancel"}</button>}
            </div>
        </div>
    );
};

export default BookingRow;
