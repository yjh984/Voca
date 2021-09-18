import { useState } from "react";

interface IProps{
  word: IWord;
}

export interface IWord{
  id: number;
  day: string;
  eng: string;
  kor: string;
  isDone: boolean;
}


export default function Word({word:w}:IProps){ //prop의 이름을 바꿀 때.. xxx:yyy
  const [word, setWord]=useState(w);
  const [isShow, setIsShow]=useState(false);
  const [isDone, setIsDone]=useState(word.isDone);
  const [isLoading,setIsLoading]=useState(false);

  function toggleShow(){
    setIsShow(!isShow);
  }

  function toggleDone(){
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...word,
        isDone: !isDone,
      }),
    }).then(res=> {
      if(res.ok) setIsDone(!isDone)}
    );
  }

  function delWord(){
    setIsLoading(true);
    if (window.confirm('삭제하시겠습니까?')){
      fetch(`http://localhost:3001/words/${word.id}`,{
        method:'DELETE',
      }).then(res=>{
        if(res.ok) {
          setWord({...word,id:0});
          setIsLoading(false);
        }
      });
    };
  }

  if(word.id===0) return null;
  if(isLoading){
    return <span>Deleting....</span>
  }

  return(<>
    <tr className={isDone? 'off':''}>
      <td><input type='checkbox'
        checked={isDone} onChange={toggleDone}/>
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>뜻 {isShow? '숨김':'보기'}</button>
        <button onClick={delWord} className='btn_del'>삭제</button>
      </td>
    </tr>
    {/* <script>{console.log('word.js')}</script> */}
    </>
  );
}