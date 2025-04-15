import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold bg-gradient-to-r from-cyan-500 via-cyan-200 to-cyan-500 bg-clip-text text-transparent'>
         {text}

    </span>
  )
}

export default HighlightText