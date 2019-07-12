import { PanelPlugin, PanelProps, BigValue, getValueFormat } from "@grafana/ui";
import React, { Component, PureComponent } from "react";

import { config } from "@grafana/runtime";

import { defaults, MultistatOptions, defaultMultistatRule } from "../types";

type Props = PanelProps<MultistatOptions>;
type State = {};

const BASE_FONT_SIZE = 38;

export class MultistatPanel extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}
	render() {
		let series = this.props.data.series;
		let text = this.props.options.text;
		let rules = this.props.options.rules;

		let split = text.split(/(\${__cell[:_].+?}|\n)/g);

		let variablereplacements: { [key: string]: string | number } = {};
		series.forEach(
			(s: {
				name: string;
				rows: any;
				fields: { name: string; type: string }[];
			}) => {
				s.fields.map((field, i) => {
					variablereplacements["${__cell:" + field.name + "}"] =
						s.rows[0][i];
					variablereplacements["${__cell_" + i + "}"] = s.rows[0][i];
				});
			}
		);
		return (
			<>
				<div>
					{split
						.map((value, i) => {
							if (value.match(/^(\${__cell[:_].+?})$/)) {
								if (variablereplacements[value]) {
									return {
										text: variablereplacements[value],
										value
									};
									// return (
									// 	<BigValue
									// 		key={i}
									// 		value={variablereplacements[value]}
									// 	/>
									// );
								}
								return { text: `${value} not found`, value };
							}
							if (value === "\n") {
								return { text: value, value };
							}
							return { text: value, value };
						})
						.map((value, i) => {
							if (value.value === "\n") {
								return <br />;
							}
							let data = this.props.options.rules.find(
								rule => rule.name === value.value
							);
							if (!data) {
								data = defaultMultistatRule;
							}
							let valueFormatter = getValueFormat(
								data.unit.value
							);
							let formatted = value.text;
							if (
								typeof value.text === "number" &&
								valueFormatter
							) {
								formatted = valueFormatter(value.text, 2);
							}
							data.color;
							data.unit;
							let fontSize =
								(data.fontSize / 100) * BASE_FONT_SIZE;
							return (
								<span
									style={{
										...(data.useColor
											? { color: data.color }
											: {}),
										fontSize: `${fontSize}px`
									}}
								>
									{formatted}
								</span>
							);
						})}
				</div>
			</>
		);
	}
}
