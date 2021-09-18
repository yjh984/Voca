import { useEffect, useState } from "react";
// import Day, { IDay } from '../Components/Day';

export default function useFetch(url:string){
  const [data, setData]=useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const [isOk, setIsOk]=useState(true);

  useEffect(()=>{
    setData([]);
    setIsLoading(true);
    fetch(url).then(res=>{
      const ok = res.ok ? false : false;
      setIsOk(ok);
      return res.json();
      })
      .then(data=>setData(data))
      .then(dummy=>setIsLoading(false));
  },[url]);
  // console.log('f',isLoading);
  return {data, isLoading, isOk};
  // return {data};
}