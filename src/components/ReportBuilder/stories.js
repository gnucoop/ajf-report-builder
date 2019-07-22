import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AjfReportBuilder from './index';
import './report-builder.scss';
import './widgets/editor.scss';

storiesOf('AjfReportBuilder')
	.add('base', () => {
		function updateOutput(output) {
			this.setState({output});
		}

		class OutputComponent extends React.Component {
			constructor(props) {
				super(props);
				this.state = {
					output: ''
				};
				updateOutput = updateOutput.bind(this);
			}

			render() {
				return (
					<pre style={{height: '180px', 'overflowY': 'auto'}} className="output">
						{this.state.output}
					</pre>
				)
			}
		}

		return (
			<div>
				<div style={{height: 'calc(100vh - 220px)', overflow: 'hidden'}}>
					<AjfReportBuilder
							onChange={val => updateOutput(JSON.stringify(JSON.parse(val), null, 2))}
					/>
				</div>
				<OutputComponent />
			</div>
		);
	});
