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
import React, { Component, PureComponent } from "react";

import {
	MultistatOptions,
	MultistatRule,
	defaultMultistatRule
} from "../types";
import { CodeEditor } from "./CodeEditor";

type Props = PanelEditorProps<MultistatOptions>;
type State = { text: string; rules: MultistatRule[] };

export class MultistatPanelEditor extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			text: props.options.text,
			rules: this.props.options.rules
		};
	}

	onUpdatePanel = () =>
		this.props.onOptionsChange({
			...this.props.options,
			text: this.state.text,
			rules: this.state.rules
		});

	onFeedUrlChange = ({ target }: { target: any }) =>
		this.setState({ text: target.value });

	render() {
		let variables: string[] = this.state.text.split(
			/(\${__cell[:_].+?}|\n)/g
		) || ["No Options"];
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
									this.setState({
										text: e
									});
								}}
								onBlur={() => this.onUpdatePanel()}
							/>
						</div>
					</>
				</PanelOptionsGroup>
				<PanelOptionsGroup title="Styles">
					<>
						{this.state.rules.map((rule, i) => {
							if (!rule.unit) {
								rule.unit = defaultMultistatRule.unit;
							}
							if (!rule.color) {
								rule.color = defaultMultistatRule.color;
							}
							return (
								<>
									{i !== 0 ? <hr key={i - 0.5} /> : null}
									<div className="gf-form-group" key={i}>
										<h5 className="section-heading">
											Options
										</h5>
										<div className="gf-form-inline">
											<div className="gf-form">
												<Select
													width={25}
													isClearable={false}
													isMulti={false}
													isSearchable={true}
													value={{
														label: rule.name,
														value: rule.name
													}}
													options={variables.map(
														v => ({
															label: v,
															value: v
														})
													)}
													onChange={item => {
														if (
															Array.isArray(item)
														) {
															rule.name =
																item[0].value;
															this.setState({
																rules: [
																	...this
																		.state
																		.rules
																]
															});
															return;
														}
														if (!item.value) {
															return;
														}
														rule.name = item.value;
														this.setState(
															{
																rules: [
																	...this
																		.state
																		.rules
																]
															},
															() =>
																this.onUpdatePanel()
														);
													}}
													onBlur={() => {
														this.onUpdatePanel();
													}}
												/>
											</div>
										</div>
										<div className="gf-form-inline">
											<UnitPicker
												defaultValue={rule.unit}
												onChange={opts => {
													rule.unit = opts;
													this.setState(
														{
															rules: [
																...this.state
																	.rules
															]
														},
														() =>
															this.onUpdatePanel()
													);
												}}
											/>
										</div>
										<div className="gf-form-inline">
											<Switch
												checked={rule.useColor}
												label="Use Color"
												onChange={newV => {
													if (!newV) return;
													rule.useColor =
														newV.currentTarget.checked;
													this.setState(
														{
															rules: [
																...this.state
																	.rules
															]
														},
														() =>
															this.onUpdatePanel()
													);
												}}
											/>
										</div>
										<div className="gf-form-inline">
											<div className="gf-form">
												<FormLabel>Color</FormLabel>
												<span className="gf-form-label">
													<ColorPicker
														color={rule.color}
														onChange={color => {
															rule.color = color;

															this.setState(
																{
																	rules: [
																		...this
																			.state
																			.rules
																	]
																},
																() =>
																	this.onUpdatePanel()
															);
														}}
													/>
												</span>
											</div>
										</div>
										<div className="gf-form-inline">
											<div className="gf-form">
												<Select
													width={25}
													isClearable={false}
													isMulti={false}
													isSearchable={true}
													value={{
														label:
															rule.fontSize + "%",
														value: rule.fontSize
													}}
													options={[
														10,
														20,
														30,
														40,
														50,
														60,
														70,
														80,
														90,
														100
													].map(v => ({
														label: v + "%",
														value: v
													}))}
													onChange={item => {
														if (
															Array.isArray(item)
														) {
															rule.fontSize =
																item[0].value;
															this.setState(
																{
																	rules: [
																		...this
																			.state
																			.rules
																	]
																},
																() =>
																	this.onUpdatePanel()
															);
															return;
														}
														if (!item.value) {
															return;
														}
														rule.fontSize =
															item.value;
														this.setState(
															{
																rules: [
																	...this
																		.state
																		.rules
																]
															},
															() =>
																this.onUpdatePanel()
														);
													}}
												/>
											</div>
										</div>
									</div>

									<div
										className="gf-form-group"
										key={i + 0.1}
									>
										<div className="gf-form-inline">
											<DeleteButton
												onConfirm={() => {
													this.setState(
														{
															rules: this.state.rules.filter(
																rulea =>
																	rulea !==
																	rule
															)
														},
														() =>
															this.onUpdatePanel()
													);
												}}
											/>
										</div>
									</div>
								</>
							);
						})}
						<hr />
						<Button
							onClick={() => {
								this.setState(
									{
										rules: [
											...this.state.rules,
											defaultMultistatRule
										]
									},
									() => this.onUpdatePanel()
								);
							}}
						>
							Add Rule
						</Button>
					</>
				</PanelOptionsGroup>
			</>
		);
	}
}
