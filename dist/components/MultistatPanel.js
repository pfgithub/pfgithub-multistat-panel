"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = require("@grafana/ui");
var react_1 = __importStar(require("react"));
var types_1 = require("../types");
var BASE_FONT_SIZE = 38;
var MultistatPanel = /** @class */ (function (_super) {
    __extends(MultistatPanel, _super);
    function MultistatPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    MultistatPanel.prototype.render = function () {
        var _this = this;
        var series = this.props.data.series;
        var text = this.props.options.text;
        var split = text.split(/(\${__cell[:_].+?}|\n)/g);
        var variablereplacements = {};
        series.forEach(function (s) {
            s.fields.map(function (field, i) {
                variablereplacements["${__cell:" + field.name + "}"] = s.rows[0][i];
                variablereplacements["${__cell_" + i + "}"] = s.rows[0][i];
            });
        });
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.CustomScrollbar, null,
                react_1.default.createElement("div", null, split
                    .map(function (value) {
                    if (value.match(/^(\${__cell[:_].+?})$/)) {
                        if (variablereplacements[value] !== undefined) {
                            return {
                                text: variablereplacements[value],
                                value: value
                            };
                        }
                        return { text: value + " not found", value: value };
                    }
                    if (value === "\n") {
                        return { text: value, value: value };
                    }
                    return { text: value, value: value };
                })
                    .map(function (value, i) {
                    if (value.value === "\n") {
                        return react_1.default.createElement("br", { key: i - 0.5 });
                    }
                    var data = _this.props.options.rules.find(function (rule) {
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
                            return (rule.onlyWhenRange.from <= value.text && value.text <= rule.onlyWhenRange.to);
                        }
                        return false;
                    });
                    if (!data) {
                        data = types_1.defaultMultistatRule;
                    }
                    var valueFormatter = ui_1.getValueFormat(data.unit);
                    var formatted = value.text;
                    if (data.valueMode === "number") {
                        if (typeof value.text === "number" && valueFormatter) {
                            formatted = valueFormatter(value.text, data.decimals);
                        }
                    }
                    if (data.valueMode === "string") {
                        formatted = data.replaceWith;
                        Object.keys(variablereplacements).forEach(function (v) {
                            var val = variablereplacements[v];
                            formatted = ("" + formatted).split(v).join("" + val);
                        });
                    }
                    var url = "";
                    if (data.url) {
                        url = data.url || "";
                        Object.keys(variablereplacements).forEach(function (v) {
                            var val = variablereplacements[v];
                            url = url.split(v + ":noencode").join("" + val);
                            url = url.split(v).join(encodeURIComponent(val));
                        });
                    }
                    var fontSize = (data.fontSize / 100) * BASE_FONT_SIZE;
                    var style = __assign({}, (data.useColor ? { color: data.color } : {}), { fontSize: fontSize + "px" });
                    if (url) {
                        return (react_1.default.createElement("a", { key: i, href: url, style: __assign({}, style, { textDecoration: "underline" }) }, formatted));
                    }
                    return (react_1.default.createElement("span", { key: i, style: style }, formatted));
                })))));
    };
    return MultistatPanel;
}(react_1.PureComponent));
exports.MultistatPanel = MultistatPanel;
