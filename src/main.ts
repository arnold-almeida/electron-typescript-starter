// Don't report Realm JS analytics data
// @see https://github.com/realm/realm-js/blob/master/lib/submit-analytics.js#L28
process.env.REALM_DISABLE_ANALYTICS = 'true';

// This is needed to prevent Realm JS from writing to directories it doesn't have access to
import './utils/process-directories';

import { app, ipcMain } from 'electron';

// Loading the fetch API polyfill - so we can use this from the node main process too.
import 'isomorphic-fetch';

import { Application } from './main/Application';
import { initialise } from './config/realm';
import { Owner } from './entities';

const isDevelopment = process.env.NODE_ENV === 'development';

// Make node understand the source-maps emitted from WebPack.
if (isDevelopment) {
  // We must require this the old fasioned way, as this is a dev dependency that might
  // not be available when the packaged application is shipped, and import statements cannot
  // be used in a block like this.
  // tslint:disable-next-line:no-var-requires
  require('source-map-support').install();
}

Application.sharedApplication.run();
app.on('will-quit', () => {
  Application.sharedApplication.destroy();
});

// Look for changes to application
if (module.hot) {
  module.hot.accept('./main/Application', () => {
    const NewApplication = require('./main/Application').Application;
    NewApplication.sharedApplication.run();
  });
} else if (isDevelopment) {
  // tslint:disable-next-line:no-console
  console.warn('Hot module replacement was disabled!');
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const rlm = initialise()

// @ts-ignore
ipcMain.on('request-names', event => {
  const owners: Realm.Results<Owner> = rlm.objects('Owner')
  event.sender.send(
    'receive-names',
    owners.map(o => o.name)
  )
})
