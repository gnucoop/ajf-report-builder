/**
 * External dependencies
 */
import { assign } from 'lodash';
import React from 'react';

import {
	InspectorControls,
} from '@wordpress/block-editor';
import {
	hasBlockSupport,
	parseWithAttributeSchema,
	getSaveContent,
} from '@wordpress/blocks';
import {
	PanelBody,
	TextControl,
} from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Filters registered block settings, extending attributes with anchor using ID
 * of the first node.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
export function addAttribute( settings ) {
	if ( hasBlockSupport( settings, 'styles', true ) ) {
		// Use Lodash's assign to gracefully handle if attributes are undefined
		settings.attributes = assign( settings.attributes, {
			styles: {
				type: 'object',
			},
		} );
	}

	return settings;
}

/**
 * Override the default edit UI to include a new block inspector control for
 * assigning the styles, if block supports styles.
 *
 * @param {function|Component} BlockEdit Original component.
 *
 * @return {string} Wrapped component.
 */
export const withInspectorControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const hasstyles = hasBlockSupport( props.name, 'styles', true );
		if ( hasstyles && props.isSelected ) {
			return (
				<>
					<BlockEdit { ...props } />
					<InspectorControls>
						<PanelBody
							title={ __( 'Styles' ) }
							initialOpen={ false }
						>
							<TextControl
								label={ __( 'styles' ) }
								value={ props.attributes.className || '' }
								onChange={ ( nextValue ) => {
									props.setAttributes( {
										className: nextValue !== '' ? nextValue : undefined,
									} );
								} }
							/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		}

		return <BlockEdit { ...props } />;
	};
}, 'withInspectorControl' );

addFilter( 'blocks.registerBlockType', 'ajf/styles/attribute', addAttribute );
addFilter( 'editor.BlockEdit', 'core/editor/styles/with-inspector-control', withInspectorControl );
