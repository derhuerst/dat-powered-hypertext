'use strict'

const unified = require('unified')
const parseMarkdown = require('remark-parse')
const toVTree = require('remark-vdom')
const h = require('snabbdom/h').default

const pipeline = unified()
pipeline.use(parseMarkdown)
pipeline.use(toVTree, {h})

const mdToVTree = (md, cb) => {
	pipeline.process(md, (err, vFile) => {
		if (err) cb(err)
		else cb(null, vFile.contents)
	})
}

const mdToVTreeSync = (md) => {
	return pipeline.processSync(md).contents
}
mdToVTree.sync = mdToVTreeSync

module.exports = mdToVTree
