import React from 'react'

//if callback is the same then the component will not render again with memo
export default React.memo(({ cb }) => {
    return <button 
    className="new-colors-btn"
    onClick={cb}
    >New colors</button>
})