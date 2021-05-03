import React, { useState} from 'react'

export default React.memo(() => {
    const [name, setName] = useState("")

   /*  const savePainting = () => {
        let paintingsArray;
        let paintings = { paintingName: name }

        if (localStorage.getItem('Paintings')) {
            paintingsArray = JSON.parse(localStorage.getItem('Paintings'))
        } else {
            paintingsArray = []
        }
        paintingsArray.push(paintings)
        localStorage.setItem("Paintings", JSON.stringify(paintingsArray))
    } */
        
    
    return(
        <div className="name-container">
        <label className="user-name">
            <input
            value={name}
            onChange={e => setName(e.target.value)}
            onClick={e => e.target.setSelectionRange(0, e.target.value.length)}
            placeholder="Untitled"
            />
        </label>
        <br></br>
        <br></br>
        <p className="painting-name">{name}</p>
        
   {/*      <button onClick={savePainting}>Save</button> */}
        </div>
        
    )
})