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
    RuleEditor.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "gf-form-group" },
                react_1.default.createElement("h5", { className: "section-heading" }, "Options"),
                react_1.default.createElement("div", { className: "gf-form-inline" },
                    react_1.default.createElement("div", { className: "gf-form" },
                        react_1.default.createElement(ui_1.Select, { width: 25, isClearable: false, isMulti: false, isSearchable: true, value: {
                                label: this.props.rule.name,
                                value: this.props.rule.name
                            }, options: this.props.variables.map(function (v) { return ({
                                label: v,
                                value: v
                            }); }), onChange: function (item) {
                                if (Array.isArray(item)) {
                                    _this.props.onChange(__assign({}, _this.props.rule, { name: item[0].value }));
                                    return;
                                }
                                if (!item.value) {
                                    return;
                                }
                                _this.props.onChange(__assign({}, _this.props.rule, { name: item.value }));
                            } }))),
                react_1.default.createElement("div", { className: "gf-form-inline" },
                    react_1.default.createElement(ui_1.UnitPicker, { defaultValue: this.props.rule.unit, onChange: function (opts) {
                            _this.props.onChange(__assign({}, _this.props.rule, { unit: opts }));
                        } })),
                react_1.default.createElement("div", { className: "gf-form-inline" },
                    react_1.default.createElement(ui_1.Switch, { checked: this.props.rule.useColor, label: "Use Color", onChange: function (newV) {
                            if (!newV)
                                return;
                            _this.props.onChange(__assign({}, _this.props.rule, { useColor: newV.currentTarget.checked }));
                        } })),
                this.props.rule.useColor ? (react_1.default.createElement("div", { className: "gf-form-inline" },
                    react_1.default.createElement("div", { className: "gf-form" },
                        react_1.default.createElement(ui_1.FormLabel, null, "Color"),
                        react_1.default.createElement("span", { className: "gf-form-label" },
                            react_1.default.createElement(ui_1.ColorPicker, { color: this.props.rule.color, onChange: function (color) {
                                    _this.props.onChange(__assign({}, _this.props.rule, { color: color }));
                                } }))))) : null,
                react_1.default.createElement("div", { className: "gf-form-inline" },
                    react_1.default.createElement("div", { className: "gf-form" },
                        react_1.default.createElement(ui_1.Select, { width: 25, isClearable: false, isMulti: false, isSearchable: true, value: {
                                label: this.props.rule.fontSize + "%",
                                value: this.props.rule.fontSize
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
                                    _this.props.onChange(__assign({}, _this.props.rule, { fontSize: item[0].value }));
                                    return;
                                }
                                if (!item.value) {
                                    return;
                                }
                                _this.props.onChange(__assign({}, _this.props.rule, { fontSize: item.value }));
                            } })))),
            react_1.default.createElement("div", { className: "gf-form-group" },
                react_1.default.createElement("div", { className: "gf-form-inline" },
                    react_1.default.createElement(ui_1.Button, { variant: "danger", size: "sm", onClick: function () {
                            _this.props.onDelete();
                        } },
                        react_1.default.createElement("i", { className: "fa fa-trash" }),
                        " Remove rule")))));
    };
    return RuleEditor;
}(react_1.PureComponent));
exports.RuleEditor = RuleEditor;
