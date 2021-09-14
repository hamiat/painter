import React, { useState, useEffect, useRef } from "react";
import randomcolor from "randomcolor";
import ColorPicker from "./ColorPicker";
import Canvas from "./Canvas";
import RefreshButton from "./RefreshButton";
import rainSounds from "../assets/rainSound.mp3";
import birdSounds from "../assets/spring-birds.wav";
import zenSound from "..//assets/zenGong-bScale.wav";
import cafeSound from "..//assets/cafe.wav";
import mutePic from "../assets/muteIcon.png";

export default function Paint() {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const headerRef = useRef({ offsetHeight: 0 });
  const [eraser, setEraser] = useState("#FFFFF")
  
  const getColors = (() => {
    const baseColor = randomcolor().slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
      .then((res) => res.json())
      .then((res) => {
        setColors(res.colors.map((color) => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
      });
  });

  useEffect(() => {
    getColors()
  },[]);

  const startRainSounds = new Audio(rainSounds);
  const startBirdSounds = new Audio(birdSounds);
  const startZenSounds = new Audio(zenSound);
  const startCafeSounds = new Audio(cafeSound);

  const playRain = () => {
    startRainSounds.play();
    startRainSounds.loop = true;
  };

  const playBirds = () => {
    startBirdSounds.play();
    startBirdSounds.loop = true;
  };

  const playZenSound = () => {
    startZenSounds.play();
    startZenSounds.loop = true;
  };
  const playCafeSounds = () => {
    startCafeSounds.play();
    startCafeSounds.loop = true;
  };

  const pauseSounds = () => {
    startBirdSounds.pause();
    startRainSounds.pause();
    startCafeSounds.pause();
    startZenSounds.pause();
  };

  return (
    <section className="painter-container">
      <div className="sounds">
        <button className="sound-btn-rain" onClick={playRain}>
          Rain & birds
        </button>
        <button className="sound-btn-spring" onClick={playBirds}>
          Spring birds
        </button>
        <button className="sound-btn-zen" onClick={playZenSound}>
          Zen Gong
        </button>
        <button className="sound-btn-cafe" onClick={playCafeSounds}>
          Busy Cafe
        </button>
        <button onClick={pauseSounds} className="mute-btn">
          <img src={mutePic} alt="mute button" />
        </button>
      </div>
      <div className="canvas-container">
        {activeColor && (
          <Canvas
            color={activeColor}
            height={window.innerHeight - headerRef.current.offsetHeight}
          />
        )}
      </div>

      <div className="select-colors" ref={headerRef}>
        
        <ColorPicker
          colors={colors}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
        <RefreshButton cb={getColors} />
      
      </div>

     
    </section>
  );
}
