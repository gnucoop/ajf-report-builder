import React from 'react';

import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';

export default function LayoutEdit({
	attributes,
	setAttributes,
	mergeBlocks,
	onReplace,
	className,
}) {
	let { columns } = attributes;

	const allowedBlocks = ['ajf/column'];

	return (
		<div className="ajf-layout">
			<InnerBlocks
				allowedBlocks={allowedBlocks}
				template={[['ajf/column'], ['ajf/column']]}
			/>
		</div>
	);
}
