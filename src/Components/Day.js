// import dummy from '../db/data.json';
// import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Word from './Word';
import { useHistory } from 'react-router';
import './Day.css';

export default function Day(){
  const {day}=useParams();
  const history=useHistory();
  // const wordList=dummy.words.filter(word=>word.day===Number(day));
  // const a=useParams();
  // console.log(a);
  // let words=undefined;
  // console.log(words);
  const words=useFetch(`http://localhost:3001/words?day=${day}`);
  const days=useFetch('http://localhost:3001/days');
  // console.log(words);

  function delDay(){
    if(window.confirm('Are you sure?')){
      words.map(word=>{
        fetch(`http://localhost:3001/words/${word.id}`,{
        method:'DELETE',
        }).then(res=>{
          if(!res.ok) window.alert('단어 지우기 통신 오류!');
        });
        return null;
      });
      // const days=useFetch(`http://localhost:3001/days`);
      fetch(`http://localhost:3001/days/${day}`,{
        method:'DELETE',
        }).then(res=>{
          if(!res.ok) window.alert('Day 지우기 통신 오류!');
          history.push('/');
        });
      
      // console.log('delete this day!');
    }
  }

  if(words===undefined || days===undefined){
    return <span>Loading.....</span>
  };
  if(!(days===undefined) && Number(day)>days.length) {
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
      {/* <Link to ={Number(day)>1? `/`:'/day/1'} className='day_prev'>{'Day-'}</Link> */}
      {/* <a href='/day/1'>pre.Day</a> */}
      {`  ,     `}
      <Link to ={Number(day)<days.length? `/day/${Number(day)+1}`:`/day/${days.length}`} className='day_prev'>{'Day+'}</Link>
      <button onClick={delDay} className='btn_del'>Day삭제</button>
    </div>
    <p/>
    {/* {console.log(words)} */}
    {/* {words===undefined && <span>Loading.....</span>} */}
    <table>
      <tbody>
        {!(words===undefined) && words.map(word=>(
          <Word word={word} key={word.id}/>
          ))}
      </tbody>
    </table>
  </>
}