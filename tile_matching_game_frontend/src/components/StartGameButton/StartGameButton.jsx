import { useState } from "react";
import "./StartGameButton.css";

function StartGameButton({
  isGameEnded,
  isGameStarted,
  setIsGameStarted,
  userName,
}) {
  const [noNameProvided, setNoNameProvided] = useState(false);
  if (isGameStarted) {
    return null;
  }
  const onClickHandler = () => {
    if (isGameEnded) {
      window.location.reload();
      return;
    }
    if (userName) {
      setIsGameStarted(true);
      setNoNameProvided(false);
    } else {
      setNoNameProvided(true);
    }
  };

  return (
    <>
      <div className="StartButton" onClick={onClickHandler}>
        <p className="StartButtonText">
          {isGameEnded ? "Play Again ?" : "Start Game"}
        </p>
      </div>
      {noNameProvided && <p className="Error">Put Name In</p>}
    </>
  );
}

export default StartGameButton;
