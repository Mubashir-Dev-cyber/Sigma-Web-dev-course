import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './App.css'

function App() {
  const [value, setValue] = useState(0)

  return (
    <div className="App">
      <Navbar logoText="CodeWithMubashir"/>
      <div className='value'>{value}</div>
      <button onClick={()=>{setValue(value + 1)}}>Click me</button>
      <Footer/>
    </div>
  );
}

export default App
