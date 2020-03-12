import { Action, action, Thunk, thunk } from 'easy-peasy'
import { ipcRenderer } from 'electron'

export interface AppState {
  nameList: string[]
  setNameList: Action<AppState, string[]>
  fetchNameList: Thunk<AppState>

  carList: string[]
  setCarList: Action<AppState, string[]>
  fetchCarList: Thunk<AppState>
}

export const app: AppState = {
  nameList: [],
  setNameList: action((state, names) => {
    state.nameList = names
  }),
  fetchNameList: thunk(actions => {
    ipcRenderer.once('receive-names', (_event: Event, names: string[]) => {
      actions.setNameList(names)
    })
    ipcRenderer.send('request-names')
  }),
  carList: [],
  setCarList: action((state, names) => {
    state.nameList = names
  }),
  fetchCarList: thunk(actions => {
    ipcRenderer.once('receive-cars', (_event: Event, names: string[]) => {
      actions.setNameList(names)
    })
    ipcRenderer.send('request-cars')
  }),
}
