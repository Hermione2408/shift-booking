import React, { useState } from "react";
import s from "./row.module.css";
import { bookShift } from "../../../store/shiftSlice";
import { useDispatch,useSelector } from "react-redux";

const BookingRow = ({ data }) => {
    const [bookingInProgress,setBookingInProgress]=useState(false)
    const dispatch=useDispatch()
    const loading = useSelector(state => state.shifts.bookingloading);
    // Convert timestamps to time strings
    console.log(data,"data from row")
    const startTime = new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(data.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleCancel = () => {
        // Implement cancellation logic here
        console.log(`Cancelling booking with ID: ${data.id}`);
    };
    const handleBook =async()=> {
        setBookingInProgress(true)
        let response=dispatch(bookShift(data.id));
            console.log(response,"reponse")
            setBookingInProgress(false)

    }

    return (
        <div className={s.rowContainer}>
            <span className={s.timeRange}>{`${startTime} - ${endTime}`}</span>
            {(data.booked==false)? <button className={s.bookedLabel} onClick={handleBook}>{bookingInProgress?"loading":"book"}</button>: <button className={s.cancelButton} onClick={handleCancel}>Cancel</button>}
    
        </div>
    );
};

export default BookingRow;
