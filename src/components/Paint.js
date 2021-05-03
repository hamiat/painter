import React, { useState, useEffect, useRef, useCallback } from "react";
import randomcolor from "randomcolor";
import ColorPicker from "./ColorPicker";
import Canvas from "./Canvas";
import RefreshButton from "./RefreshButton";
import useWindowSize from "./WindowSize";
import rainSounds from "../assets/rainSound.mp3" 
import birdSounds from "../assets/spring-birds.wav"

export default function Paint() {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const [visible, setVisible] = useState(false);
  const headerRef = useRef({ offsetHeight: 0 });
  let timeoutId = useRef();

  //optimizing so that getColors is not being recreated on each render, using useCallback hook
  const getColors = useCallback(() => {
    const baseColor = randomcolor().slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
      .then((res) => res.json())
      .then((res) => {
        setColors(res.colors.map((color) => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
      });
  }, []);

  //useRef for timeoutId, which is same between renders
  const [windowWidth, windowHeight] = useWindowSize(() => {
    setVisible(true);
    clearTimeout(timeoutId.current);
    timeoutId = setTimeout(() => setVisible(false), 500);
  });

  useEffect(getColors, []);

  const playRain = () => {
    const startRainSounds = new Audio(rainSounds);
    startRainSounds.currentTime = 0;
    startRainSounds.play();
    startRainSounds.loop = true
  };

  const playBirds = () => {
    const startBirdSounds = new Audio(birdSounds);
    startBirdSounds.currentTime = 0;
    startBirdSounds.play();
    startBirdSounds.loop = true
  };

  return (
    <div className="paint">
      <header
        ref={headerRef}
      >
        <div className="select-colors">
          <ColorPicker 
            colors={colors}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
          <RefreshButton 
          cb={getColors} />
          <button onClick={playRain}>Rain & birds</button>
          <button onClick={playBirds}>Spring birds</button>
        </div>
        
      </header>
      <section className="canvas-container">
      {activeColor && (
        <Canvas
          color={activeColor}
          height={window.innerHeight - headerRef.current.offsetHeight}
        />
      )}
      </section>
{/*       <div className={`window-size ${visible ? "" : "hidden"}`}>
        {windowWidth} x {windowHeight}
      </div> */}
    </div>
  );
}
