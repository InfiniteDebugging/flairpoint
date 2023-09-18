import { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import UserRank from "./components/UserRank/UserRank";
import ParticlesBackground from "./components/ParticlesBackground/ParticlesBackground";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      formInput: "",
      imageUrl:
        "https://3.bp.blogspot.com/-41C6v9JF6bM/WBbMc79xrMI/AAAAAAAAAj0/6O8DkJxL1kk3zIdFVpEloBiWXxxLlgruwCLcB/s1600/Voldemort_3435101b.jpg",
      processResult: undefined,
      userData: {
        name: null,
        rank: null,
        requests: 0,
      },
      faceBoxes: [
        { bottom: "88px", left: "214px", right: "242px", top: "73px" },
      ],
    };
  }

  onImageUrlSubmit = (event) => {
    this.setState({
      imageUrl: this.state.formInput,
      userData: {
        requests: this.state.userData.requests + 1,
        rank: Math.floor(1000 * Math.random()),
      },
    });
    console.log("Processing: " + this.state.formInput);
    this.queryImage(this.state.formInput);
  };

  queryImage = (imageUrl) => {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = import.meta.env.VITE_CLARIFAI_PAT;
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "clarifai";
    const APP_ID = "main";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: imageUrl,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    console.log("Querying with:" + imageUrl);
    // console.log("PAT:" + PAT)
    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions,
    )
      .then((response) => response.json())
      .then(this.extractFaceBoxes)
      .catch((error) => console.log("error", error));
  };

  onFormInputChange = (event) => {
    this.setState({ formInput: event.target.value });
  };

  extractFaceBoxes = (clarifaiResponse) => {
    const faceBoxes = {
      faceBoxes: clarifaiResponse.outputs[0].data.regions
        .map((region) => region.region_info.bounding_box)
        .map(this.calculateFaceBoxesStyles),
    };
    console.log(faceBoxes);
    this.setState(faceBoxes);
  };

  calculateFaceBoxesStyles = (boundingBox) => {
    const imgElement = document.getElementById("inputImage");
    const imgRect = imgElement.getBoundingClientRect();
    const width = Number(imgElement.width);
    const height = Number(imgElement.height);
    return {
      top: height * boundingBox.top_row + "px",
      left: width * boundingBox.left_col + "px",
      bottom: height * (1 - boundingBox.bottom_row) + "px",
      right: width * (1 - boundingBox.right_col) + "px",
      // top: imgRect.top + height * boundingBox.top_row + "px",
      // left: imgRect.left + width * boundingBox.left_col + "px",
      // width: width * (boundingBox.right_col - boundingBox.left_col),
      // height: height * (boundingBox.bottom_row - boundingBox.top_row),
    };
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
          onChange={this.onFormInputChange}
          onSubmit={this.onImageUrlSubmit}
        />
        <FaceRecognition
          imgId={"inputImage"}
          url={this.state.imageUrl}
          faceBoxes={this.state.faceBoxes}
        />
        <ParticlesBackground />
      </div>
    );
  }
}

export default App;
