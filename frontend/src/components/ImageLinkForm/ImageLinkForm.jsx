import { React } from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onChange, onSubmit }) => {
  return (
    <div className="imagelinkform bg-slate-400 grid grid-cols-4 justify-center h-16 py-4 px-8 w-[48rem] m-auto p-2 rounded-lg">
      <input
        type="text"
        onChange={onChange}
        placeholder="Who is it going to be?"
        className="col-span-3 px-2 rounded-l-lg"
      />
      <button onClick={onSubmit} className="rounded-r-lg bg-slate-800">
        Find Face
      </button>
    </div>
  );
};

export default ImageLinkForm;
