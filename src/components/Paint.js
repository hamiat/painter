import React, { useState, useEffect, useRef, useCallback } from "react";
import randomcolor from "randomcolor";
import ColorPicker from "./ColorPicker";
import Canvas from "./Canvas";
import RefreshButton from "./RefreshButton";
<<<<<<< HEAD
import rainSounds from "../assets/rainSound.mp3";
=======
import useWindowSize from "./WindowSize";
import rainSounds from "../assets/rainSound.mp3" 
>>>>>>> aaeb2b380c7683e150ddda12447926f11e188308
import birdSounds from "../assets/spring-birds.wav"

export default function Paint() {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const headerRef = useRef({ offsetHeight: 0 });

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

  useEffect(getColors, []);

  const playRain = () => {
    const startRainSounds = new Audio(rainSounds);
    startRainSounds.currentTime = 0;
    startRainSounds.play();
    startRainSounds.loop = true;
  };

  const playBirds = () => {
    const startBirdSounds = new Audio(birdSounds);
    startBirdSounds.currentTime = 0;
    startBirdSounds.play();
    startBirdSounds.loop = true
  };

  const playBirds = () => {
    const startBirdSounds = new Audio(birdSounds);
    startBirdSounds.currentTime = 0;
    startBirdSounds.play();
    startBirdSounds.loop = true
  };

  return (
    <section className="painter-container">
      <div className="sound-btns">
        <button onClick={playRain}>Rain & birds</button>
        <button onClick={playBirds}>Spring birds</button>
      </div>
      <div className="canvas-container">
        {activeColor && (
          <Canvas
            color={activeColor}
            height={window.innerHeight - headerRef.current.offsetHeight}
          />
<<<<<<< HEAD
        )}
      </div>

      <div className="select-colors" ref={headerRef}>
        <ColorPicker
          colors={colors}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
=======
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
>>>>>>> aaeb2b380c7683e150ddda12447926f11e188308
        />
        <RefreshButton cb={getColors} />
      </div>
    </section>
  );
}
