// import './App.css';
// import styles from './App.module.css';
import Day from './Components/Day';
import DayList from './Components/DayList';
import Header from './Components/Header';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import EmptyPage from './Components/EmptyPage';
import CreateWord from './Components/CreateWord';
import CreateDay from './Components/CreateDay';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/'>
            <DayList/>
          </Route>
          <Route path='/day/:day'> {/* dynamic path사용시 '/:xxx' */}
            <Day/>
          </Route>
          <Route path='/createword'>
            <CreateWord/>
          </Route>
          <Route path='/createday'>
            <CreateDay/>
          </Route>
          <Route>
            <EmptyPage/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
