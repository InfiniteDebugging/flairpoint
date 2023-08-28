import { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import UserRank from "./components/UserRank/UserRank";
import ParticlesBackground from "./components/ParticlesBackground/ParticlesBackground"
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: "",
      processResult: undefined,
      userData: {
        name: null,
        rank: null,
        requests: 0,
      },
    };
  }

  onImageUrlSubmit = (event) => {
    this.setState({
      userData: {
        requests: this.state.userData.requests + 1,
        rank: Math.floor(1000 * Math.random()),
      },
    });
    console.log("Processing: " + this.state.imageUrl);
  };

  onImageUrlChange = (event) => {
    this.setState({ imageUrl: event.target.value });
  };

  render() {
    return (
      <div className="App width-full">
        <Navigation />
        <Logo />
        <UserRank
          name={this.state.userData.name}
          rank={this.state.userData.rank}
          requests={this.state.userData.requests}
        />
        <ImageLinkForm
          onChange={this.onImageUrlChange}
          onSubmit={this.onImageUrlSubmit}
        />
        <FaceRecognition />
        <ParticlesBackground />
      </div>
    );
  }
}

export default App;
