/* --------------------
 * @overlook/util-traverse module
 * Tests
 * ------------------*/

'use strict';

// Modules
const {
		traverse, traverseChildren, traverseAsync, traverseChildrenAsync
	} = require('@overlook/util-traverse'),
	Route = require('@overlook/route');

// Init
require('./support/index.js');

// Tests

let root, child1, child2, subChild1, subChild2;
beforeEach(() => {
	root = new Route();
	child1 = new Route();
	root.attachChild(child1);
	child2 = new Route();
	root.attachChild(child2);
	subChild1 = new Route();
	child1.attachChild(subChild1);
	subChild2 = new Route();
	child1.attachChild(subChild2);
});

describe('traverse', () => {
	const visited = [];
	beforeEach(() => {
		traverse(root, route => visited.push(route));
	});

	afterEach(() => {
		visited.length = 0;
	});

	it('visits starting route', () => {
		expect(visited).toInclude(root);
	});

	it('visits child routes', () => {
		expect(visited).toInclude(child1);
		expect(visited).toInclude(child2);
	});

	it('visits nested child routes', () => {
		expect(visited).toInclude(subChild1);
		expect(visited).toInclude(subChild2);
	});

	it('visits starting route before children', () => {
		expect(visited[0]).toBe(root);
	});

	it('visits children in order', () => {
		expect(visited.indexOf(child1)).toBeLessThan(visited.indexOf(child2));
	});

	it('visits nested children in order', () => {
		expect(visited.indexOf(subChild1)).toBeLessThan(visited.indexOf(subChild2));
	});

	it('visits nested children before next child', () => {
		expect(visited.indexOf(subChild1)).toBeLessThan(visited.indexOf(child2));
	});
});

describe('traverseChildren', () => {
	const visited = [];
	beforeEach(() => {
		traverseChildren(root, route => visited.push(route));
	});

	afterEach(() => {
		visited.length = 0;
	});

	it('does not visit starting route', () => {
		expect(visited).not.toInclude(root);
	});

	it('visits child routes', () => {
		expect(visited).toInclude(child1);
		expect(visited).toInclude(child2);
	});

	it('visits nested child routes', () => {
		expect(visited).toInclude(subChild1);
		expect(visited).toInclude(subChild2);
	});

	it('visits children in order', () => {
		expect(visited.indexOf(child1)).toBeLessThan(visited.indexOf(child2));
	});

	it('visits nested children in order', () => {
		expect(visited.indexOf(subChild1)).toBeLessThan(visited.indexOf(subChild2));
	});

	it('visits nested children before next child', () => {
		expect(visited.indexOf(subChild1)).toBeLessThan(visited.indexOf(child2));
	});
});

describe('traverseAsync', () => {
	const visited = [];
	beforeEach(async () => {
		await traverseAsync(root, async (route) => {
			visited.push({event: 'enter', route});
			await Promise.resolve();
			visited.push({event: 'exit', route});
		});
	});

	afterEach(() => {
		visited.length = 0;
	});

	function routeIndex(route, event) {
		return visited.findIndex(v => v.route === route && v.event === event);
	}

	function enterIndex(route) {
		return routeIndex(route, 'enter');
	}

	function exitIndex(route) {
		return routeIndex(route, 'exit');
	}

	function isVisited(route) {
		return enterIndex(route) !== -1;
	}

	it('visits starting route', () => {
		expect(isVisited(root)).toBeTrue();
	});

	it('visits child routes', () => {
		expect(isVisited(child1)).toBeTrue();
		expect(isVisited(child2)).toBeTrue();
	});

	it('visits nested child routes', () => {
		expect(isVisited(subChild1)).toBeTrue();
		expect(isVisited(subChild2)).toBeTrue();
	});

	it('visits starting route before children', () => {
		expect(enterIndex(root)).toBe(0);
	});

	it('visits children in order', () => {
		expect(enterIndex(child1)).toBeLessThan(enterIndex(child2));
	});

	it('visits nested children in order', () => {
		expect(enterIndex(subChild1)).toBeLessThan(enterIndex(subChild2));
	});

	it('completes callback on starting route before starting on children', () => {
		expect(exitIndex(root)).toBe(1);
	});

	it('completes callback on child before starting on its children', () => {
		expect(exitIndex(child1)).toBeLessThan(enterIndex(subChild1));
		expect(exitIndex(child1)).toBeLessThan(enterIndex(subChild2));
	});

	it('visits children in parallel', () => {
		expect(enterIndex(child2)).toBeLessThan(exitIndex(child1));
	});

	it('visits nested children in parallel', () => {
		expect(enterIndex(subChild2)).toBeLessThan(exitIndex(subChild1));
	});
});

describe('traverseChildrenAsync', () => {
	const visited = [];
	beforeEach(async () => {
		await traverseChildrenAsync(root, async (route) => {
			visited.push({event: 'enter', route});
			await Promise.resolve();
			visited.push({event: 'exit', route});
		});
	});

	afterEach(() => {
		visited.length = 0;
	});

	function routeIndex(route, event) {
		return visited.findIndex(v => v.route === route && v.event === event);
	}

	function enterIndex(route) {
		return routeIndex(route, 'enter');
	}

	function exitIndex(route) {
		return routeIndex(route, 'exit');
	}

	function isVisited(route) {
		return enterIndex(route) !== -1;
	}

	it('does not visit starting route', () => {
		expect(isVisited(root)).toBeFalse();
	});

	it('visits child routes', () => {
		expect(isVisited(child1)).toBeTrue();
		expect(isVisited(child2)).toBeTrue();
	});

	it('visits nested child routes', () => {
		expect(isVisited(subChild1)).toBeTrue();
		expect(isVisited(subChild2)).toBeTrue();
	});

	it('visits children in order', () => {
		expect(enterIndex(child1)).toBeLessThan(enterIndex(child2));
	});

	it('visits nested children in order', () => {
		expect(enterIndex(subChild1)).toBeLessThan(enterIndex(subChild2));
	});

	it('completes callback on child before starting on its children', () => {
		expect(exitIndex(child1)).toBeLessThan(enterIndex(subChild1));
		expect(exitIndex(child1)).toBeLessThan(enterIndex(subChild2));
	});

	it('visits children in parallel', () => {
		expect(enterIndex(child2)).toBeLessThan(exitIndex(child1));
	});

	it('visits nested children in parallel', () => {
		expect(enterIndex(subChild2)).toBeLessThan(exitIndex(subChild1));
	});
});
