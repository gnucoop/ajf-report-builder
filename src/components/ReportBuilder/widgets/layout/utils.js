import memoize from 'memize';

import { times } from 'lodash';

/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */
export const getColumnsTemplate = memoize( ( columns ) => {
	if ( columns === undefined ) {
		return null;
	}

	return times( columns, () => [ 'ajf/column' ] );
} );
