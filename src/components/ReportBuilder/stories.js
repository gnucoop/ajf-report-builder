import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AjfReportBuilder from './ReportBuilder';

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
					<pre className="output">
						{this.state.output}
					</pre>
				)
			}
		}

		return (
			<div>
				<AjfReportBuilder
						onChange={val => updateOutput(JSON.stringify(JSON.parse(val), null, 2))}
				/>
				<OutputComponent />
			</div>
		);
	});
