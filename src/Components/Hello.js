import { useState } from "react";
import World from "./World";
import UserName from "./UserName";

export default function Hello({age}){
  const [name, setName]=useState('Mike');
  const [numAge, setNumAge]=useState(age);//age를 변경하려면 useState를 사용해야 함.
  const msg=age>19? ' is an adult.':' is a teen.';
  return <div>
    <h1>Hello ~ ~</h1>
    <World/>
    <h2>{name}({age}){msg}({numAge})</h2>
    <UserName user={name}/>
    <button onClick={()=>{
      setName(name==='Mike'? 'Jane':'Mike');
      setNumAge(numAge+1);
    }}>Change Name</button>
  </div> //component는 하나의 태그만 return가능
}