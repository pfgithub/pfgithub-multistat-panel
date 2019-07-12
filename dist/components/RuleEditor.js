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
var RuleEditor = /** @class */ (function (_super) {
    __extends(RuleEditor, _super);
    function RuleEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RuleEditor.prototype.shouldComponentUpdate = function (newProps) {
        return newProps.rule !== this.props.rule;
    };
    RuleEditor.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "section gf-form-group" },
                react_1.default.createElement("h5", { className: "section-heading" }, "Options"),
                react_1.default.createElement("div", { className: "gf-form" },
                    react_1.default.createElement(ui_1.FormLabel, { width: 10 }, "Apply to"),
                    react_1.default.createElement(ui_1.Select, { width: 16, isClearable: false, isMulti: false, isSearchable: true, value: {
                            label: this.props.rule.name,
                            value: this.props.rule.name
                        }, options: this.props.getVariables().map(function (v) { return ({
                            label: v,
                            value: v
                        }); }), onChange: function (item) {
                            if (!item.value) {
                                return;
                            }
                            _this.props.onChange(__assign({}, _this.props.rule, { name: item.value }));
                        } })),
                react_1.default.createElement(ui_1.Switch, { checked: this.props.rule.onlyWhen, label: "Only When", labelClass: "width-10", onChange: function (newV) {
                        if (!newV)
                            return;
                        _this.props.onChange(__assign({}, _this.props.rule, { onlyWhen: newV.currentTarget.checked }));
                    } }),
                this.props.rule.onlyWhen ? (react_1.default.createElement("div", { className: "gf-form" },
                    react_1.default.createElement(ui_1.FormLabel, { width: 10 }, "Type"),
                    react_1.default.createElement(ui_1.Select, { width: 16, isClearable: false, isMulti: false, isSearchable: true, value: {
                            label: this.props.rule.onlyWhenMode,
                            value: this.props.rule.onlyWhenMode
                        }, options: [{ label: "Equals", value: "equals" }, { label: "Range", value: "range" }], onChange: function (item) {
                            if (!item.value) {
                                return;
                            }
                            console.log(item.value);
                            if (item.value === "equals" || item.value === "range") {
                                _this.props.onChange(__assign({}, _this.props.rule, { onlyWhenMode: item.value }));
                                return;
                            }
                            _this.props.onChange(__assign({}, _this.props.rule, { onlyWhenMode: "equals" }));
                        } }))) : null,
                this.props.rule.onlyWhen && this.props.rule.onlyWhenMode === "equals" ? (react_1.default.createElement(ui_1.FormField, { inputWidth: 16, labelWidth: 10, label: "Equals", value: this.props.rule.onlyWhenEquals, onChange: function (e) {
                        _this.props.onChange(__assign({}, _this.props.rule, { onlyWhenEquals: e.currentTarget.value }));
                    } })) : null,
                this.props.rule.onlyWhen && this.props.rule.onlyWhenMode === "range" ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(ui_1.FormField, { inputWidth: 16, labelWidth: 10, label: "From", value: this.props.rule.onlyWhenRange.from, type: "number", onChange: function (e) {
                            _this.props.onChange(__assign({}, _this.props.rule, { onlyWhenRange: __assign({}, _this.props.rule.onlyWhenRange, { from: +e.currentTarget.value }) }));
                        } }),
                    react_1.default.createElement(ui_1.FormField, { inputWidth: 16, labelWidth: 10, label: "To", value: this.props.rule.onlyWhenRange.to, type: "number", onChange: function (e) {
                            _this.props.onChange(__assign({}, _this.props.rule, { onlyWhenRange: __assign({}, _this.props.rule.onlyWhenRange, { to: +e.currentTarget.value }) }));
                        } }))) : null),
            react_1.default.createElement("div", { className: "section gf-form-group" },
                react_1.default.createElement("h5", { className: "section-heading" }, "Style"),
                react_1.default.createElement("div", { className: "gf-form" },
                    react_1.default.createElement(ui_1.FormLabel, { width: 10 }, "Mode"),
                    react_1.default.createElement(ui_1.Select, { width: 16, isClearable: false, isMulti: false, isSearchable: true, value: {
                            label: this.props.rule.valueMode,
                            value: this.props.rule.valueMode
                        }, options: [{ label: "Number", value: "number" }, { label: "String", value: "string" }], onChange: function (item) {
                            if (!item.value) {
                                return;
                            }
                            if (item.value === "number" || item.value === "string") {
                                _this.props.onChange(__assign({}, _this.props.rule, { valueMode: item.value }));
                                return;
                            }
                            _this.props.onChange(__assign({}, _this.props.rule, { valueMode: "number" }));
                        } })),
                this.props.rule.valueMode === "number" ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { className: "gf-form" },
                        react_1.default.createElement(ui_1.FormLabel, { width: 10 }, "Unit"),
                        react_1.default.createElement(ui_1.UnitPicker, { width: 16, defaultValue: this.props.rule.unit, onChange: function (opts) {
                                _this.props.onChange(__assign({}, _this.props.rule, { unit: opts.value }));
                            } })),
                    react_1.default.createElement(ui_1.FormField, { inputWidth: 4, labelWidth: 10, label: "Decimals", value: this.props.rule.decimals === undefined ? "" : this.props.rule.decimals, type: "number", placeholder: "auto", onChange: function (e) {
                            _this.props.onChange(__assign({}, _this.props.rule, { decimals: e.currentTarget.value === "" ? undefined : +e.currentTarget.value }));
                        } }))) : null,
                this.props.rule.valueMode === "string" ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(ui_1.FormField, { inputWidth: 16, labelWidth: 10, label: "Replace With", value: this.props.rule.replaceWith, onChange: function (e) {
                            _this.props.onChange(__assign({}, _this.props.rule, { replaceWith: e.currentTarget.value }));
                        } }))) : null,
                react_1.default.createElement(ui_1.Switch, { checked: this.props.rule.useColor, label: "Use Color", labelClass: "width-10", onChange: function (newV) {
                        if (!newV)
                            return;
                        _this.props.onChange(__assign({}, _this.props.rule, { useColor: newV.currentTarget.checked }));
                    } }),
                this.props.rule.useColor ? (react_1.default.createElement("div", { className: "gf-form" },
                    react_1.default.createElement(ui_1.FormLabel, { width: 10 }, "Color"),
                    react_1.default.createElement("span", { className: "gf-form-label" },
                        react_1.default.createElement(ui_1.ColorPicker, { color: this.props.rule.color, onChange: function (color) {
                                _this.props.onChange(__assign({}, _this.props.rule, { color: color }));
                            } })))) : null,
                react_1.default.createElement("div", { className: "gf-form" },
                    react_1.default.createElement(ui_1.FormLabel, { width: 10 }, "Font size"),
                    react_1.default.createElement(ui_1.Select, { width: 16, isClearable: false, isMulti: false, isSearchable: true, value: {
                            label: this.props.rule.fontSize + "%",
                            value: this.props.rule.fontSize
                        }, options: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(function (v) { return ({
                            label: v + "%",
                            value: v
                        }); }), onChange: function (item) {
                            if (!item.value) {
                                return;
                            }
                            _this.props.onChange(__assign({}, _this.props.rule, { fontSize: item.value }));
                        } }))),
            react_1.default.createElement("div", { className: "section gf-form-group" },
                react_1.default.createElement("h5", { className: "section-heading" }, "URL"),
                react_1.default.createElement(ui_1.FormField, { inputWidth: 16, labelWidth: 10, label: "URL", tooltip: "Same variables as text. Use ${...}:noencode to disable urlencode.", value: this.props.rule.url, placeholder: "https://", onChange: function (e) {
                        _this.props.onChange(__assign({}, _this.props.rule, { url: e.currentTarget.value || "" }));
                    } })),
            react_1.default.createElement("div", { className: "gf-form-group" },
                react_1.default.createElement("div", { className: "gf-form" },
                    react_1.default.createElement(ui_1.Button, { variant: "danger", size: "sm", onClick: function () {
                            _this.props.onDelete();
                        } },
                        react_1.default.createElement("i", { className: "fa fa-trash" }),
                        " Remove Rule")),
                react_1.default.createElement("div", { className: "gf-form" },
                    react_1.default.createElement(ui_1.Button, { size: "sm", onClick: function () {
                            _this.props.onDuplicate();
                        } },
                        react_1.default.createElement("i", { className: "fa fa-copy" }),
                        " Duplicate Rule")))));
    };
    return RuleEditor;
}(react_1.Component));
exports.RuleEditor = RuleEditor;
