import React from 'react';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { dropRight } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	RangeControl,
} from '@wordpress/components';
import {
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { withDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
	getColumnsTemplate,
} from './utils';

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'ajf/column'.
 *
 * @constant
 * @type {string[]}
*/
const ALLOWED_BLOCKS = [ 'ajf/column' ];

/**
 * Number of columns to assume for template in case the user opts to skip
 * template option selection.
 *
 * @type {Number}
 */
const DEFAULT_COLUMNS = 2;

export function LayoutEdit( {
	attributes,
	className,
	updateColumns,
} ) {
	const { columns, verticalAlignment } = attributes;

	const classes = classnames( className, `has-${ columns }-columns`, {} );

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={ __( 'Columns' ) }
						value={ columns }
						onChange={ updateColumns }
						min={ 2 }
						max={ 6 }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={classes}>
				<InnerBlocks
						template={ getColumnsTemplate( columns ) }
						templateLock="all"
						allowedBlocks={ ALLOWED_BLOCKS } />
			</div>
		</>
	);
}

export default withDispatch( ( dispatch, ownProps, registry ) => ( {
	/**
	 * Updates the column count, including necessary revisions to child Column
	 * blocks to grant required or redistribute available space.
	 *
	 * @param {number} columns New column count.
	 */
	updateColumns( columns ) {
		const { clientId, setAttributes, attributes } = ownProps;
		const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
		const { getBlocks } = registry.select( 'core/block-editor' );

		// Update columns count.
		setAttributes( { columns } );

		let innerBlocks = getBlocks( clientId );
		if ( ! hasExplicitColumnWidths( innerBlocks ) ) {
			return;
		}

		// Redistribute available width for existing inner blocks.
		const { columns: previousColumns } = attributes;
		const isAddingColumn = columns > previousColumns;

		if ( isAddingColumn ) {
			innerBlocks = [
				...innerBlocks,
				createBlock( 'core/column', { } ),
			];
		} else {
			// The removed column will be the last of the inner blocks.
			innerBlocks = dropRight( innerBlocks );
		}

		replaceInnerBlocks( clientId, innerBlocks, false );
	},
} ) )( LayoutEdit );
