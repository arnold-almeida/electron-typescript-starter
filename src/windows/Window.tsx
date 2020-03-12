import { IMenuGeneratorProps } from './MenuGenerator';
import { WindowOptions, WindowType } from './WindowOptions';
import { WindowProps } from './WindowProps';

export type InnerWindowComponent = React.ComponentClass<
  WindowProps & IMenuGeneratorProps
>;

export interface IWindow {
  getComponent(): Promise<InnerWindowComponent>;
  getWindowOptions(
    props: WindowProps,
  ): Partial<Electron.BrowserWindowConstructorOptions>;
  getSingletonKey?(props: WindowProps): string | undefined;
  getTrackedProperties(props: WindowProps): { [key: string]: string };
}

import { GreetingWindow } from './GreetingWindow';

export interface IWindowConstructorOptions
  extends Partial<Electron.BrowserWindowConstructorOptions> {
  maximize?: boolean;
}

export function getWindowClass(type: WindowType): IWindow {
  // We're using calls to require here, to prevent loading anything that does not
  // relate to the specific window being loaded.
  if (type === 'greeting') {
    return GreetingWindow;
  } else {
    throw new Error(`Unexpected window type: ${type}`);
  }
}

/*
 * Generate options that should get passed to the BrowserWindow constructor,
 * when opening a particular window type.
 */
export function getWindowOptions({
  type,
  props,
}: WindowOptions): IWindowConstructorOptions {
  const WindowClass = getWindowClass(type);
  return WindowClass.getWindowOptions(props);
}

export function getSingletonKey({
  type,
  props,
}: WindowOptions): string | undefined {
  const WindowClass = getWindowClass(type);
  return WindowClass.getSingletonKey
    ? WindowClass.getSingletonKey(props)
    : undefined;
}
