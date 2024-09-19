// common imports
import '../styles/style.scss'
import 'virtual:svg-icons-register'
import 'lazysizes'
import config from './config'
import cssDebug from './libs/css-debug/css-debug'
import { barbaUi } from './libs/barba/barba'
import { lenisInit } from './libs/lenis/lenis'

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
