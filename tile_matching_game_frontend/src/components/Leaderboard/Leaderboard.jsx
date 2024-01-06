import React from "react";
import "./Leaderboard.css";

function Leaderboard({ leaderboardData }) {
  const currentPlayerId = leaderboardData[leaderboardData.length - 1]._id;
  const sortedLeaderboardData = [...leaderboardData].sort(function (a, b) {
    return a.time.localeCompare(b.time);
  });
  const playerIndex = sortedLeaderboardData.findIndex(
    (obj) => obj._id === currentPlayerId
  );
  const player = sortedLeaderboardData.find(
    (obj) => obj._id === currentPlayerId
  );

  const renderLeaderboardRow = (element, index, isHighlighted) => {
    return (
      <div
        className={isHighlighted ? "PlayerLeaderboardRow" : "LeaderboardRow"}
      >
        <div className="LeaderboardPlace">{index + 1}</div>
        <div className="LeaderboardCell">
          {element.name.length > 16
            ? element.name.slice(0, 16) + "..."
            : element.name}
        </div>
        <div className="LeaderboardCell">{element.time}</div>
      </div>
    );
  };

  return (
    <div className={`Leaderboard ${playerIndex > 10 && "ExtendedLeaderboard"}`}>
      {sortedLeaderboardData.slice(0, 10).map((element, index) => {
        const shouldHighlightRow = index === playerIndex;
        return renderLeaderboardRow(element, index, shouldHighlightRow);
      })}
      {playerIndex > 10 && (
        <div className="PlayerLeaderboardRow">
          <div className="LeaderboardPlace">{playerIndex + 1}</div>
          <div className="LeaderboardCell">{player.name}</div>
          <div className="LeaderboardCell">{player.time}</div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
