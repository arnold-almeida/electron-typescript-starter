import { createStore, createTypedHooks, State } from 'easy-peasy'
import model, { LoupeModel, config } from './state'

const typedHooks = createTypedHooks<LoupeModel>()

const useStoreActions = typedHooks.useStoreActions
const useStoreDispatch = typedHooks.useStoreDispatch
const useStoreState = typedHooks.useStoreState

const store = createStore(model, config)

export { store, useStoreActions, useStoreDispatch, useStoreState, State }
