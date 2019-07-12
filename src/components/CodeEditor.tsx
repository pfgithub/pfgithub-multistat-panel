import React, { Component } from "react";

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
					backgroundColor: "black",
					color: "white",
					width: "100%"
				}}
				rows={this.props.value.split("\n").length}
				value={this.props.value}
				onChange={e => this.props.onChange(e.currentTarget.value)}
			/>
		);
	}
}
