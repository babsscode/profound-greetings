import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Card from './pages/Card'


const MainRoutes=()=> {
 return (
   <div>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/:userID" element={<Card />} />
      </Routes>
   </div>
 )
}


export default MainRoutes
