import { Component } from 'react'
import flairpointLogo from '/img/flairpoint.png'
import './App.css'

class App extends Component {
  render () {
    return (
      <>
        <header>
          <img src={flairpointLogo} alt="flairpoint-logo" className='h-[16rem]' />
          <h1>Hello!</h1>
        </header>
      </>
    )
  }

}

export default App
