'use strict'

require('babel-polyfill')

const document = require('global/document')
const snabbdom = require('snabbdom')
const classForSnabbdom = require('snabbdom/modules/class').default
const attrForSnabbdom = require('snabbdom/modules/class').default
const h = require('snabbdom/h').default

const render = require('./ui')
const mdToVTree = require('./lib/md-to-vtree')

const state = {
	archive: null,
	document: null,
	rendered: h('div', {}, [])
}

const loadDocument = async (datKey, path) => {
	// todo: display loader
	// todo: catch & diplay errors
	const a = state.archive = new DatArchive('dat://' + datKey)
	const stats = await a.stat(path)
	if (!stats.isFile()) throw new Error(path + ' does not exist in ' + datKey)

	state.document = await a.readFile(path)
	rerender()
}

const renderDocument = () => {
	mdToVTree(state.document, (err, vTree) => {
		if (err) return console.error(err) // todo: display error

		state.rendered = vTree
		rerender()
	})
}

const actions = {
	loadDocument,
	renderDocument
}

const container = document.createElement('div')
document.body.appendChild(container)
const patch = snabbdom.init([classForSnabbdom, attrForSnabbdom])

const rerender = () => {
	const vTree = render(state, actions)
	patch(container, vTree)
}
