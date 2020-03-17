import React from 'react'

import { useStoreState, useStoreActions } from '../redux'

export const Button: React.FC = () => {
  const nameList = useStoreState(s => s.app.nameList)
  const setNames = useStoreActions(a => a.app.fetchNameList)
  const versions = Object.entries(process.versions)

  return (
    <div>
      <h1>WOOHOO</h1>
      <button
        onClick={() => {
          setNames()
        }}
      >
        Click moi
      </button>

      <p>Realm stuff:</p>
      <ul>
        {nameList.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p>Versions:</p>
      <ul>
        {versions.map(t => (
          <li key={t[0]}>{t[0] + ' =>  ' + t[1]}</li>
        ))}
      </ul>
    </div>
  )
}
