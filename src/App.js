// import logo from './logo.svg';
import './App.css';
import Hello from './Components/Hello';
import Welcome from './Components/Welcome';
import styles from './App.module.css';

function App() {
  function showName(){
    console.log('Tom~');
  };
  function showText(txt){
    console.log(txt);
  };
  return (
    <div className="App">
      <Hello age={10}/>
      <button onClick={showName}>Show Name</button>
      <button onClick={()=>
        console.log(30)
        }>Show Age</button>
      <div>
        <input type='text' onChange={(e)=>{
        const txt=e.target.value;
        showText(txt);
        }}/>
      </div>
      <Welcome/>
      <Hello age={20}/>
      <div className={styles.box}>
        <div style={{backgroundColor: 'red'
          , padding: '20px'
          , margin: '20px'}}>A1</div>
        <div style={{backgroundColor: 'yellow'
          , padding: '20px'
          , margin: '20px'}}>APP...</div>
      </div>
    </div>
  );
}

export default App;
