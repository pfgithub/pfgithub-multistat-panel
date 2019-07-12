import { Select, AsyncSelect, Button, FormField, ColorPicker, UnitPicker, FormLabel, Switch } from "@grafana/ui";
import React, { Component } from "react";

import { MultistatRule } from "../types";

type Props = {
	getVariables: () => string[];
	rule: MultistatRule;
	onChange: (rule: MultistatRule) => void;
	onDelete: () => void;
	onDuplicate: () => void;
};
type State = {};

export class RuleEditor extends Component<Props, State> {
	shouldComponentUpdate(newProps: Props) {
		return newProps.rule !== this.props.rule;
	}
	render() {
		return (
			<>
				<div className="section gf-form-group">
					<h5 className="section-heading">Options</h5>
					<div className="gf-form">
						<FormLabel width={10}>Apply to</FormLabel>
						<AsyncSelect<string>
							width={16}
							isClearable={false}
							isMulti={false}
							isSearchable={true}
							value={{
								label: this.props.rule.name,
								value: this.props.rule.name
							}}
							loadOptions={() =>
								new Promise(resolve =>
									resolve(
										this.props.getVariables().map(v => ({
											label: v,
											value: v
										}))
									)
								)
							}
							loadingMessage={() => "Loading..."}
							defaultOptions={true}
							onChange={item => {
								if (!item.value) {
									return;
								}
								this.props.onChange({
									...this.props.rule,
									name: item.value
								});
							}}
						/>
					</div>
					<Switch
						checked={this.props.rule.onlyWhen}
						label="Only When"
						labelClass="width-10"
						onChange={newV => {
							if (!newV) return;
							this.props.onChange({
								...this.props.rule,
								onlyWhen: newV.currentTarget.checked
							});
						}}
					/>
					{this.props.rule.onlyWhen ? (
						<div className="gf-form">
							<FormLabel width={10}>Type</FormLabel>
							<Select
								width={16}
								isClearable={false}
								isMulti={false}
								isSearchable={true}
								value={{
									label: this.props.rule.onlyWhenMode,
									value: this.props.rule.onlyWhenMode
								}}
								options={[{ label: "Equals", value: "equals" }, { label: "Range", value: "range" }]}
								onChange={item => {
									if (!item.value) {
										return;
									}
									console.log(item.value);
									if (item.value === "equals" || item.value === "range") {
										this.props.onChange({
											...this.props.rule,
											onlyWhenMode: item.value
										});
										return;
									}
									this.props.onChange({
										...this.props.rule,
										onlyWhenMode: "equals"
									});
								}}
							/>
						</div>
					) : null}
					{this.props.rule.onlyWhen && this.props.rule.onlyWhenMode === "equals" ? (
						<FormField
							inputWidth={16}
							labelWidth={10}
							label="Equals"
							value={this.props.rule.onlyWhenEquals}
							onChange={e => {
								this.props.onChange({
									...this.props.rule,
									onlyWhenEquals: e.currentTarget.value
								});
							}}
						/>
					) : null}
					{this.props.rule.onlyWhen && this.props.rule.onlyWhenMode === "range" ? (
						<>
							<FormField
								inputWidth={16}
								labelWidth={10}
								label="From"
								value={this.props.rule.onlyWhenRange.from}
								type="number"
								onChange={e => {
									this.props.onChange({
										...this.props.rule,
										onlyWhenRange: {
											...this.props.rule.onlyWhenRange,
											from: +e.currentTarget.value
										}
									});
								}}
							/>
							<FormField
								inputWidth={16}
								labelWidth={10}
								label="To"
								value={this.props.rule.onlyWhenRange.to}
								type="number"
								onChange={e => {
									this.props.onChange({
										...this.props.rule,
										onlyWhenRange: {
											...this.props.rule.onlyWhenRange,
											to: +e.currentTarget.value
										}
									});
								}}
							/>
						</>
					) : null}
				</div>
				<div className="section gf-form-group">
					<h5 className="section-heading">Style</h5>

					<div className="gf-form">
						<FormLabel width={10}>Mode</FormLabel>
						<Select
							width={16}
							isClearable={false}
							isMulti={false}
							isSearchable={true}
							value={{
								label: this.props.rule.valueMode,
								value: this.props.rule.valueMode
							}}
							options={[{ label: "Number", value: "number" }, { label: "String", value: "string" }]}
							onChange={item => {
								if (!item.value) {
									return;
								}
								if (item.value === "number" || item.value === "string") {
									this.props.onChange({
										...this.props.rule,
										valueMode: item.value
									});
									return;
								}
								this.props.onChange({
									...this.props.rule,
									valueMode: "number"
								});
							}}
						/>
					</div>
					{this.props.rule.valueMode === "number" ? (
						<>
							<div className="gf-form">
								<FormLabel width={10}>Unit</FormLabel>
								<UnitPicker
									width={16}
									defaultValue={this.props.rule.unit}
									onChange={opts => {
										this.props.onChange({
											...this.props.rule,
											unit: opts.value
										});
									}}
								/>
							</div>
							<FormField
								inputWidth={4}
								labelWidth={10}
								label="Decimals"
								value={this.props.rule.decimals === undefined ? "" : this.props.rule.decimals}
								type="number"
								placeholder="auto"
								onChange={e => {
									this.props.onChange({
										...this.props.rule,
										decimals: e.currentTarget.value === "" ? undefined : +e.currentTarget.value
									});
								}}
							/>
						</>
					) : null}
					{this.props.rule.valueMode === "string" ? (
						<>
							<FormField
								inputWidth={16}
								labelWidth={10}
								label="Replace With"
								value={this.props.rule.replaceWith}
								onChange={e => {
									this.props.onChange({
										...this.props.rule,
										replaceWith: e.currentTarget.value
									});
								}}
							/>
						</>
					) : null}
					<Switch
						checked={this.props.rule.useColor}
						label="Use Color"
						labelClass="width-10"
						onChange={newV => {
							if (!newV) return;
							this.props.onChange({
								...this.props.rule,
								useColor: newV.currentTarget.checked
							});
						}}
					/>
					{this.props.rule.useColor ? (
						<div className="gf-form">
							<FormLabel width={10}>Color</FormLabel>
							<span className="gf-form-label">
								<ColorPicker
									color={this.props.rule.color}
									onChange={color => {
										this.props.onChange({
											...this.props.rule,
											color: color
										});
									}}
								/>
							</span>
						</div>
					) : null}
					<div className="gf-form">
						<FormLabel width={10}>Font size</FormLabel>
						<Select
							width={16}
							isClearable={false}
							isMulti={false}
							isSearchable={true}
							value={{
								label: this.props.rule.fontSize + "%",
								value: this.props.rule.fontSize
							}}
							options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(v => ({
								label: v + "%",
								value: v
							}))}
							onChange={item => {
								if (!item.value) {
									return;
								}
								this.props.onChange({
									...this.props.rule,
									fontSize: item.value
								});
							}}
						/>
					</div>
				</div>

				<div className="section gf-form-group">
					<h5 className="section-heading">URL</h5>

					<FormField
						inputWidth={16}
						labelWidth={10}
						label="URL"
						tooltip="Same variables as text. Use ${...}:noencode to disable urlencode."
						value={this.props.rule.url}
						placeholder="https://"
						onChange={e => {
							this.props.onChange({
								...this.props.rule,
								url: e.currentTarget.value || ""
							});
						}}
					/>
				</div>

				<div className="gf-form-group">
					<div className="gf-form">
						<Button
							variant="danger"
							size="sm"
							onClick={() => {
								this.props.onDelete();
							}}
						>
							<i className="fa fa-trash" /> Remove Rule
						</Button>
					</div>
					<div className="gf-form">
						<Button
							size="sm"
							onClick={() => {
								this.props.onDuplicate();
							}}
						>
							<i className="fa fa-copy" /> Duplicate Rule
						</Button>
					</div>
				</div>
			</>
		);
	}
}
