import React from 'react';

import '@wordpress/editor';

import {
	BlockEditorProvider,
	BlockInspector,
	BlockList,
	BlockNavigationDropdown,
	Inserter,
	InspectorAdvancedControls,
	NavigableToolbar,
	ObserveTyping,
	WritingFlow,
} from '@wordpress/block-editor';
import { serialize } from '@wordpress/blocks';
import { DropZoneProvider, Panel, PanelBody, Popover, SlotFillProvider } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import {
	EditorHistoryRedo,
	EditorHistoryUndo,
} from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { DotTip } from '@wordpress/nux';

import { xml2json } from 'xml-js';

import { registerWidgetsLibrary } from './widgets';

import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/editor.css';
import '@wordpress/block-library/build-style/theme.css';


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
			<Panel className="main-panel">
				<PanelBody>
					<SlotFillProvider>
						<BlockEditorProvider
								value={ blocks }
								onInput={ updateBlocksWrapper }
								onChange={ updateBlocksWrapper }
						>
							<div className="ajf-report-builder">
								<NavigableToolbar className="header-toolbar">
									<Inserter />
									<EditorHistoryUndo />
									<EditorHistoryRedo />
									<BlockNavigationDropdown />
								</NavigableToolbar>
								<div className="builder-content-wrapper">
									<div
										className="builder-content"
										role="region"
										/* translators: accessibility text for the content landmark region. */
										aria-label={ __( 'Editor content' ) }
										tabIndex="-1"
									>
										<WritingFlow>
											<ObserveTyping>
												<BlockList />
											</ObserveTyping>
										</WritingFlow>
									</div>
									<div className="sidebar">
										<BlockInspector>
											<InspectorAdvancedControls />
										</BlockInspector>
									</div>
								</div>
							</div>
							<Popover.Slot />
						</BlockEditorProvider>
					</SlotFillProvider>
				</PanelBody>
			</Panel>
		);
	}
}

registerWidgetsLibrary();

function AjfReportBuilder(props) {
	const [ blocks, updateBlocks ] = useState( [] );

	return new AjfReportBuilderCls({...props, blocks, updateBlocks}).render();
}

export default AjfReportBuilder;
