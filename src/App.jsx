import React from 'react'

import {BrowserRouter,Routes,Route} from "react-router-dom";
import ListUserCompoent from './components/ListUserComponent';
import UserComponent from './components/UserComponent';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ListUserCompoent/>}></Route>
      <Route path='/users' element={<ListUserCompoent/>}></Route>
      <Route path='/registration' element={<UserComponent/>}></Route>
      <Route path='/edit-user/:id' element={<UserComponent/>}></Route>
    </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
