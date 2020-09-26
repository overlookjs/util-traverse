/* --------------------
 * @overlook/util-traverse module
 * Tests
 * Test function to ensure all exports present
 * ------------------*/

/* eslint-disable jest/no-export */

'use strict';

// Exports

module.exports = function itExports(traverseMethods) {
	describe('methods', () => {
		it.each([
			'traverse',
			'traverseChildren',
			'traverseAsync',
			'traverseChildrenAsync'
		])('%s', (key) => {
			expect(traverseMethods[key]).toBeFunction();
		});
	});
};
