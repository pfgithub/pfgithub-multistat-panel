export {};
/*
import React, { Component } from "react";

import ace from "brace";

type Props = { value: string; onChange: (newValue: string) => void };
type State = {};

export class CodeEditor extends Component<Props, State> {
	refEditor: React.RefObject<HTMLDivElement>;
	editor?: ace.Editor;
	constructor(props: Props) {
		super(props);
		this.state = {};
		this.refEditor = React.createRef<HTMLDivElement>();
	}
	componentDidMount() {
		this.setupAceEditor();
		this.updateAceFromProps();
	}
	componentWillUnmount() {
		this.getAce().destroy();
		this.editor = undefined;
	}
	componentDidUpdate(prev: Readonly<Props>) {
		this.updateAceFromProps();
	}
	setupAceEditor() {
		const component = this.refEditor.current;
		if (!component) {
			throw new Error(
				"Component was not found when setting up ace editor. This should never happen."
			);
		}
		this.editor = ace.edit(component);
		this.editor.$blockScrolling = Infinity;
		this.editor.setTheme("ace/theme/chrome");
		this.editor.setOptions({
			showPrintMargin: false,
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true
		});
	}
	getAce(): ace.Editor {
		const editor = this.editor;
		if (!editor) {
			throw new Error(
				"Ace editor was not found when getting ace editor. This should never happen."
			);
		}
		return editor;
	}
	updateAceFromProps() {
		let value = this.getAce().getValue();
		if (this.props.value !== value) {
			this.getAce().setValue(this.props.value);
		}
		this.getAce().onTextInput = () => {
			this.props.onChange(this.getAce().getValue());
		};
	}
	render() {
		return (
			<div
				ref={this.refEditor}
				style={{ width: "500px", height: "500px" }}
			/>
		);
	}
}
*/
