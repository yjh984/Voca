import { useEffect, useState } from "react";

export default function useFetch(url){
  const [data, setData]=useState(undefined);
  // console.log(data);
  useEffect(()=>{
    // console.log('fetch...');
    fetch(url).then(res=>res.json())
      .then(data=>setData(data));
  },[url]);
  return data;
}