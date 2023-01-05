
import { Body } from "./components/Body"
import { Header } from "./components/Header"

import './global.css'



function App() {
  

  return (
    <div className="App">
      <Header />
      <Body 
        id={""} 
        content={""} 
        isChecked={false}  />
      
      
    </div>
  )
}

export default App
