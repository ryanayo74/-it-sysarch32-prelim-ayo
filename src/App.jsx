import { useState } from 'react'
import './App.css'
import Pokedex from './Pokedex'
import Header from './Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <Pokedex/>
    </>
  )
}

export default App
