import electron from 'electron'
import { MemoryRouter as Router } from 'react-router-dom'
import React from 'react'
// import Realm from 'realm'

import { IUpdateStatus } from 'src/main/Updater'
import { IMenuGeneratorProps as Props } from 'src/windows/MenuGenerator'

import { Button } from './Button'
import { store } from '../redux'
import { StoreProvider } from 'easy-peasy'

interface State {
  isCloudInstancesDropdownOpen: boolean
  isSyncEnabled: boolean
  updateStatus: IUpdateStatus
  version: string
}

export class Welcome extends React.Component<Props, State> {
  public state: State = {
    isCloudInstancesDropdownOpen: false,
    isSyncEnabled: false,
    updateStatus: {
      state: 'up-to-date',
    },
    version: electron.remote.app.getVersion() || 'unknown',
  }

  public componentDidMount() {
    const log = () => this.updateStatusChanged('in componentDidMount')
    electron.ipcRenderer.on('update-status', log)

    // Require realm and check update state with the sync support
    // Using nextTick to prevent blocking when loading realm
    // process.nextTick(() => {
    //   const Realm = require('realm');

    //   console.log('mounted')
    //   this.setState({
    //     isSyncEnabled: !!Realm.Sync,
    //   });
    // });
  }

  public componentWillUnmount() {
    const log = () => this.updateStatusChanged('in componentDidMount')
    electron.ipcRenderer.removeListener('update-status', log)
  }

  public updateStatusChanged(note: string = '') {
    console.log(`updateStatusChanged() note: ${note}`)
  }

  public render() {
    return (
      <Router>
        <StoreProvider store={store}>
          <>
            <p>Welcome to the jungle </p>
            <Button />
          </>
        </StoreProvider>
      </Router>
    )
  }
}
