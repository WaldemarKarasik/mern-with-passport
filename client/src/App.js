import React from 'react';
import {Navbar} from './Components/Navbar'
import {Home} from './Components/Home'
import {BrowserRouter, Route} from 'react-router-dom'
import { Login } from './Components/Login';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login}/>
    </BrowserRouter>
  );
}

export default App;
