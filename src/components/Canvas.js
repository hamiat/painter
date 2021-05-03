import React, { useState, useEffect, useRef } from 'react'
import useWindowSize from './WindowSize'



export default function Canvas(props) {
  const [width, setWidth] = useState(window.innerWidth/2)
  const [height, setHeight] = useState(window.innerHeight)
  const [drawing, setDrawing] = useState(false)
  const [name, setName] = useState("")


  const canvasRef = useRef()
  const ctx = useRef()
 
  useEffect(() => {
    ctx.current = canvasRef.current.getContext('2d')
  }, [])



  const [windowWidth, windowHeight] = useWindowSize(() => {
    setWidth(window.innerHeight)
    setHeight(window.innerHeight)
  })

  function handleMouseMove(e) {
    const coords = [
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    ]
    if (drawing) {
      ctx.current.lineTo(...coords)
      ctx.current.stroke()
    }
    if (props.handleMouseMove) {
      props.handleMouseMove(...coords)
    }
  }
  
  function startDrawing(e) {
    ctx.current.lineJoin = 'round'
    ctx.current.lineCap = 'round'
    ctx.current.lineWidth = 4 
    ctx.current.strokeStyle = props.color
    ctx.current.beginPath();
    //actual coordinates 
    ctx.current.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    )
    setDrawing(true)
  }
  function stopDrawing() {
    ctx.current.closePath()
    setDrawing(false)
  }

  function saveImage(){
    let dataURL = canvasRef.current.toDataURL()
    

    let paintingsArray;
    let paintings = { "painting": dataURL, "name": name  }

    if (localStorage.getItem("Paintings")) {
      paintingsArray = JSON.parse(localStorage.getItem("Paintings"))
      } else {
        paintingsArray = []
      }
      paintingsArray.push(paintings)
      localStorage.setItem("Paintings", JSON.stringify(paintingsArray))

      console.log(paintings)
  }

  
  function renderImage(){
    const imagesArray = JSON.parse(localStorage.getItem("Paintings"))
    console.log(imagesArray)

  }


  return (
    <React.Fragment>
      <div className="image-title">
    <label>
            <input
            value={name}
            onChange={e => setName(e.target.value)}
            onClick={e => e.target.setSelectionRange(0, e.target.value.length)}
            placeholder="Untitled"
            />
      </label>
      {name}
      <button onClick={saveImage}>Save</button>
     
      </div>

      <canvas className="canvas"
        ref={canvasRef}
        width={props.width || width}
        height={props.height || height}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={handleMouseMove}
      />
      
    </React.Fragment>
  )

}
