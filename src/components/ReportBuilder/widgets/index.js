import {
	registerBlockType,
	setDefaultBlockName,
	unstable__bootstrapServerSideBlockDefinitions, // eslint-disable-line camelcase
} from '@wordpress/blocks';

import * as column from './column';
import * as layout from './layout';

export const registerWidgetsLibrary = () => {
	[
		column,
		layout
	].forEach( ( block ) => {
		if ( ! block ) {
			return;
		}
		const { metadata, settings, name } = block;
		if ( metadata ) {
			unstable__bootstrapServerSideBlockDefinitions( { [ name ]: metadata } ); // eslint-disable-line camelcase
		}
		registerBlockType( name, settings );
	} );

	// setDefaultBlockName( layout.name );
}
