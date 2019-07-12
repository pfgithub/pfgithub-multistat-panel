import { PanelOptionsGroup, Button } from "@grafana/ui";
import React, { Component } from "react";

import { MultistatRule, defaultMultistatRule } from "../types";
import { RuleEditor } from "./RuleEditor";

type Props = {
	getVariables: () => string[];
	rules: MultistatRule[];
	onChange: (rule: MultistatRule[]) => void;
};
type State = {};

export class RuleListEditor extends Component<Props, State> {
	shouldComponentUpdate(newProps: Props) {
		return this.props.rules !== newProps.rules;
	}
	render() {
		return (
			<PanelOptionsGroup title="Styles">
				<>
					{this.props.rules.map((rule, i) => {
						return (
							<div key={i}>
								{i === 0 ? null : <hr />}
								<RuleEditor
									key={i}
									rule={rule}
									getVariables={() => this.props.getVariables()}
									onChange={newRule => {
										this.props.onChange(
											this.props.rules.map(currentRule =>
												currentRule === rule ? newRule : currentRule
											)
										);
									}}
									onDelete={() => {
										this.props.onChange(
											this.props.rules.filter(currentRule =>
												currentRule === rule ? false : true
											)
										);
									}}
									onDuplicate={() => {
										this.props.onChange([...this.props.rules, { ...rule }]);
									}}
								/>
							</div>
						);
					})}
					{this.props.rules.length === 0 ? null : <hr />}
					<Button
						onClick={() => {
							this.props.onChange([...this.props.rules, defaultMultistatRule]);
						}}
					>
						Add Rule
					</Button>
				</>
			</PanelOptionsGroup>
		);
	}
}
