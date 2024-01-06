import React, { useState, useEffect } from "react";
import { TIME_TO_GAME_START } from "../../App";
import "./Tile.css";

function Tile({
  pictureTile,
  setImagePath,
  setCardsState,
  isVisible,
  cardState,
  index,
  clickedImagePaths,
  isGameStarted,
}) {
  const [isCardClickable, setIsCardClickable] = useState(false);

  useEffect(() => {
    if (isGameStarted) {
      setTimeout(() => {
        setIsCardClickable(true);
      }, TIME_TO_GAME_START + 4000);
    }
  }, [isGameStarted]);
  const onClickHandler = () => {
    if (
      isCardClickable &&
      clickedImagePaths.length < 2 &&
      !cardState[index].isVisible
    ) {
      const newCardState = cardState.map((card) => {
        if (index === card.ID) {
          return { ...card, isVisible: true };
        }
        return card;
      });
      setCardsState(newCardState);
      setImagePath([...clickedImagePaths, pictureTile]);
    }
  };
  return (
    <div className="Tile" onClick={onClickHandler}>
      <img src={pictureTile} alt="not found" className="Image" />
      {!isVisible && <div className="Cover" />}
    </div>
  );
}

export default Tile;
