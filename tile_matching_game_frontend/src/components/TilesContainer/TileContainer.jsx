import React, { useState, useEffect } from "react";
import { TIME_TO_GAME_START } from "../../App";
import Tile from "../Tile/Tile";
import "./TileContainer.css";
import axios from "axios";
import { formatTimeToString } from "../StopWatch/StopWatch";
import Leaderboard from "../Leaderboard/Leaderboard";

const getListOfTiles = (numberOfTiles) => {
  let listOfAllTiles = [];
  for (let index = 0; index < numberOfTiles; index++) {
    listOfAllTiles.push(
      `https://source.unsplash.com/random/300x200?sig=${Math.random()}`
    );
  }

  const listOfAllPairedTiles = [...listOfAllTiles, ...listOfAllTiles];
  const listToDisplay = listOfAllPairedTiles.sort(() => 0.5 - Math.random());

  const cards = listToDisplay.map((element, index) => {
    return { path: element, isVisible: false, ID: index };
  });

  return cards;
};

function TilesContainer({
  isGameStarted,
  setIsGameStarted,
  isGameEnded,
  setIsGameEnded,
  areTilesShowing,
  setIsRunning,
  userName,
  time,
  gameDifficulty,
  customDifficulty,
}) {
  const [clickedImagePaths, setImagePaths] = useState([]);
  const [cardState, setCardsState] = useState(getListOfTiles(6));
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    switch (gameDifficulty) {
      case "Easy":
        setCardsState(getListOfTiles(6));
        break;
      case "Medium":
        setCardsState(getListOfTiles(10));
        break;
      case "Hard":
        setCardsState(getListOfTiles(14));
        break;
      case "Custom":
        setCardsState(getListOfTiles(customDifficulty * 2));
        break;
      default:
        setCardsState(getListOfTiles(6));
        break;
    }
  }, [customDifficulty, gameDifficulty]);

  cardState.map((card) => ({ ...card, isVisible: false }));
  const invisibleCards = cardState.filter((card) => card.isVisible === false);

  useEffect(() => {
    if (clickedImagePaths.length === 2) {
      setTimeout(() => {
        if (clickedImagePaths[0] === clickedImagePaths[1]) {
          setImagePaths([]);
        } else {
          const newCardState = cardState.map((card) => {
            if (clickedImagePaths.includes(card.path)) {
              return { ...card, isVisible: false };
            }
            return card;
          });
          setCardsState(newCardState);
          setImagePaths([]);
        }
      }, 200);
    }
  }, [clickedImagePaths]);

  useEffect(() => {
    if (isGameStarted) {
      const newCardState = cardState.map((card) => {
        return { ...card, isVisible: true };
      });
      setCardsState(newCardState);
      setTimeout(() => {
        const cardStateAfterTimeout = cardState.map((card) => {
          return { ...card, isVisible: false };
        });
        setCardsState(cardStateAfterTimeout);
      }, TIME_TO_GAME_START);
    }
  }, [isGameStarted]);

  useEffect(() => {
    if (invisibleCards.length === 0 && !areTilesShowing) {
      console.log(gameDifficulty);
      setIsRunning(false);
      axios
        .post("http://127.0.0.1:5000/API/post", {
          name: userName,
          time: formatTimeToString(time),
          level: gameDifficulty,
          customDifficulty,
        })

        .then(() => {
          axios
            .get(
              `http://127.0.0.1:5000/API/getAll/${gameDifficulty}/${customDifficulty}`
            )
            .then((data) => {
              setLeaderboardData(data.data);
              setIsGameEnded(true);
              setIsGameStarted(false);
            });
        })
        .catch(() => {});
    }
  }, [
    areTilesShowing,
    invisibleCards.length,
    setIsRunning,
    userName,
    time,
    gameDifficulty,
  ]);

  if (isGameEnded) {
    return (
      <div>
        <Leaderboard leaderboardData={leaderboardData} />
      </div>
    );
  }
  return (
    <div className="TileContainer">
      {cardState.map((element) => (
        <Tile
          key={element.ID}
          isGameStarted={isGameStarted}
          clickedImagePaths={clickedImagePaths}
          cardState={cardState}
          pictureTile={element.path}
          index={element.ID}
          setCardsState={setCardsState}
          setImagePath={setImagePaths}
          isVisible={element.isVisible}
        />
      ))}
    </div>
  );
}

export default TilesContainer;
