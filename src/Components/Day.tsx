// import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Word, { IWord } from './Word';
import { useHistory } from 'react-router';
import './Day.css';
import { useState } from 'react';
// import { useState } from 'react';

export interface IDay{
  day: number;
  id: number;
}

export default function Day(){
  const {day}=useParams<{day:string}>();
  const history=useHistory();
  const {data:datadays, isLoading:daysIsLoading} =useFetch('http://localhost:3001/days');
  const days:IDay[]=datadays;
  const {data, isLoading:wordsIsLoading}=useFetch(`http://localhost:3001/words?day=${day}`);
  const words:IWord[]=data;
  const [isDel, setIsDel]=useState(false);

  function delDay(){
    if(window.confirm('Are you sure?')){
      setIsDel(true);
      words.map(word=>{
        fetch(`http://localhost:3001/words/${word.id}`,{
        method:'DELETE',
        }).then(res=>{
          if(!res.ok) window.alert('단어 지우기 통신 오류!');
        });
      return null;
      });
      setIsDel(false);
      fetch(`http://localhost:3001/days/${day}`,{
        method:'DELETE',
        }).then(res=>{
          if(!res.ok) window.alert('Day 지우기 통신 오류!');
          setIsDel(false);
          history.push('/');
        });
      
      // console.log('delete this day!');
    }
  }

  // console.log('m',wordsIsLoading);
  if(daysIsLoading || wordsIsLoading || isDel){
    return <span>Words Loading....</span>
  }

  if (Number(day)>days.length) {
    return <>
      <span>Wrong Page...</span>
      <Link to='/' style={{
        color: 'blue',
        textDecorationLine: 'underline',
      }}>Go to Home!</Link>
    </>
  };

  return <>
    <h2>{`Day ${day} _________________________________________________________`}</h2>
    <div className='day_move'>
      <Link to ={Number(day)>1? `/day/${Number(day)-1}`:'/day/1'} className='day_prev'>{'Day-'}</Link>
      {`  ,     `}
      <Link to ={Number(day)<days.length? `/day/${Number(day)+1}`:`/day/${days.length}`} className='day_prev'>{'Day+'}</Link>
      <button onClick={delDay} className='btn_del'>Day삭제</button>
    </div>
    <p/>
    {/* {console.log(words)} */}
    <table>
      <tbody>
        {words.map(word=>(
          <Word word={word} key={word.id}/>
          ))}
      </tbody>
    </table>
  </>
}