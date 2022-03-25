import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Create from './Components/Create';
import List from './Components/List';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
   <>
    <BrowserRouter>
    <Header/>
    <Routes>
      
      <Route path='/' element={
        <>
         <Create/> 
         <List/>
        </>
      }>
      </Route>

      <Route element={<Login/>} path="/login"></Route>
    </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
