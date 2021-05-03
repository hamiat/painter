import React, { useState } from "react";

export default React.memo(() => {
  const [name, setName] = useState("");
  const [paintingName, setPaintingName] = useState(null);

  const handleClick = (e) => {
    setPaintingName(name);
    setName((e.target.value = ""));
  };

  return (
    <div className="name-container">
      <label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)}
          placeholder="Untitled"
        />
      </label>
      <button onClick={handleClick}>Set title</button>
      <p className="painting-name">{paintingName}</p>
    </div>
  );
});
