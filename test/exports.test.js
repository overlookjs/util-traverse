/* --------------------
 * @overlook/util-traverse module
 * Tests
 * CJS export
 * ------------------*/

'use strict';

// Modules
const traverseMethods = require('@overlook/util-traverse');

// Imports
const itExports = require('./exports.js');

// Tests

describe('CJS export', () => {
	it('is defined', () => {
		expect(traverseMethods).not.toBeUndefined();
	});

	describe('has properties', () => {
		itExports(traverseMethods);
	});
});
