// Don't report Realm JS analytics data
// @see https://github.com/realm/realm-js/blob/master/lib/submit-analytics.js#L28
process.env.REALM_DISABLE_ANALYTICS = 'true'

// This is needed to prevent Realm JS from writing to directories it doesn't have access to
import './utils/process-directories'

import { app, ipcMain } from 'electron'

import { Application } from './main/Application'
import { initialise } from './config/realm'
import { Owner } from './entities'

const isDevelopment = process.env.NODE_ENV === 'development'

// Make node understand the source-maps emitted from WebPack.
if (isDevelopment) {
  // We must require this the old fasioned way, as this is a dev dependency that might
  // not be available when the packaged application is shipped, and import statements cannot
  // be used in a block like this.
  // tslint:disable-next-line:no-var-requires no-require-imports
  require('source-map-support').install()

  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
    // tslint:disable-next-line:no-var-requires no-require-imports
  } = require('electron-devtools-installer')

  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name: string) => console.log(`Added Extension:  ${name}`))
    .catch((err: string) => console.log('An error occurred: ', err))

  installExtension(REDUX_DEVTOOLS)
    .then((name: string) => console.log(`Added Extension:  ${name}`))
    .catch((err: string) => console.log('An error occurred: ', err))
}

Application.sharedApplication.run()

// Look for changes to application
if (module.hot) {
  module.hot.accept('./main/Application', () => {
    // tslint:disable-next-line:no-require-imports
    const NewApplication = require('./main/Application').Application
    NewApplication.sharedApplication.run()
  })
} else if (isDevelopment) {
  console.warn('Hot module replacement was disabled!')
}

// Set the about window options
app.setAboutPanelOptions({
  applicationName: 'Loupe',
  applicationVersion: '0.1.0',
  version: '0.1.0',
  iconPath: '../resources/icon.png', // not working?
})

//////////////////////////////
// APPLICATION EVENT LISTENERS
//////////////////////////////
app.on('will-quit', () => {
  Application.sharedApplication.destroy()
})

//////////////////////////////
//    IPC MAIN LISTENERS
//////////////////////////////
const rlm = initialise()

ipcMain.on('request-names', event => {
  const owners: Realm.Results<Owner> = rlm.objects('Owner')
  event.sender.send(
    'receive-names',
    owners.map(o => o.name)
  )
})
