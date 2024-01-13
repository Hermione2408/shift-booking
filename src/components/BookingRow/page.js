import React from "react";
import s from "./row.module.css";

const BookingRow = ({ data }) => {
    // Convert timestamps to time strings
    const startTime = new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(data.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleCancel = () => {
        // Implement cancellation logic here
        console.log(`Cancelling booking with ID: ${data.id}`);
    };

    return (
        <div className={s.rowContainer}>
            <span className={s.timeRange}>{`${startTime} - ${endTime}`}</span>
            <span className={s.bookedLabel}>Booked</span>
            <button className={s.cancelButton} onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default BookingRow;
