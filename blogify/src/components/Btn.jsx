import React from 'react'

function Btn({
    children,
    type = 'button',
    bgColor = 'bg-orange-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className= {`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}  {...props}>
        {children}
    </button>
  )
}

export default Btn