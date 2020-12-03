
interface IVisibilityEvent {
    visible: boolean
}

/**
 * Creates a new video element from a certain source
 * @param {string} source
 * @return {HTMLVideoElement}
 */
export function createVideoElement (source: string): HTMLVideoElement | undefined {
  if (!source) {
    return
  }
  const videoElement = document.createElement('video')
  videoElement.src = source
  return videoElement
}

/**
 * Waits until the target is visible to insert the a video element
 * By default the video will pause when the container is not visible
 * @param {HTMLElement} target
 * @param {HTMLVideoElement} videoElement
 * @param {{pauseOnNoVisible: boolean}} options
 */
export function onInsertVideoWhenTargetIsVisible (target: HTMLElement, videoElement: HTMLVideoElement, options = { pauseOnNoVisible: true }): void {
  // Store if the element has been appended, we do not want to append it over and over
  let appended = false
  const cleanFn = onVisible(target, (visibilityEvent: IVisibilityEvent) => {
    if (!appended && visibilityEvent.visible) {
      target.appendChild(videoElement)
      appended = true
    }
    // Check if we need to pause the video when it is not visible
    if (appended && !visibilityEvent.visible && options.pauseOnNoVisible) {
      videoElement.pause()
    }
    // Try to autoplay the selected video
    if (appended && visibilityEvent.visible) {
      autoplayVideoElement(videoElement)
    }
  })
  // Once the video has ended we need to remove the child from the target element
  // and clean all the handlers
  videoElement.addEventListener('ended', () => {
    target.removeChild(videoElement)
    cleanFn()
  })
}

/**
 * Given an element the callback given as parameter will be called
 * The callback will report the visibility of the element
 * @param {HTMLElement} element
 * @param {Function} callback
 */
export function onVisible (element: HTMLElement, callback: (ev: IVisibilityEvent) => void): () => void {
  // The callback will be called with the visibility of the element
  const visibilityHandler = () => {
    callback({ visible: isElementInViewport(element) })
  }

  window.addEventListener('load', visibilityHandler)
  window.addEventListener('resize', visibilityHandler)
  window.addEventListener('scroll', visibilityHandler)

  // This will give us a way to unsubscribe from the events
  return () => {
    window.removeEventListener('load', visibilityHandler)
    window.removeEventListener('resize', visibilityHandler)
    window.removeEventListener('scroll', visibilityHandler)
  }
}

/**
 * Checks if the elemen is in the viewport
 * @param {HTMLElement} element
 */
export function isElementInViewport (element: HTMLElement): boolean {
  if (!element) {
    return false;
  }

  const rect = element.getBoundingClientRect()

  // If no rect is given, return early
  if (!rect) {
    return false;
  }

  return (
    rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight)
  )
}

/**
 * In case we are not able to play the video, mute it and try again
 * @param {HTMLVideoElement} videoElement
 */
export async function autoplayVideoElement (videoElement: HTMLVideoElement) {
  try {
    await videoElement.play()
  } catch (e) {
    videoElement.muted = true
    videoElement.play()
  }
}
