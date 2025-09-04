import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DynamicForm from "./Form";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DynamicForm />
    </>
  );
}

export default App
