import { State } from 'easy-peasy'
import { composeWithDevTools, EnhancerOptions } from 'redux-devtools-extension'

import { app, AppState } from './AppState'

export interface LoupeModel {
  app: AppState
}

const model: LoupeModel = {
  app,
}

const options = {
  name: 'LOUPE APP DEVTOOLS',
  serialize: {
    replacer: (key: any, value: any) => {
      // Parse redux devtools input so that huge
      // Base64 image strings don't make it splode.
      if (key === 'thumbnail' || key === 'preview') {
        if (typeof value === 'string') {
          return `${value.substring(0, 50)}<<LONG BASE 64 STRING>>`
        } else {
          return value
        }
      } else {
        return value
      }
    },
  },
} as EnhancerOptions

export const config = {
  compose: composeWithDevTools(options),
}

export { app, AppState, State }

export default model
