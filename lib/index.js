/* --------------------
 * @overlook/util-traverse module
 * Entry point
 * ------------------*/

'use strict';

// Exports

module.exports = {
	traverse,
	traverseChildren,
	traverseAsync,
	traverseChildrenAsync
};

function traverse(route, fn) {
	fn(route);
	traverseChildren(route, fn);
}

function traverseChildren(route, fn) {
	for (const child of route.children) {
		traverse(child, fn);
	}
}

async function traverseAsync(route, fn) {
	await fn(route);
	await traverseChildrenAsync(route, fn);
}

function traverseChildrenAsync(route, fn) {
	return Promise.all(route.children.map(child => traverseAsync(child, fn)));
}
