"use client"
import React,{useState,useEffect,useMemo} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { fetchShifts } from '../../../store/shiftSlice';
import s from './availableShifts.module.css'; 
import { categorizedShifts } from '@/utils/functions';
import BookingRow from '@/components/BookingRow/page';
import { CircularProgress } from '@mui/material';
import ErrorImage from '@/assets/img/error-svgrepo-com.svg'
import Image from 'next/image';
const AvailableShifts=()=>{
    const dispatch = useDispatch();
    const allShifts = useSelector(state => state.shifts.items);
    const bookedShifts = useSelector(state => state.shifts.bookedShifts)
    const loading = useSelector(state => state.shifts.loading);
    const error = useSelector(state => state.shifts.error);
    const [groupedData,setGroupedData] = useState({})
    const [cities,setCitiesData] = useState('')
    const [selectedCity,setSelectedCity] = useState("")


    const checkOverLapping = (booking) => {
        for (let shift of bookedShifts) {
            if (booking.startTime < shift.endTime && booking.endTime > shift.startTime) {
                return true;
            }
        }
        return false;
    };
    const checkIfStarted = (booking) => {
        const currentTime = Date.now(); // Gets the current time in milliseconds since the Unix Epoch
        return booking.startTime <= currentTime;
    };
    
    

    useEffect(() => {
        dispatch(fetchShifts());
    }, [dispatch]);
    
    useEffect(()=>{
        if(allShifts .length >0){
            const groupByCity = allShifts.reduce((group, item) => {
                const { area } = item;
                group[area] = group[area] ?? [];
                group[area].push(item);
                return group;
            }, {});
            setGroupedData(groupByCity)
            let cities = Object.keys(groupByCity)
            setCitiesData(cities)
            setSelectedCity(cities[0])
        }
    },[allShifts])
    // if (loading) {
    //     return <div className={s.loader}><CircularProgress color="success" size={40} /></div>;
    // }
    if (error) return <div>Error: {error}</div>;
    let dataToRender;  
    if(groupedData && selectedCity){
        dataToRender = categorizedShifts(groupedData[selectedCity])
    }
    return(
        <div>
           <div className={s.cityContainer}>
            {cities && cities.map((city,index)=>{
                return(
                    <div onClick={()=>setSelectedCity(city)} key={index} className={`${s.city} ${selectedCity==city ? s.activeCity : ''}`}>
                        {city} {`(${groupedData?.[city]?.length ?? 0})`}
                    </div>
                )
            })}
           </div>
           <div>
            {
                dataToRender && Object.keys(dataToRender).length>0 ? Object.keys(dataToRender).map((category,i)=>{
                    return(
                        <div>
                        {dataToRender[category] && dataToRender[category].length >0 &&<div className={s.dayLabel} key={category}>{category}</div>}
                        {
                            dataToRender[category] && dataToRender[category].length >0 && dataToRender[category].map((booking)=>{
                                return(<BookingRow data={booking} showBookedText={true} isOverLapping={checkOverLapping(booking)} isStarted={checkIfStarted(booking)}  isPast={booking.isPast}/>)
                            })
                        }
                        </div>
                    )
                }):(
                    <div className={s.loader}>
                        <Image src={ErrorImage} height={112} width={112} />
                        NO shifts available
                        </div>
                )
            }
           </div>
        </div>
    )
}

export default AvailableShifts