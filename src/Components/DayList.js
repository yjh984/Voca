import { Link } from 'react-router-dom';
// import dummy from '../db/data.json';
import { memo, useEffect, useState } from 'react';

function DayList(){
  // console.log(dummy);
  const [days, setDays]=useState([]);

  useEffect(()=>{
    fetch('http://localhost:3001/days')
      .then(res=>res.json())
      .then(data=>setDays(data));
  },[]);

  return (
    <ul className='list_day'>
      {days.map(day=>(
        <li key={day.id}>
          <Link to={`/day/${day.day}`}>Day {day.day}</Link>
        </li>
      ))} 
      {/* //map에서 {}를 사용하면 return ...를 사용해야 함.. 한줄일 땐 ()사용 */}
    </ul>
  )
};

export default memo(DayList); //memo로 묶으면.. 전달 param이 update될 때만 동작함.