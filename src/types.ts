import ValueMapping from "@grafana/ui";
import { FieldDisplayOptions } from "@grafana/ui";

export type MultistatRule = {
	name: string;
	useColor: boolean;
	fontSize: number;
	color: string;
	unit: any;
};

export type MultistatOptions = {
	text: string;
	rules: MultistatRule[];
};
export const defaults: MultistatOptions = {
	text: "${__cell_0}",
	rules: []
};
export const defaultMultistatRule: MultistatRule = {
	name: "New Rule",
	color: "red",
	useColor: false,
	fontSize: 50,
	unit: { label: "short", value: "short" }
};
