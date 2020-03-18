// tslint:disable:max-classes-per-file

// tslint:disable-next-line:interface-name
interface Window {
  ResizeObserver: ResizeObserver
}

/**
 * The ResizeObserver interface is used to observe changes to Element's content
 * rect.
 *
 * It is modeled after MutationObserver and IntersectionObserver.
 *
 * The ResizeObserver interface reports changes to the content rectangle of an Element or the bounding box of an SVGElement. The content rectangle is the box in which content can be placed, meaning the border box minus the padding. (See The box model for an explanation of borders and padding.)
 *
 * ResizeObserver avoids infinite callback loops and cyclic dependencies that would be created by resizing in its own callback function. It does this by only processing elements deeper in the DOM in subsequent frames. Implementations should, if they follow the specification, invoke resize events before paint and after layout.
 *
 * @see https://gist.github.com/strothj/708afcf4f01dd04de8f49c92e88093c3
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 * @see https://github.com/Microsoft/TypeScript/issues/28502
 */
declare class ResizeObserver {
  /**
   * Adds target to the list of observed elements.
   */
  public observe: (target: Element) => void

  /**
   * Removes target from the list of observed elements.
   */
  public unobserve: (target: Element) => void

  /**
   * Clears both the observationTargets and activeTargets lists.
   */
  public disconnect: () => void
  public constructor(callback: ResizeObserverCallback)
}

/**
 * This callback delivers ResizeObserver's notifications. It is invoked by a
 * broadcast active observations algorithm.
 */
type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver
) => void

declare class ResizeObserverEntry {
  /**
   * The Element whose size has changed.
   */
  public readonly target: Element

  /**
   * Element's content rect when ResizeObserverCallback is invoked.
   */
  public readonly contentRect: DOMRectReadOnly
  /**
   * @param target The Element whose size has changed.
   */
  public constructor(target: Element)
}

// tslint:disable-next-line:interface-name
interface DOMRectReadOnly {
  // static fromRect(other: DOMRectInit | undefined): DOMRectReadOnly;

  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly top: number
  readonly right: number
  readonly bottom: number
  readonly left: number

  toJSON: () => any
}
