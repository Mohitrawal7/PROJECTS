import { useState } from 'react'

import DataTable from './DataTable'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     
<DataTable/>
       
    </div>
  )
}

export default App