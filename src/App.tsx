import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
// import Navbar from "./components/Navbar"
import About from "./components/About"


const App = () => {
  return (
    <>
    {/* <Navbar/> */}
      <Routes>
        <Route path="/" element ={ <Home/>}/>     
        <Route path="/about" element ={ <About/>}/>   
      </Routes>
    </>
  )
}

export default App