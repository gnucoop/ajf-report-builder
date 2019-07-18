import React from 'react';
import { renderToString } from 'react-dom/server';

import { InnerBlocks } from '@wordpress/block-editor';
import { serialize } from '@wordpress/blocks';

import { AjfReportWidgetType } from '../widget-type';

export default function LayoutSave(props) {
	const {
		attributes,
		setAttributes,
		mergeBlocks,
		onReplace,
		className,
	} = props;

	return (
		<node widget-type={AjfReportWidgetType.Layout} styles="{}">
			<InnerBlocks.Content />
		</node>
	);
}
