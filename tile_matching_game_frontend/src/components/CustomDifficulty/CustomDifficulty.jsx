import React from "react";
import "./CustomDifficulty.css";

function CustomDifficulty({ setCustomDifficulty, customDifficulty }) {
  const onChangeHandler = (e) => {
    const customDifficultyValue = Number(e.target.value);
    if (customDifficultyValue > 20) {
      setCustomDifficulty(20);
    } else if (customDifficultyValue < 1) {
      setCustomDifficulty(1);
    } else {
      setCustomDifficulty(Number(e.target.value));
    }
  };

  return (
    <div className="Container">
      Board size:{" "}
      <input
        type="number"
        name="customDifficulty"
        className="CustomDifficulty"
        value={customDifficulty}
        onChange={onChangeHandler}
      />
    </div>
  );
}
export default CustomDifficulty;
