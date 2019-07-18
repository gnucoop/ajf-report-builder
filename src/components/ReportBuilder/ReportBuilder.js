import React from 'react';

import { BlockEditorProvider, BlockInspector, BlockList, ObserveTyping, WritingFlow } from '@wordpress/block-editor';
import { registerCoreBlocks } from '@wordpress/block-library';
import { serialize } from '@wordpress/blocks';
import { DropZoneProvider, Panel, PanelBody, SlotFillProvider } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';

import { xml2json } from 'xml-js';

import { registerWidgetsLibrary } from './widgets';

import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/editor.css';
import '@wordpress/block-library/build-style/theme.css';

import './report-builder.css';


function snakeToCamel(s){
	return s.replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});
}

function normalizeJsonElement(el) {
	if (el.type !== 'element') {
		return null;
	}
	const normEl = Object.keys(el.attributes || {})
		.filter(key => key !== 'class')
		.reduce((obj, key) => {
			obj[snakeToCamel(key)] = JSON.parse(el.attributes[key]);
			return obj;
		}, {});

	if (el.elements != null) {
		normEl.content = el.elements
			.map(subEl => normalizeJsonElement(subEl))
			.filter(subEl => subEl != null);
	}

	return normEl;
}

function normalizeJson(json) {
	return (json.elements || [])
		.map(el => normalizeJsonElement(el))
		.filter(el => el != null);
}

class AjfReportBuilderCls extends React.Component {
	COMMENT_PSEUDO_COMMENT_OR_LT_BANG = new RegExp(
    '<!--[\\s\\S]*?(?:-->)?'
    + '<!---+>?'  // A comment with no body
    + '|<!(?![dD][oO][cC][tT][yY][pP][eE]|\\[CDATA\\[)[^>]*>?'
    + '|<[?][^>]*>?',  // A pseudo-comment
		'g');

	constructor(props) {
		super(props);
	}

	render() {
		const { blocks, updateBlocks } = this.props;
		const updateBlocksWrapper = (blocks) => {
			const { onChange } = this.props;
			if (onChange) {
				const reportStr = serialize(blocks);
				const report = normalizeJson(JSON.parse(xml2json(reportStr)) || {});
				onChange(JSON.stringify(report));
			}
			updateBlocks(blocks);
		}

		return (
			<div className="ajf-report-builder">
				<Panel>
					<PanelBody>
						<BlockEditorProvider
								value={ blocks }
								onInput={ updateBlocksWrapper }
								onChange={ updateBlocksWrapper }
						>
							<div className="editor-styles-wrapper">
								<WritingFlow>
									<ObserveTyping>
										<BlockList />
									</ObserveTyping>
								</WritingFlow>
							</div>
						</BlockEditorProvider>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody>
						<BlockInspector />
					</PanelBody>
				</Panel>
			</div>
		);
	}
}

function AjfReportBuilder(props) {
	const [ blocks, updateBlocks ] = useState( [] );

	return new AjfReportBuilderCls({...props, blocks, updateBlocks}).render();
}

// registerCoreBlocks();
registerWidgetsLibrary();

export default AjfReportBuilder;
