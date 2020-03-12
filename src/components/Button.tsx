import React from 'react'

import { useStoreState, useStoreActions } from '../redux'

export const Button: React.FC = () => {
  const nameList = useStoreState(s => s.app.nameList)
  const setNames = useStoreActions(a => a.app.fetchNameList)

  return (
    <div>
      <h1>WOOHOO</h1>
      <button onClick={() => {
        setNames()
      }}>Click moi</button>
      <p>The stuff:</p>
      <ul>
        {nameList.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
