export const BREAKPOINT_DESKTOP = 1201

export default function config() {
	window.addEventListener('load', scrollBarWidth, false)
	window.addEventListener('resize', scrollBarWidth, false)
}

function scrollBarWidth() {
	document.documentElement.style.setProperty('--scrollbar-width', `${window.innerWidth - document.documentElement.clientWidth}px`)
}
