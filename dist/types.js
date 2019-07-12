"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = {
    text: "${__cell_0}",
    rules: []
};
exports.defaultMultistatRule = {
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
