"use client"
import React,{useState,useEffect,useMemo} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { fetchShifts } from '../../../store/shiftSlice';
import s from './availableShifts.module.css'; 
import { categorizedShifts } from '@/utils/functions';
import BookingRow from '@/components/BookingRow/page';
const AvailableShifts=()=>{
    const dispatch = useDispatch();
    const allShifts = useSelector(state => state.shifts.items);
    const bookedShifts = useSelector(state => state.shifts.bookedShifts)
    const loading = useSelector(state => state.shifts.loading);
    const error = useSelector(state => state.shifts.error);
    const [groupedData,setGroupedData] = useState({})
    const [cities,setCitiesData] = useState('')
    const [selectedCity,setSelectedCity] = useState("")
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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log(allShifts)
    console.log(bookedShifts) 
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
                        {city}
                    </div>
                )
            })}
           </div>
           <div>
            {
                dataToRender && Object.keys(dataToRender).map((category,i)=>{
                    console.log(category)
                    return(
                        <div>
                            asbdsb
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
        </div>
    )
}

export default AvailableShifts