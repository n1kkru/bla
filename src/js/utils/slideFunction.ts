export function slideUp(target: HTMLElement, duration: number = 400, callback?: () => void): void {
  if (target['slideUp']) return
  target['slideDown'] = false
  target['slideUp'] = true

  target.style.transitionProperty = 'height, margin, padding'
  target.style.transitionDuration = duration + 'ms'
  target.style.boxSizing = 'border-box'
  target.style.height = target.offsetHeight + 'px'

  target.offsetHeight

  target.style.overflow = 'hidden'
  target.style.height = '0'
  target.style.paddingTop = '0'
  target.style.paddingBottom = '0'
  target.style.marginTop = '0'
  target.style.marginBottom = '0'

  window.setTimeout(() => {
    target.style.display = 'none'
    target.style.removeProperty('height')
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    target.style.removeProperty('overflow')
    target.style.removeProperty('transition-duration')
    target.style.removeProperty('transition-property')

    if (callback) {
      callback()
    }
  }, duration)
}

export function slideDown(
  target: HTMLElement,
  duration: number = 400,
  callback?: () => void
): void {
  if (target['slideDown']) return
  target['slideDown'] = true
  target['slideUp'] = false

  target.style.removeProperty('display')
  let display = window.getComputedStyle(target).display
  if (display === 'none') display = 'block'
  target.style.display = display

  const height = target.offsetHeight

  target.style.overflow = 'hidden'
  target.style.height = '0'
  target.style.paddingTop = '0'
  target.style.paddingBottom = '0'
  target.style.marginTop = '0'
  target.style.marginBottom = '0'

  target.offsetHeight // trigger reflow

  target.style.boxSizing = 'border-box'
  target.style.transitionProperty = 'height, margin, padding'
  target.style.transitionDuration = duration + 'ms'
  target.style.height = height + 'px'

  target.style.removeProperty('padding-top')
  target.style.removeProperty('padding-bottom')
  target.style.removeProperty('margin-top')
  target.style.removeProperty('margin-bottom')

  window.setTimeout(() => {
    target.style.removeProperty('height')
    target.style.removeProperty('overflow')
    target.style.removeProperty('transition-duration')
    target.style.removeProperty('transition-property')

    if (callback) {
      callback()
    }
  }, duration)
}

export function slideToggle(
  target: HTMLElement,
  duration: number = 400,
  callback?: () => void
): void {
  if (target['slideUp']) {
    slideUp(target, duration, () => {
      target['slideDown'] = false
      callback && callback()
    })
  } else {
    slideDown(target, duration, () => {
      target['slideDown'] = true
      callback && callback()
    })
  }
}

export function initSlide(): void {
  window.slideToggle = slideToggle
  window.slideDown = slideDown
  window.slideUp = slideUp
}
