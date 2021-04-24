import React, { useState } from React

export default function UseHistory () {
    const useHistory = (initialState) => {
        const [drawing, setDrawing] = useState(initialState)
    }

    return [drawing, setDrawing];
}