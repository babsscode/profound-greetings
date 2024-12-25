import MainRoutes from './Routes'
import './index.css'; 
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div>
      <MainRoutes/>
      <Analytics />
    </div>
  )
}

export default App
