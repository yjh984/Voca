import { useState } from "react";

export default function Word({word}){
  const [isShow, SetIsShow]=useState(false);
  const [isDone, SetIsDone]=useState(word.isDone);

  function toggleShow(){
    SetIsShow(!isShow);
  }

  function toggleDone(){
    SetIsDone(!isDone);
  }

  return(
    <tr className={isDone? 'off':''}>
      <td><input type='checkbox'
        checked={isDone} onChange={toggleDone}/>
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>뜻 {isShow? '숨김':'보기'}</button>
        <button className='btn_del'>삭제</button>
      </td>
    </tr>
  );
}