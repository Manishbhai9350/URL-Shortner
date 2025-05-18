import React, { useEffect, useState } from 'react'

const useWindow = () => {
    const [Dimentions, setDimentions] = useState({width:0,height:0})

    useEffect(() => {
        const OnResize = () => {
            setDimentions({width:innerWidth,height:innerHeight})
        }
        OnResize()
        window.addEventListener('resize',OnResize)
        return () => {
          window.removeEventListener('resize',OnResize)
      }
    }, [])
    

  return Dimentions
}

export default useWindow