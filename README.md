[![NPM version](https://img.shields.io/npm/v/@overlook/util-traverse.svg)](https://www.npmjs.com/package/@overlook/util-traverse)
[![Build Status](https://img.shields.io/travis/overlookjs/util-traverse/master.svg)](https://travis-ci.org/overlookjs/util-traverse)
[![Dependency Status](https://img.shields.io/david/overlookjs/util-traverse.svg)](https://david-dm.org/overlookjs/util-traverse)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookjs/util-traverse.svg)](https://david-dm.org/overlookjs/util-traverse)
[![Coverage Status](https://img.shields.io/coveralls/overlookjs/util-traverse/master.svg)](https://coveralls.io/r/overlookjs/util-traverse)

# Overlook framework utility to traverse router tree

Part of the [Overlook framework](https://overlookjs.github.io/).

## Usage

### `traverse( route, fn )`

Traverses routes tree, calling `fn()` with each route in the tree.

Traversal order is depth first.

```js
const Route = require('@overlook/route');
const { traverse } = require('@overlook/util-traverse');

const root = new Route( { name: 'root' } );
const child1 = new Route( { name: 'child1' } );
const child2 = new Route( { name: 'child2' } );
const childOfChild1 = new Route( { name: 'childOfChild1' } );
root.attachChild( child1 );
root.attachChild( child2 );
child1.attachChild( childOfChild1 );

traverse( root, route => console.log( route.name ) );
// Logs 'root', 'child1', 'childOfChild1', 'child2'
```

### `traverseChildren( route, fn )`

Same as `traverse()` except does not call `fn()` on the starting route, only children and nested children.

### `traverseAsync( route, fn )`

Async version of `traverse()`. Returns a promise.

`fn()` should return a promise.

Siblings will be visited in parallel.

The promise returned from `fn()` for each route will be awaited before calling `fn()` on its children.

### `traverseChildrenAsync( route, fn )`

Same as `traverseAsync()` except does not call `fn()` on the starting route, only children and nested children.

## Versioning

This module follows [semver](https://semver.org/). Breaking changes will only be made in major version updates.

All active NodeJS release lines are supported (v10+ at time of writing). After a release line of NodeJS reaches end of life according to [Node's LTS schedule](https://nodejs.org/en/about/releases/), support for that version of Node may be dropped at any time, and this will not be considered a breaking change. Dropping support for a Node version will be made in a minor version update (e.g. 1.2.0 to 1.3.0). If you are using a Node version which is approaching end of life, pin your dependency of this module to patch updates only using tilde (`~`) e.g. `~1.2.3` to avoid breakages.

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookjs/util-traverse/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookjs/util-traverse/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add tests for new features
* document new functionality/API additions in README
* do not add an entry to Changelog (Changelog is created when cutting releases)
