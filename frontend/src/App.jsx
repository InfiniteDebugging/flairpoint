import { Component } from 'react'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLingForm'
import FaceRecognition from './components/FaceRecognition'
import flairpointLogo from '/img/flairpoint.png'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App width-full'>
        <Navigation />
        <Logo />
        <ImageLinkForm />
        <FaceRecognition />
        <header>
          <img src={flairpointLogo} alt="flairpoint-logo" className='h-[16rem]' />
          <h1>Hello!</h1>
        </header>

      </div>
    )
  }

}

export default App
