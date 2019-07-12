import React, { Component } from "react";
import { config } from "@grafana/runtime";

type Props = {
	value: string;
	onChange: (newValue: string) => void;
};
type State = {};

export class CodeEditor extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<textarea
				style={{
					backgroundColor: config.theme.colors.black,
					color: config.theme.colors.white,
					width: "100%"
				}}
				rows={this.props.value.split("\n").length}
				value={this.props.value}
				onChange={e => this.props.onChange(e.currentTarget.value)}
			/>
		);
	}
}
