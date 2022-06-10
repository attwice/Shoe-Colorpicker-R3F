import "./styles.css";
import React from "react";

const Color = React.memo(({ color, handleColor, handleExport }) => (
  <div className="input-color-wrapper">
    <input
      className="input-color"
      type="color"
      value={color}
      list="reds"
      onChange={(e) => {
        handleColor && handleColor(e.target.value);
      }}
    />
    <button
      onClick={() => {
        handleExport("export");
      }}
      className="myButton"
    >
      Export my Shoe
    </button>
    <button
      onClick={() => {
        handleExport("share");
      }}
      className="myButton"
    >
      Share
    </button>
  </div>
));

export default Color;
