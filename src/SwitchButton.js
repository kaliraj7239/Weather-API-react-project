import React from "react";

const SwitchButton = (props) => {
  return (
    <div className="align-center">
      <label className="switch">
        <input
          onChange={() => props.toggleFormat()}
          checked={props.degreeFormat}
          type="checkbox"
        ></input>
        <span className="slider round align-center">
          <div
            style={{
              display: "flex",
              gap: "20px",
              color: "black",
              zIndex: 2,
              position: "relative",
              fontSize: "12px",
            }}
          >
            <span>C</span>
            <span>F</span>
          </div>
        </span>
      </label>
    </div>
  );
};

export default SwitchButton;