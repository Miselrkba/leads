import React from "react";

export const Card = (props) => {
  const handleIsEmailedChange = (e) => {
    props.handleIsEmailed(e.target.checked);
  };

  const handleIsCalledChange = (e) => {
    props.handleIsCalled(e.target.checked);
  };

  return (
    <div className="box" style={{backgroundColor: props.isEmailed ? 'lightgreen' : 'rgba(255, 255, 255, 0.8)'}}>
      <p>{props.name}</p>
      <span>{props.email}</span>
      <input
        type="checkbox"
        checked={props.isEmailed}
        onChange={handleIsEmailedChange}
      />
      emailed
      <br />
      <span>{props.phone}</span>
      <input
        type="checkbox"
        checked={props.isCalled}
        onChange={handleIsCalledChange}
      />
      called
    </div>
  );
};
