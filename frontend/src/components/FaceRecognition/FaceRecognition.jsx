import { React } from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imgId, url, faceBoxes }) => {
  if (url === "") {
    return <div></div>;
  }
  return (
    <div className="flex justify-center py-8">
      <div className="relative">
        <img id={imgId} src={url} alt="input-image" className="h-[400px]" />
        {faceBoxes.map((style, idx) => (
          <div className="bounding-box" key={idx} style={style} />
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
