import React from 'react';

import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

export function ColumnEdit({
	attributes,
	setAttributes,
	mergeBlocks,
	onReplace,
	className,
}) {
	return (
		<>
			<div className="ajf-column">
				<InnerBlocks
						templateLock={ false }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		</>
	);
}

export default compose(
	withSelect( ( select, ownProps ) => {
		const { clientId } = ownProps;
		const { getBlockOrder } = select( 'core/block-editor' );

		return {
			hasChildBlocks: getBlockOrder( clientId ).length > 0,
		};
	} ),
)( ColumnEdit );;
