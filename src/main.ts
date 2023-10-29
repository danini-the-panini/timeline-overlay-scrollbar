import './style.css'
import './timebar.css'

import './buttons'

let sw = document.querySelector('.scroll-wrapper') as HTMLElement
let sc = document.querySelector('.scroll-content') as HTMLElement
// let thead = document.querySelector('thead')
// sc.style.setProperty('--scrollbar-offset-top', `${thead.clientHeight}px`)

function update() {
  console.log('updating', sc.clientHeight, sc.scrollHeight)
  let ratio = sc.clientHeight / sc.scrollHeight
  let percent = (ratio * 100).toString() + '%'
  sc.style.setProperty('--scrollbar-height', percent)
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