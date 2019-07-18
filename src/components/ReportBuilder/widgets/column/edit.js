import React from 'react';

import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';

export default function ColumnEdit({
	attributes,
	setAttributes,
	mergeBlocks,
	onReplace,
	className,
}) {
	return (
		<>
			<InspectorControls>
				<PanelBody>
					<PanelRow>
						<label>Miao</label>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div className="ajf-column">
				column
			</div>
		</>
	);
}
