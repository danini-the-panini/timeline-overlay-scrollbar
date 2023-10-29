import './style.css'
import './timebar.css'

import './buttons'

let sc = document.querySelector('.scroll-content') as HTMLElement
let sb = document.querySelector('.scroll-bar') as HTMLElement

function update() {
  let height = Math.max(sc.clientHeight ** 2 / sc.scrollHeight, 32)
  sc.style.setProperty('--scrollbar-height', `${height}px`)
}
requestAnimationFrame(update)

let resizeObserver = new ResizeObserver(() => {
  requestAnimationFrame(update)
})

resizeObserver.observe(sc)

let mutationObserver = new MutationObserver(() => {
  requestAnimationFrame(update)
})

mutationObserver.observe(sc, {
  childList: true,
  subtree: true,
  characterData: true,
})

let contentTop = sc.getBoundingClientRect().top
let dragOffset = 0

function drag(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()

  let dragTop = event.pageY - contentTop - dragOffset

  let dragPercent = dragTop / (sc.clientHeight - sb.clientHeight)
  let scrollTop = dragPercent * (sc.scrollHeight - sc.clientHeight)

  sc.scrollTop = scrollTop
}

function endDragging() {
  window.removeEventListener('mousemove', drag, true)
  window.removeEventListener('mouseup', endDragging, true)
  document.body.classList.remove('timebar-dragging')
}

function startDragging(event: MouseEvent) {
  contentTop = sc.getBoundingClientRect().top
  dragOffset = event.pageY - sb.getBoundingClientRect().top

  window.addEventListener('mouseup', endDragging, true)
  window.addEventListener('mousemove', drag, true)
  document.body.classList.add('timebar-dragging')
}

sb.addEventListener('mousedown', startDragging, true)