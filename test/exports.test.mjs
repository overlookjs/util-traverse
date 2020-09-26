/* --------------------
 * @overlook/util-traverse module
 * Tests
 * ESM export
 * ------------------*/

// Modules
import traverseMethods, * as namedExports from '@overlook/util-traverse/es';

// Imports
import itExports from './exports.js';

// Tests

describe('ESM export', () => {
	it('default export is defined', () => {
		expect(traverseMethods).not.toBeUndefined();
	});

	describe('default export has properties', () => {
		itExports(traverseMethods);
	});

	describe('named exports', () => {
		itExports(namedExports);
	});
});
