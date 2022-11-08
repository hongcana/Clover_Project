import React from 'react'

// const styleInfo = {
//   paddingRight: '10px'
// }

export const List = ({ data }) => {
  return (
    data.map(item => (
      <ul key={item.code}>
        <li style={{ position: 'relative', left: '80px' }}>
          <span style={{ paddingRight: '10px' }}>{item.code}</span>
          <span style={{ paddingRight: '10px' }}>{item.name}</span>
        </li>
      </ul >
    ))
  )
}
