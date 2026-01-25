// ==UserScript==
// @name        YouTube No Animation
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch?*
// @match       https://m.youtube.com/watch?*
// @grant       none
// @inject-into content
// @version     1.0
// @author      -
// @description 25/01/2026, 1:15:20 am
// ==/UserScript==

const SVG_NS = 'http://www.w3.org/2000/svg'
const LIKE_ACTIVE_SVG = `{LIKE_ACTIVE_SVG}`
const LIKE_INACTIVE_SVG = `{LIKE_INACTIVE_SVG}`

function hookButtons(isDesktop) {
  const buttonsContainer = document.querySelector('#top-row, segmented-like-dislike-button-view-model')
  const likeSvg = buttonsContainer.querySelector('like-button-view-model svg')
  likeSvg.style.display = 'none'
  let isLiked = likeSvg.querySelectorAll(':scope > g > g[style="display: block;"]').length == 2

  const parser = new DOMParser()
  const svgSource = isLiked ? LIKE_ACTIVE_SVG : LIKE_INACTIVE_SVG
  const userLikeSvg = parser.parseFromString(svgSource, 'text/html').body.firstElementChild
  if (!isDesktop) {
    userLikeSvg.style.width = '48px'
    userLikeSvg.style.height = '48px'
    userLikeSvg.style.margin = '-12px'
  }

  const likeButton = buttonsContainer.querySelector('like-button-view-model button')
  const likeSvgContainer = buttonsContainer.querySelector('like-button-view-model button lottie-component')
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
    const desktopSvg = document.querySelector('#top-row dislike-button-view-model svg')
    const mobileSvg = document.querySelector('.slim-video-action-bar-actions dislike-button-view-model svg')
    if (desktopSvg || mobileSvg) {
      hookButtons(!!desktopSvg)
      observer.disconnect()
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}

main()
