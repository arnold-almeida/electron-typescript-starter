////////////////////////////////////////////////////////////////////////////
//
// Copyright 2018 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

import { app, dialog, Menu } from 'electron'

import { LOUPE_PROTOCOL } from '../constants'
import { Updater } from './Updater'
import { WindowManager } from './WindowManager'
import { getDefaultMenuTemplate } from './MainMenu'

export class Application {
  public static sharedApplication = new Application()

  private windowManager = new WindowManager()
  private updater = new Updater(this.windowManager)

  // All files opened while app is loading will be stored on this array and opened when app is ready
  // @ts-ignore
  private delayedRealmOpens: string[] = []

  // All urls opened while app is loading will be stored in this array and opened when app is ready
  // @ts-ignore
  private delayedUrlOpens: string[] = []

  public run() {
    // Check to see if this is the first instance or not
    const hasAnotherInstance = app.requestSingleInstanceLock() === false

    if (hasAnotherInstance) {
      // Quit the app if started multiple times
      app.quit()
    } else {
      // Register as a listener for specific URLs
      this.registerProtocols()

      // In Mac we detect the files opened with `open-file` event otherwise we need get it from `process.argv`
      if (process.platform !== 'darwin') {
        this.processArguments(process.argv)
      }
      // Register all app listeners
      this.addAppListeners()

      // If its already ready - the handler won't be called
      if (app.isReady()) {
        this.onReady()
      }
      // Handle any second instances of the Application
      app.on('second-instance', this.onInstanceStarted)
    }
  }

  public destroy() {
    this.removeAppListeners()
    this.updater.destroy()
    this.windowManager.closeAllWindows()
  }

  public userDataPath(): string {
    return app.getPath('userData')
  }

  // Example of how to use the window manager
  // public showConnectToServer(
  //   props: IConnectToServerWindowProps,
  // ): Promise<void> {
  //   const { window, existing } = this.windowManager.createWindow({
  //     type: 'connect-to-server',
  //     props,
  //   });

  //   if (existing) {
  //     window.focus();
  //     return Promise.resolve();
  //   } else {
  //     return new Promise<undefined>(resolve => {
  //       window.show();
  //       window.webContents.once('did-finish-load', () => {
  //         resolve();
  //       });
  //     });
  //   }
  // }

  public showGreeting(): Promise<void> {
    const { window, existing } = this.windowManager.createWindow({
      type: 'greeting',
      props: {},
    })

    if (existing) {
      window.focus()
      return Promise.resolve()
    } else {
      return new Promise(resolve => {
        // Save this for later
        // Show the window, the first time its ready-to-show
        window.once('ready-to-show', () => {
          window.show()
          resolve()
        })
        // Check for updates, every time the contents has loaded
        window.webContents.on('did-finish-load', () => {
          this.updater.checkForUpdates(true)
        })
        this.updater.addListeningWindow(window)
        window.once('close', () => {
          this.updater.removeListeningWindow(window)
        })
      })
    }
  }

  public checkForUpdates() {
    this.updater.checkForUpdates()
  }

  private addAppListeners() {
    app.addListener('ready', this.onReady)
    app.addListener('activate', this.onActivate)
    app.addListener('window-all-closed', this.onWindowAllClosed)
  }

  private removeAppListeners() {
    app.removeListener('ready', this.onReady)
    app.removeListener('activate', this.onActivate)
    app.removeListener('window-all-closed', this.onWindowAllClosed)
  }

  private onReady = async () => {
    this.setDefaultMenu()
    if (this.windowManager.windows.length === 0) {
      // Wait for the greeting window to show - if no other windows are open
      await this.showGreeting()
    }
    this.performDelayedTasks()
  }

  private onActivate = () => {
    if (this.windowManager.windows.length === 0) {
      this.showGreeting()
    }
  }

  private onWindowAllClosed = () => {
    if (process.platform !== 'darwin') {
      app.quit()
    } else {
      this.setDefaultMenu()
    }
  }

  private registerProtocols() {
    console.log('registerProtocols()')
    this.registerProtocol(LOUPE_PROTOCOL)
  }

  /**
   * If not already - register this as the default protocol client for a protocol
   */
  private registerProtocol(protocol: string) {
    if (!app.isDefaultProtocolClient(protocol)) {
      const success = app.setAsDefaultProtocolClient(protocol)
      if (!success) {
        dialog.showErrorBox(
          'Failed when registering loupe protocol',
          `Loupe could not register the ${protocol}:// protocol.`
        )
      }
    }
  }

  /**
   * This is called when another instance of the app is started on Windows or Linux
   */
  private onInstanceStarted = async (
    event: Event,
    argv: string[],
    workingDirectory: string
  ) => {
    this.processArguments(argv)
    await this.showGreeting()
    this.performDelayedTasks()
  }

  private setDefaultMenu = () => {
    const menuTemplate = getDefaultMenuTemplate(this.setDefaultMenu)
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
  }

  private processArguments(argv: string[]) {
    this.delayedRealmOpens = argv.filter(arg => {
      return arg.endsWith('.realm')
    })
    this.delayedUrlOpens = argv.filter(arg => {
      return arg.startsWith(`${LOUPE_PROTOCOL}://`)
    })
  }

  private async performDelayedTasks() {
    console.log('Perform delayed tasks')
  }
}

if (module.hot) {
  module.hot.dispose(() => {
    Application.sharedApplication.destroy()
  })
}
