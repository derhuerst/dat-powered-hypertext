'use strict'

require('babel-polyfill')

const document = require('global/document')
const snabbdom = require('snabbdom')
const classForSnabbdom = require('snabbdom/modules/class').default
const attrForSnabbdom = require('snabbdom/modules/class').default

const render = require('./ui')

const state = {
	// todo
}

const actions = {
	// todo
}

const patch = snabbdom.init([classForSnabbdom, attrForSnabbdom])

const container = document.body
const rerender = () => {
	const vTree = render(state, actions)
	patch(container, vTree)
}
