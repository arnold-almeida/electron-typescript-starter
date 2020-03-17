// tslint:disable:max-classes-per-file

declare module '*.svg' {
  const svg: {
    id: string
    viewBox: string
    url: string
  }
  export default svg
}

// Adding module declarations for packages that has no types available
declare module 'react-inspector' {
  type NodeRenderer = (props: IConnectedTreeNodeProps) => React.ReactNode

  export interface ITreeNodeProps {
    name: string
    data: any
    expanded: boolean
    shouldShowArrow: boolean
    shouldShowPlaceholder: boolean
    nodeRenderer: NodeRenderer
    onClick: React.MouseEventHandler
  }

  export interface IConnectedTreeNodeProps {
    name: string
    data: any
    expanded: boolean
    dataIterator: () => any
    nodeRenderer: NodeRenderer
    depth: number
    // This is not officially a prop of the ConnectedTreeNode, but it seems to be passed
    isNonenumerable: boolean
  }

  /**
   * Like console.log. Consider this as a glorified version of <pre>JSON.stringify(data, null, 2)</pre>.
   * @see https://www.npmjs.com/package/react-inspector#objectinspector-
   */
  export interface IObjectInpectorProps {
    /**
     * The Javascript object you would like to inspect
     */
    data: any
    /**
     * Specify the optional name of the root node, default to undefined
     * @see https://www.npmjs.com/package/react-inspector#name-proptypesstring--specify-the-optional-name-of-the-root-node-default-to-undefined
     */
    name?: string
    /**
     * An integer specifying to which level the tree should be initially expanded.
     * @see https://www.npmjs.com/package/react-inspector#expandlevel-proptypesnumber--an-integer-specifying-to-which-level-the-tree-should-be-initially-expanded
     */
    expandLevel?: number
    /**
     * An array containing all the paths that should be expanded when the component is initialized,
     * or a string of just one path.
     * @see https://www.npmjs.com/package/react-inspector#expandpaths-proptypesoneoftypeproptypesstring-proptypesarray--an-array-containing-all-the-paths-that-should-be-expanded-when-the-component-is-initialized-or-a-string-of-just-one-path
     */
    expandPaths?: string[] | string
    /**
     * Show non-enumerable properties.
     * @see https://www.npmjs.com/package/react-inspector#shownonenumerable-proptypesbool--show-non-enumerable-properties
     */
    showNonenumerable?: boolean
    /**
     * Sort object keys with optional compare function.
     * @see https://www.npmjs.com/package/react-inspector#sortobjectkeys-proptypesoneoftypeproptypesbool-proptypesfunc--sort-object-keys-with-optional-compare-function
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description
     */
    sortObjectKeys?: boolean | ((a: any, b: any) => number)
    /**
     * Use a custom nodeRenderer to render the object properties.
     * @see https://www.npmjs.com/package/react-inspector#noderenderer-proptypesfunc--use-a-custom-noderenderer-to-render-the-object-properties-optional
     */
    nodeRenderer?: NodeRenderer
  }

  /*
  export interface IObjectInpectorState {
    expandedPaths: { [path: string]: boolean };
  }
  */

  export class ObjectInspector<
    P extends IObjectInpectorProps = IObjectInpectorProps
  > extends React.Component<P, {}> {
    protected setExpanded(path: string, expanded: boolean): void
  }

  export interface IObjectLabelProps {
    name: string
    data: any
    /**
     * Non enumerable object property will be dimmed
     */
    isNonenumerable: boolean
  }

  /**
   * Renders the object with a label.
   * if isNonenumerable is specified, render the name dimmed
   */
  export class ObjectLabel extends React.Component<IObjectLabelProps> {}

  export interface IObjectValueProps {
    object: any
  }
  export class ObjectValue extends React.Component<IObjectValueProps> {}
}

declare module 'segfault-handler' {
  export function registerHandler(path: string): void
}
