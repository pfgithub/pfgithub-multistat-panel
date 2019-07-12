import { Select, Button, ColorPicker, UnitPicker, FormLabel, Switch } from "@grafana/ui";
import React, { PureComponent } from "react";

import { MultistatRule } from "../types";

type Props = {
	variables: string[];
	rule: MultistatRule;
	onChange: (rule: MultistatRule) => void;
	onDelete: () => void;
};
type State = {};

export class RuleEditor extends PureComponent<Props, State> {
	render() {
		return (
			<>
				<div className="gf-form-group">
					<h5 className="section-heading">Options</h5>
					<div className="gf-form-inline">
						<div className="gf-form">
							<Select
								width={25}
								isClearable={false}
								isMulti={false}
								isSearchable={true}
								value={{
									label: this.props.rule.name,
									value: this.props.rule.name
								}}
								options={this.props.variables.map(v => ({
									label: v,
									value: v
								}))}
								onChange={item => {
									if (Array.isArray(item)) {
										this.props.onChange({
											...this.props.rule,
											name: item[0].value
										});
										return;
									}
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
					</div>
					<div className="gf-form-inline">
						<UnitPicker
							defaultValue={this.props.rule.unit}
							onChange={opts => {
								this.props.onChange({
									...this.props.rule,
									unit: opts
								});
							}}
						/>
					</div>
					<div className="gf-form-inline">
						<Switch
							checked={this.props.rule.useColor}
							label="Use Color"
							onChange={newV => {
								if (!newV) return;
								this.props.onChange({
									...this.props.rule,
									useColor: newV.currentTarget.checked
								});
							}}
						/>
					</div>
					{this.props.rule.useColor ? (
						<div className="gf-form-inline">
							<div className="gf-form">
								<FormLabel>Color</FormLabel>
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
						</div>
					) : null}
					<div className="gf-form-inline">
						<div className="gf-form">
							<Select
								width={25}
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
									if (Array.isArray(item)) {
										this.props.onChange({
											...this.props.rule,
											fontSize: item[0].value
										});
										return;
									}
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
				</div>

				<div className="gf-form-group">
					<div className="gf-form-inline">
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
				</div>
			</>
		);
	}
}
