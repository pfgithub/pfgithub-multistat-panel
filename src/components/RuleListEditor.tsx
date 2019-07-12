import {
	PanelPlugin,
	PanelProps,
	PanelEditorProps,
	PanelOptionsGroup,
	FormField,
	Select,
	Button,
	DeleteButton,
	ColorPicker,
	UnitPicker,
	FormLabel,
	Switch,
	FieldDisplayEditor,
	FieldDisplayOptions,
	FieldPropertiesEditor
} from "@grafana/ui";
import React, { PureComponent } from "react";

import { MultistatRule, defaultMultistatRule } from "../types";
import { RuleEditor } from "./RuleEditor";

type Props = {
	variables: string[];
	rules: MultistatRule[];
	onChange: (rule: MultistatRule[]) => void;
};
type State = {};

export class RuleListEditor extends PureComponent<Props, State> {
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
									variables={this.props.variables}
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
