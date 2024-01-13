import React, { useState } from "react";
import s from "./row.module.css";
import { bookShift, cancelShift,fetchShifts } from "../../../store/shiftSlice";
import { useDispatch,useSelector } from "react-redux";
import {Snackbar,Alert,CircularProgress} from "@mui/material"
const BookingRow = ({ data,showBookedText,isOverLapping,isStarted,isPast,showCity=false }) => {
    const [bookingInProgress,setBookingInProgress]=useState(false)
    const [cancelInProgress,setCancelInProgress]=useState(false)
    const [showSnackbar,setShowSnackBar] = useState({show:false,severity:"info",message:"",autoHideDuration:3000})
    const dispatch=useDispatch()
    const startTime = new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(data.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleCancel = async() => {
        setCancelInProgress(true)
        dispatch(cancelShift(data.id))
        .then((res)=>{
            setShowSnackBar({show:true,severity:"success",message:"Booking cancelled successfully"})
        }).catch((err)=>{
            setShowSnackBar({show:true,severity:"error",message:"Error occured, try again later"})
        }).finally(()=>{
            setCancelInProgress(false)

        })
        dispatch(fetchShifts())
    };
    const handleBook =async()=> {
        setBookingInProgress(true)
        dispatch(bookShift(data.id))
        .then((res)=>{
            console.log(res,"CANCEL")
            setShowSnackBar({...showSnackbar,show:true,severity:"success",message:"Booking done successfully"})
            dispatch(fetchShifts())
        }).catch((err)=>{
            setShowSnackBar({...showSnackbar,show:true,severity:"error",message:"Error occured, try again later"})
        }).finally(()=>{
            setBookingInProgress(false)
        })
    }

    return (
        <>
        <div className={`${s.rowContainer} ${isPast ? s.pastShift : ''}`}>
            <div className={`${s.sidePadding} ${s.timeAndCityContainer}`}>
                <span className={s.timeRange}> {isOverLapping}{`${startTime} - ${endTime}`}</span>
                {showCity &&<span className={s.city}>{data.area}</span>}
            </div>
            <div className={s.sidePadding}>
             {showBookedText && data.booked && <span className={`${s.infotext} ${s.booked}`}>Booked</span>}
             {!data.booked && isOverLapping && <span className={`${s.infotext} ${s.overlap}`}>Overlapping</span>}
             {data.booked === false ? (
                    <button 
                        className={`${s.bookedLabel} ${isOverLapping || isPast ? s.disabledBtn : ""}`} 
                        onClick={handleBook}
                        disabled={bookingInProgress || isOverLapping || isPast}
                    >
                        {bookingInProgress ? <CircularProgress color="success" size={20} /> : "Book"}
                    </button>
                ) : (
                    <button 
                        className={`${s.cancelButton} ${isStarted || isPast ? s.disabledBtn : ""}`} 
                        onClick={handleCancel}
                        disabled={cancelInProgress || isStarted || isPast}
                    >
                        {cancelInProgress ? <CircularProgress color="secondary" size={20} /> : "Cancel"}
                    </button>
                )}
            </div>
        </div>
        <Snackbar
            open={showSnackbar.show}
            autoHideDuration={showSnackbar.autoHideDuration}
            onClose={()=> {
                setShowSnackBar({show:false})
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert severity={showSnackbar.severity}  onClose={()=> {
                setShowSnackBar({show:false})
            }}>
                {showSnackbar.message}
            </Alert>
            </Snackbar>
        </>
    );
};

export default BookingRow;
