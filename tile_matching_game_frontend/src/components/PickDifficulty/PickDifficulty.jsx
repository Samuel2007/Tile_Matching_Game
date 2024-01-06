import React from "react";

function PickDifficulty({ changeDifficulty }) {
  return (
    <select name="difficulty" id="difficulty" onChange={changeDifficulty}>
      <option value="Easy">Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option>
      <option value="Custom">Custom</option>
    </select>
  );
}
export default PickDifficulty;
