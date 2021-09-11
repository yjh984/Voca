// import dummy from '../db/data.json';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Word from './Word';

export default function Day(){
  const {day}=useParams();
  // const wordList=dummy.words.filter(word=>word.day===Number(day));
  // const a=useParams();
  // console.log(a);
  const [words, setWords]=useState([]);

  useEffect(()=>{
    fetch(`http://localhost:3001/words?day=${day}`)
      .then(res=>res.json())
      .then(data=>setWords(data));
  },[day])

  return <>
    <h2>Day {day}</h2>
    <table>
      <tbody>
        {words.map(word=>(
          <Word word={word} key={word.id}/>
        ))}
      </tbody>
    </table>
  </>
}