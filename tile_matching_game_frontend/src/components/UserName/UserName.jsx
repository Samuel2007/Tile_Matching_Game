import React from "react";
import "./UserName.css";

function UserName({ userName, setUserName, isGameStarted }) {
  return (
    <div className="Container">
      Your name:{" "}
      <input
        name="userName"
        className="UserName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        disabled={isGameStarted}
      />
    </div>
  );
}
export default UserName;
