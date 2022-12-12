import './App.css';
import { useEffect, useState } from 'react';
import HomePage from './Components/HomePage';
import SignUp from './Components/SignUp';
import Questions from './Components/Questions';
import Submit from './Components/Submit';
import Answers from './Components/Answers';
import Nav from './Components/Nav';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { generateUserIndex, getData } from './utils/utils';
import { addUser as addUserToDB } from './utils/api';

function App() {

  const [dataBase, setDataBase] = useState([]);  

  useEffect(() => {
    if(dataBase.length === 0){
      getDataBase();
    }    
  })

  const getDataBase = async () => {
    //Callback function to set data
    const setMainDataBase = (data) => {
      setDataBase(data);
    } 

    const data = await getData();
    setMainDataBase(data);
  
  }

  const addUser = (user, index) => {
    //Check for user index
    if(index){
      setDataBase(data => [...data.slice(0,index), user, ...data.slice(index+1)])
    }else{
      user.index = generateUserIndex(dataBase);
      setDataBase(data => [...data.slice(0,user.index), user, ...data.slice(user.index+1)])
    }
  }

  return (
    <Router> 
      <div className="App">
        <div className="content-container">
          <Nav />
          <Routes> 
            <Route path='/' element={<HomePage dataBase={dataBase}  />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='questions' element={<Questions />} />
            <Route path='answers' element={<Answers dataBase={dataBase} />} />
            <Route path='checkout' element={<Submit updateDataBase={addUser} test='test' />} />
          </Routes>
        </div>
        <footer>
          <ul className="footer-links">
            <li>About</li>
            <li>Charities</li>
            <li>Scores</li>
            <li>Contact Us</li>
          </ul>
        </footer>
      </div>
    </Router> 
  );
}

export default App;
