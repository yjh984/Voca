import { Link } from 'react-router-dom';
// import dummy from '../db/data.json';
// import { memo } from 'react';
import useFetch from '../hooks/useFetch';

export default function DayList(){
  // console.log(dummy);
  const days=useFetch('http://localhost:3001/days');
  if(days===undefined){
    return <span>Loading....</span>
  }
  return (
    <>
    <ul className='list_day'>
      {days.map(day=>(
        <li key={day.id}>
          <Link to={`/day/${day.day}`}>Day {day.day}</Link>
        </li>
      ))} 
      {/* //map에서 {}를 사용하면 return ...를 사용해야 함.. 한줄일 땐 ()사용 */}
    </ul>
    </>
  )
};

// export default memo(DayList); //memo로 묶으면.. 전달 param이 update될 때만 동작함.