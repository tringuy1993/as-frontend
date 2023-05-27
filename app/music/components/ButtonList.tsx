import React from "react";
import { useNavigate } from "react-router-dom";
import { buttonUrls } from "../getMusic";

function ButtonList() {
  const navigate = useNavigate();

  const handleClick = (buttonIndex) => {
    navigate(buttonUrls[buttonIndex]);
    // console.log(buttonUrls[buttonIndex]);
  };
  return (
    <div>
      {buttonUrls.map((buttonText, index) => (
        <button key={index} onClick={() => handleClick(index)}>
          {buttonText.replace("/MusicGame/", "")}
        </button>
      ))}
    </div>
  );
}

export default ButtonList;
