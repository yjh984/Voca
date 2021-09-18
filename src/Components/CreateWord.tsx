import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import useFetch from '../hooks/useFetch';
import Day, { IDay } from './Day';

export default function CreateWord(){
  const {data, isLoading}=useFetch('http://localhost:3001/days');
  const days:IDay[]=data;
  const history=useHistory();
  const [isDo,setIsDo]=useState(false);

  const engRef = useRef<HTMLInputElement>(null); //DOM에 접근하기 위해
  const korRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);

  // setIsLoading(dayLoading);

  function onSubmit(e:React.FormEvent){
    e.preventDefault(); //Form tag는 저장버튼 click시 update되는데.. 이를 방지하기 위해
    setIsDo(true);
    if(!isLoading && engRef.current && korRef.current &&
      dayRef.current){
      // setIsLoading(true);
      const eng=engRef.current.value;
      const kor=korRef.current.value;
      const day=dayRef.current.value;
      fetch(`http://localhost:3001/words/`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eng,
          kor,
          day,
          isDone: false,
        }),
      }).then(res=> {
        if(res.ok) {
          // alert('완료되었습니다.');
          setIsDo(false);
          history.push(`/day/${day}`);
        }}
      );
    }
  }


  if(isLoading){
    return <span>Loading.....</span>
  };

  if(isDo){
    return <span>Adding a word.....</span>
  };
  

  return(
    <form onSubmit={onSubmit}>
      <div className='input_area'>
        <label>Eng</label>
        <input type='text' placeholder='computer' ref={engRef}/>
      </div>
      <div className='input_area'>
        <label>Kor</label>
        <input type='text' placeholder='컴퓨터' ref={korRef}/>
      </div>
      <div className='input_area'>
        <select ref={dayRef}>
          {!(days===undefined) && days.map(day=>
            <option key={day.id} value={day.day}>
              {day.day}</option>
          )}
        </select>
      </div>
      <button style={{
        opacity: isLoading? 0.3:1.0,
      }}>
        {isLoading? '저장중.. ': '저장'}
      </button>
    </form>
  );
}