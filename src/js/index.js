// common imports
import '../styles/style.scss'
import 'virtual:svg-icons-register'
import 'lazysizes'
import config from './config'
import cssDebug from './libs/css-debug/css-debug'
import { barbaUi } from './libs/barba/barba'
import { lenisInit } from './libs/lenis/lenis'
import { scrollBarWidth } from './utils/scrollbarWidth'
import { remSelect } from '../pug/shared/_ui-rem/rem-select/rem-select'

window.addEventListener('load', scrollBarWidth, false)
window.addEventListener('resize', scrollBarWidth, false)

document.addEventListener('DOMContentLoaded', function () {
	// barbaUi()
	commonFunction()
})

export const commonFunction = () => {
	// libs config
	config()
	cssDebug(true)

	// libs
	lenisInit()
}