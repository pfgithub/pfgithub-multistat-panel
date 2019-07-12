import ValueMapping from "@grafana/ui";
import { FieldDisplayOptions } from "@grafana/ui";

export type MultistatRule = {
	/* options */
	name: string;

	onlyWhen: boolean;
	/**/ onlyWhenMode: "equals" | "range";
	/*     */ onlyWhenEquals: string;
	/*     */ onlyWhenRange: { from: number; to: number };

	/* style */
	valueMode: "number" | "string";
	/**/ unit: string;
	/**/ decimals: number | undefined;
	/**/ replaceWith: string;
	useColor: boolean;
	/**/ color: string;
	fontSize: number;

	url: string;
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
	name: "---select--",

	onlyWhen: false,
	onlyWhenMode: "equals",
	onlyWhenEquals: "5",
	onlyWhenRange: { from: 1, to: 3 },

	valueMode: "number",
	unit: "short",
	decimals: undefined,
	replaceWith: "value",
	useColor: false,
	color: "red",
	fontSize: 50,

	url: ""
};
