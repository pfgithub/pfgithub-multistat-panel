import { PanelProps, getValueFormat, CustomScrollbar } from "@grafana/ui";
import React, { PureComponent } from "react";

import { MultistatOptions, defaultMultistatRule } from "../types";

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

		let split = text.split(/(\${__cell[:_].+?}|\n)/g);

		let variablereplacements: { [key: string]: string | number } = {};
		series.forEach((s: { name: string; rows: any; fields: { name: string; type: string }[] }) => {
			s.fields.map((field, i) => {
				variablereplacements["${__cell:" + field.name + "}"] = s.rows[0][i];
				variablereplacements["${__cell_" + i + "}"] = s.rows[0][i];
			});
		});
		return (
			<>
				<CustomScrollbar>
					<div>
						{split
							.map(value => {
								if (value.match(/^(\${__cell[:_].+?})$/)) {
									if (variablereplacements[value] !== undefined) {
										return {
											text: variablereplacements[value],
											value
										};
									}
									return { text: `${value} not found`, value };
								}
								if (value === "\n") {
									return { text: value, value };
								}
								return { text: value, value };
							})
							.map(value => {
								if (value.value === "\n") {
									return <br />;
								}
								let data = this.props.options.rules.find(rule => {
									if (rule.name !== value.value) {
										return false;
									}
									if (!rule.onlyWhen) {
										return true;
									}
									if (rule.onlyWhenMode === "equals") {
										//eslint-disable-next-line eqeqeq
										return value.text == rule.onlyWhenEquals;
									}
									if (rule.onlyWhenMode === "range" && typeof value.text === "number") {
										return (
											rule.onlyWhenRange.from <= value.text && value.text <= rule.onlyWhenRange.to
										);
									}
									return false;
								});
								if (!data) {
									data = defaultMultistatRule;
								}
								let valueFormatter = getValueFormat(data.unit);
								let formatted = value.text;
								if (data.valueMode === "number") {
									if (typeof value.text === "number" && valueFormatter) {
										formatted = valueFormatter(value.text, data.decimals);
									}
								}
								if (data.valueMode === "string") {
									formatted = data.replaceWith;
									Object.keys(variablereplacements).forEach(v => {
										let val = variablereplacements[v];
										formatted = ("" + formatted).split(v).join("" + val);
									});
								}

								let url: string = "";

								if (data.url) {
									url = data.url || "";
									Object.keys(variablereplacements).forEach(v => {
										let val = variablereplacements[v];
										url = url.split(v + ":noencode").join("" + val);
										url = url.split(v).join(encodeURIComponent(val));
									});
								}
								let fontSize = (data.fontSize / 100) * BASE_FONT_SIZE;
								let style = {
									...(data.useColor ? { color: data.color } : {}),
									fontSize: `${fontSize}px`
								};
								if (url) {
									return (
										<a href={url} style={{ ...style, textDecoration: "underline" }}>
											{formatted}
										</a>
									);
								}
								return <span style={style}>{formatted}</span>;
							})}
					</div>
				</CustomScrollbar>
			</>
		);
	}
}
