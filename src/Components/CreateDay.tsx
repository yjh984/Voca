import { useState } from "react";
import { useHistory } from "react-router";
import useFetch from "../hooks/useFetch";
import Day, { IDay } from './Day';

export default function CreateDay(){
  const {data, isLoading}=useFetch('http://localhost:3001/days');
  const days:IDay[]=data;
  const [isDo, setIsDo]=useState(false);
  const history=useHistory();

  function addDay(){
    setIsDo(true);
    fetch(`http://localhost:3001/days/`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        day: days.length+1,
      }),
    }).then(res=> {
      if(res.ok) {
        // alert('완료되었습니다.');
        setIsDo(false);
        history.push(`/`);
      }}
    );
  }

  if(isLoading){
    return <span>Loading.....</span>
  };

  if(isDo){
    return <span>Adding Day.....</span>
  };
  
  return(
    <div>
      <h3>현재 일수 : {!(days===undefined) && days.length}일</h3>
      <button onClick={addDay}>Day 추가</button>
    </div>
  )
}