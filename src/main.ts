import './style.css'
import './timebar.css'

import './buttons'

let sc = document.querySelector('.scroll-content') as HTMLElement
let sbx = document.querySelector('.scroll-bar-x') as HTMLElement
let sby = document.querySelector('.scroll-bar-y') as HTMLElement

function update() {
  let height = Math.max(sc.clientHeight ** 2 / sc.scrollHeight, 32)
  let width = Math.max(sc.clientWidth ** 2 / sc.scrollWidth, 32)
  sc.style.setProperty('--scrollbar-length-y', `${height}px`)
  sc.style.setProperty('--scrollbar-length-x', `${width}px`)
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

class Axis {
  private lastContentStart : number
  private offset = 0

  constructor(
    private readonly sb: HTMLElement,
    private readonly axis: 'x' | 'y',
  ) {
    this.lastContentStart = this.contentStart

    this.drag = this.drag.bind(this)
    this.endDragging = this.endDragging.bind(this)
    this.startDragging = this.startDragging.bind(this)

    sb.addEventListener('mousedown', this.startDragging, true)
  }

  get scrollSize(): number {
    if (this.axis === 'x') return sc.scrollWidth
    else return sc.scrollHeight
  }

  get clientSize(): number {
    if (this.axis === 'x') return sc.clientWidth
    else return sc.clientHeight
  }

  get length(): number {
    if (this.axis === 'x') return this.sb.clientWidth
    else return this.sb.clientHeight
  }

  get contentStart(): number {
    return sc.getBoundingClientRect()[this.axis === 'x' ? 'left' : 'top']
  }

  get scrollStart(): number {
    return this.sb.getBoundingClientRect()[this.axis === 'x' ? 'left' : 'top']
  }

  drag(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    let pageOffset : number = this.axis === 'y' ? event.pageY : event.pageX;
  
    let drag = pageOffset - this.lastContentStart - this.offset
  
    let dragPercent = drag / (this.clientSize - this.length)
    let scroll = dragPercent * (this.scrollSize - this.clientSize)
  
    if (this.axis === 'x') sc.scrollLeft = scroll
    else sc.scrollTop = scroll
  }

  endDragging() {
    window.removeEventListener('mousemove', this.drag, true)
    window.removeEventListener('mouseup', this.endDragging, true)
    document.body.classList.remove('timebar-dragging')
  }

  startDragging(event: MouseEvent) {
    this.lastContentStart = this.contentStart
    let pageOffset : number = this.axis === 'y' ? event.pageY : event.pageX;
    this.offset = pageOffset - this.scrollStart
  
    window.addEventListener('mouseup', this.endDragging, true)
    window.addEventListener('mousemove', this.drag, true)
    document.body.classList.add('timebar-dragging')
  }
}

new Axis(sbx, 'x')
new Axis(sby, 'y')
