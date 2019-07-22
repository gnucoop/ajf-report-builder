/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import icon from './icon';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const name = 'ajf/column';

export { metadata, name };

export const settings = {
	title: __( 'Column' ),
	parent: [ 'core/columns' ],
	icon,
	description: __( 'A single column within a layout block.' ),
	supports: {
		inserter: false,
		reusable: false,
		html: false,
		customClassName: false,
	},
	edit,
	save,
}
