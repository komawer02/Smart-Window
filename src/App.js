import './App.css'
import {Routes,Route} from 'react-router-dom'

import Root from './components/Root'
import Login from './components/login'
import Register from './components/register'
import Main from './components/main/main'
import Control from './components/main/control'
import Log from './components/main/log'
import Option from './components/main/option'
import FindId from './components/findid'
import FindPassword from './components/findpassword'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Root/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/find-id' element={<FindId/>}/>
        <Route path='/find-password' element={<FindPassword/>}/>
        <Route path='/main' element={<Main/>}>
          <Route path='control/:id/:serial' element={<Control/>}/>
          <Route path='log/:id/:serial' element={<Log/>}/>
          <Route path='option/:id/:serial' element={<Option/>}/>
        </Route>
        <Route path='*' element={<div>잘못된 경로입니다.</div>}/>
      </Routes>
    </div>
  )
}

export default App;