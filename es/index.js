/* --------------------
 * @overlook/util-traverse module
 * ESM entry point
 * Re-export CJS with named exports
 * ------------------*/

// Exports

import traverseMethods from '../lib/index.js';

export default traverseMethods;
export const {
	traverse,
	traverseAsync
} = traverseMethods;
