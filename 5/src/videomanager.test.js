import { createVideoElement, onVisible, isElementInViewport, autoplayVideoElement } from './videomanager'

describe('videomanager', () => {
  describe('createVideoElement', () => {
    test('assert src is added correctly', () => {
      const mockUrl = 'https://mock.com/'
      const video = createVideoElement(mockUrl)
      expect(video.src).toBe(mockUrl)
    })

    test.each([null, undefined])('setting non valid values as src: %o', (value) => {
      const nonVideo = createVideoElement(value)
      expect(nonVideo).toBeUndefined()
    })
  })

  describe('onInsertVideoWhenTargetIsVisible', () => {
    test.todo('normal behavior')
    test.todo('pause on non visible')
  })

  describe('onVisible', () => {
    let element
    let callback

    beforeEach(() => {
      element = document.createElement('div')
      callback = jest.fn()
    })

    test('subscribing to events', () => {
      jest.spyOn(window, 'addEventListener')

      onVisible(element, callback)

      expect(window.addEventListener).toHaveBeenCalledTimes(3)
      expect(window.addEventListener).toHaveBeenNthCalledWith(1, 'load', expect.any(Function))
      expect(window.addEventListener).toHaveBeenNthCalledWith(2, 'resize', expect.any(Function))
      expect(window.addEventListener).toHaveBeenNthCalledWith(3, 'scroll', expect.any(Function))
    })

    test('unsubscribing from events', () => {
      jest.spyOn(window, 'removeEventListener')

      const cleanFn = onVisible(element, callback)

      cleanFn()

      expect(window.removeEventListener).toHaveBeenCalledTimes(3)
      expect(window.removeEventListener).toHaveBeenNthCalledWith(1, 'load', expect.any(Function))
      expect(window.removeEventListener).toHaveBeenNthCalledWith(2, 'resize', expect.any(Function))
      expect(window.removeEventListener).toHaveBeenNthCalledWith(3, 'scroll', expect.any(Function))
    })

    test('event from window will trigger callback', () => {
      onVisible(element, callback)

      window.dispatchEvent(new Event('load'))

      expect(callback).toHaveBeenCalled()
    })
  })

  describe('isElementInViewport', () => {
    let element
    beforeEach(() => {
      element = document.createElement('div')
    })

    test('element is in viewport', () => {
      jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({ bottom: 1, top: 1, left: 1, right: 1 })

      expect(isElementInViewport(element)).toBeTruthy()
    })

    test('no element', () => {
      expect(isElementInViewport(undefined)).toBeFalsy()
    })

    test('unable to get rect', () => {
      jest.spyOn(element, 'getBoundingClientRect').mockReturnValue(undefined)
      expect(isElementInViewport(element)).toBeFalsy()
    })
  })

  describe('autoplayVideoElement', () => {
    let videoElement

    beforeEach(() => {
      videoElement = document.createElement('video')
    })

    test('able to set autoplay', async () => {
      jest.spyOn(videoElement, 'play').mockResolvedValue()

      await autoplayVideoElement(videoElement)

      expect(videoElement.play).toHaveBeenCalledTimes(1)
      expect(videoElement.muted).toBeFalsy()
    })

    test('unable to set autoplay, mute is required', async () => {
      jest.spyOn(videoElement, 'play').mockResolvedValue()
      jest.spyOn(videoElement, 'play').mockRejectedValueOnce()

      await autoplayVideoElement(videoElement)

      expect(videoElement.play).toHaveBeenCalledTimes(2)
      expect(videoElement.muted).toBeTruthy()
    })
  })
})
