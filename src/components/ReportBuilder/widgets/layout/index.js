import icon from './icon';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const name = 'ajf/layout';

export { metadata, name };

export const settings = {
	title: 'Layout',
	icon,
	description: 'Layout',
	supports: {
		html: false,
		customClassName: false,
	},
	edit,
	save,
}
