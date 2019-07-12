import { PanelEditorProps, PanelOptionsGroup, FormLabel } from "@grafana/ui";
import React, { PureComponent } from "react";

import { MultistatOptions, MultistatRule } from "../types";
import { CodeEditor } from "./CodeEditor";
import { RuleListEditor } from "./RuleListEditor";

type Props = PanelEditorProps<MultistatOptions>;
type State = { text: string; rules: MultistatRule[] };

export class MultistatPanelEditor extends PureComponent<Props, State> {
	updatePanelProgress?: NodeJS.Timeout;
	constructor(props: Props) {
		super(props);
		this.state = {
			text: props.options.text,
			rules: this.props.options.rules
		};
		this.updatePanelProgress = undefined;
	}

	onUpdatePanel() {
		this.updatePanelProgress && clearTimeout(this.updatePanelProgress);
		this.updatePanelProgress = setTimeout(() => {
			this.props.onOptionsChange({
				...this.props.options,
				text: this.state.text,
				rules: this.state.rules
			});
		}, 500);
	}

	onFeedUrlChange = ({ target }: { target: any }) => this.setState({ text: target.value });

	getVariables(): string[] {
		return this.state.text.split(/(\${__cell[:_].+?}|\n)/g) || ["No Options"];
	}
	render() {
		return (
			<>
				<PanelOptionsGroup title="Feed">
					<>
						<div className="gf-form">
							<FormLabel tooltip="${__cell:column name} or ${__cell_#} (forex ${__cell_0} )">
								Text
							</FormLabel>
							<CodeEditor
								value={this.state.text}
								onChange={e => {
									this.setState(
										{
											text: e
										},
										() => this.onUpdatePanel()
									);
								}}
							/>
						</div>
					</>
				</PanelOptionsGroup>
				<RuleListEditor
					getVariables={() => this.getVariables()}
					rules={this.state.rules}
					onChange={rules => this.setState({ rules }, () => this.onUpdatePanel())}
				/>
			</>
		);
	}
}
