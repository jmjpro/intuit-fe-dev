import IntuitLogo from './assets/Intuit_Logo.svg.png'
import ReactLogo from './assets/react.svg'
import './App.css'
import FsmPlayground from './FsmPlayground'

function App() {
  return (
    <>
      <h1>
        <img src={IntuitLogo} title="Intuit logo" /> Frontend Developer
        Assignment
      </h1>
      <h2>
        Finite Statement Machines <img src={ReactLogo} title="react logo" />
      </h2>
      <FsmPlayground />
    </>
  )
}

export default App
