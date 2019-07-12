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
var CodeEditor_1 = require("./CodeEditor");
var MultistatPanelEditor = /** @class */ (function (_super) {
    __extends(MultistatPanelEditor, _super);
    function MultistatPanelEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.onUpdatePanel = function () {
            return _this.props.onOptionsChange(__assign({}, _this.props.options, { text: _this.state.text, rules: _this.state.rules }));
        };
        _this.onFeedUrlChange = function (_a) {
            var target = _a.target;
            return _this.setState({ text: target.value });
        };
        _this.state = {
            text: props.options.text,
            rules: _this.props.options.rules
        };
        return _this;
    }
    MultistatPanelEditor.prototype.render = function () {
        var _this = this;
        var variables = this.state.text.split(/(\${__cell[:_].+?}|\n)/g) || ["No Options"];
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.PanelOptionsGroup, { title: "Feed" },
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { className: "gf-form" },
                        react_1.default.createElement(ui_1.FormLabel, { tooltip: "${__cell:column name} or ${__cell_#} (forex ${__cell_0} )" }, "Text"),
                        react_1.default.createElement(CodeEditor_1.CodeEditor, { value: this.state.text, onChange: function (e) {
                                _this.setState({
                                    text: e
                                });
                            }, onBlur: function () { return _this.onUpdatePanel(); } })))),
            react_1.default.createElement(ui_1.PanelOptionsGroup, { title: "Styles" },
                react_1.default.createElement(react_1.default.Fragment, null,
                    this.state.rules.map(function (rule, i) {
                        if (!rule.unit) {
                            rule.unit = types_1.defaultMultistatRule.unit;
                        }
                        if (!rule.color) {
                            rule.color = types_1.defaultMultistatRule.color;
                        }
                        return (react_1.default.createElement(react_1.default.Fragment, null,
                            i !== 0 ? react_1.default.createElement("hr", { key: i - 0.5 }) : null,
                            react_1.default.createElement("div", { className: "gf-form-group", key: i },
                                react_1.default.createElement("h5", { className: "section-heading" }, "Options"),
                                react_1.default.createElement("div", { className: "gf-form-inline" },
                                    react_1.default.createElement("div", { className: "gf-form" },
                                        react_1.default.createElement(ui_1.Select, { width: 25, isClearable: false, isMulti: false, isSearchable: true, value: {
                                                label: rule.name,
                                                value: rule.name
                                            }, options: variables.map(function (v) { return ({
                                                label: v,
                                                value: v
                                            }); }), onChange: function (item) {
                                                if (Array.isArray(item)) {
                                                    rule.name =
                                                        item[0].value;
                                                    _this.setState({
                                                        rules: _this
                                                            .state
                                                            .rules.slice()
                                                    });
                                                    return;
                                                }
                                                if (!item.value) {
                                                    return;
                                                }
                                                rule.name = item.value;
                                                _this.setState({
                                                    rules: _this
                                                        .state
                                                        .rules.slice()
                                                }, function () {
                                                    return _this.onUpdatePanel();
                                                });
                                            }, onBlur: function () {
                                                _this.onUpdatePanel();
                                            } }))),
                                react_1.default.createElement("div", { className: "gf-form-inline" },
                                    react_1.default.createElement(ui_1.UnitPicker, { defaultValue: rule.unit, onChange: function (opts) {
                                            rule.unit = opts;
                                            _this.setState({
                                                rules: _this.state
                                                    .rules.slice()
                                            }, function () {
                                                return _this.onUpdatePanel();
                                            });
                                        } })),
                                react_1.default.createElement("div", { className: "gf-form-inline" },
                                    react_1.default.createElement(ui_1.Switch, { checked: rule.useColor, label: "Use Color", onChange: function (newV) {
                                            if (!newV)
                                                return;
                                            rule.useColor =
                                                newV.currentTarget.checked;
                                            _this.setState({
                                                rules: _this.state
                                                    .rules.slice()
                                            }, function () {
                                                return _this.onUpdatePanel();
                                            });
                                        } })),
                                react_1.default.createElement("div", { className: "gf-form-inline" },
                                    react_1.default.createElement("div", { className: "gf-form" },
                                        react_1.default.createElement(ui_1.FormLabel, null, "Color"),
                                        react_1.default.createElement("span", { className: "gf-form-label" },
                                            react_1.default.createElement(ui_1.ColorPicker, { color: rule.color, onChange: function (color) {
                                                    rule.color = color;
                                                    _this.setState({
                                                        rules: _this
                                                            .state
                                                            .rules.slice()
                                                    }, function () {
                                                        return _this.onUpdatePanel();
                                                    });
                                                } })))),
                                react_1.default.createElement("div", { className: "gf-form-inline" },
                                    react_1.default.createElement("div", { className: "gf-form" },
                                        react_1.default.createElement(ui_1.Select, { width: 25, isClearable: false, isMulti: false, isSearchable: true, value: {
                                                label: rule.fontSize + "%",
                                                value: rule.fontSize
                                            }, options: [
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
                                            ].map(function (v) { return ({
                                                label: v + "%",
                                                value: v
                                            }); }), onChange: function (item) {
                                                if (Array.isArray(item)) {
                                                    rule.fontSize =
                                                        item[0].value;
                                                    _this.setState({
                                                        rules: _this
                                                            .state
                                                            .rules.slice()
                                                    }, function () {
                                                        return _this.onUpdatePanel();
                                                    });
                                                    return;
                                                }
                                                if (!item.value) {
                                                    return;
                                                }
                                                rule.fontSize =
                                                    item.value;
                                                _this.setState({
                                                    rules: _this
                                                        .state
                                                        .rules.slice()
                                                }, function () {
                                                    return _this.onUpdatePanel();
                                                });
                                            } })))),
                            react_1.default.createElement("div", { className: "gf-form-group", key: i + 0.1 },
                                react_1.default.createElement("div", { className: "gf-form-inline" },
                                    react_1.default.createElement(ui_1.DeleteButton, { onConfirm: function () {
                                            _this.setState({
                                                rules: _this.state.rules.filter(function (rulea) {
                                                    return rulea !==
                                                        rule;
                                                })
                                            }, function () {
                                                return _this.onUpdatePanel();
                                            });
                                        } })))));
                    }),
                    react_1.default.createElement("hr", null),
                    react_1.default.createElement(ui_1.Button, { onClick: function () {
                            _this.setState({
                                rules: _this.state.rules.concat([
                                    types_1.defaultMultistatRule
                                ])
                            }, function () { return _this.onUpdatePanel(); });
                        } }, "Add Rule")))));
    };
    return MultistatPanelEditor;
}(react_1.PureComponent));
exports.MultistatPanelEditor = MultistatPanelEditor;
