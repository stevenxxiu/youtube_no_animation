// ==UserScript==
// @name        YouTube No Animation
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch*
// @grant       none
// @inject-into content
// @version     1.0
// @author      -
// @description 25/01/2026, 1:15:20 am
// ==/UserScript==

const SVG_NS = 'http://www.w3.org/2000/svg'
const LIKE_ACTIVE_SVG = `{LIKE_ACTIVE_SVG}`
const LIKE_INACTIVE_SVG = `{LIKE_INACTIVE_SVG}`

function hookButtons() {
  const topRow = document.getElementById('top-row')
  const likeSvg = topRow.querySelector('like-button-view-model svg')
  let isLiked = likeSvg.querySelectorAll(':scope > g > g[style="display: block;"]').length == 2

  const parser = new DOMParser()
  const svgSource = isLiked ? LIKE_ACTIVE_SVG : LIKE_INACTIVE_SVG
  const userLikeSvg = parser.parseFromString(svgSource, 'text/html').body.firstElementChild

  const likeButton = topRow.querySelector('like-button-view-model button')
  const likeSvgContainer = topRow.querySelector('like-button-view-model button lottie-component')
  likeSvgContainer.prepend(userLikeSvg)
  likeButton.addEventListener(
    'click',
    () => {
      isLiked = !isLiked
      userLikeSvg.innerHTML = isLiked ? LIKE_ACTIVE_SVG : LIKE_INACTIVE_SVG
    },
    false,
  )
}

function main() {
  const observer = new MutationObserver(() => {
    if (document.body.querySelector('#top-row dislike-button-view-model svg')) {
      hookButtons()
      observer.disconnect()
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}

main()
