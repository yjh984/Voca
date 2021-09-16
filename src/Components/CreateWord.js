import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import useFetch from '../hooks/useFetch';

export default function CreateWord(){
  const days=useFetch('http://localhost:3001/days');
  const history=useHistory();
  const [isLoading,setIsLoading]=useState(false);

  function onSubmit(e){
    e.preventDefault(); //Form tag는 저장버튼 click시 update되는데.. 이를 방지하기 위해
    if(!isLoading){
      setIsLoading(true);
      fetch(`http://localhost:3001/words/`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eng: engRef.current.value,
          kor: korRef.current.value,
          day: dayRef.current.value,
          isDone: false,
        }),
      }).then(res=> {
        if(res.ok) {
          // alert('완료되었습니다.');
          setIsLoading(false);
          history.push(`/day/${dayRef.current.value}`);
        }}
      );
    }
  }

  const engRef = useRef(null); //DOM에 접근하기 위해
  const korRef = useRef(null);
  const dayRef = useRef(null);

  if(days===undefined){
    return <span>Loading.....</span>
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