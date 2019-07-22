import React from 'react';

import { InnerBlocks } from '@wordpress/block-editor';

import { AjfReportWidgetType } from '../widget-type';

export default function ColumnSave(props) {
	return (
		<node widget-type={AjfReportWidgetType.Column} styles="{}">
			<InnerBlocks.Content />
		</node>
	);
}
