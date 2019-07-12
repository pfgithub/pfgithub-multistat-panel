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
var RuleEditor_1 = require("./RuleEditor");
var RuleListEditor = /** @class */ (function (_super) {
    __extends(RuleListEditor, _super);
    function RuleListEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RuleListEditor.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(ui_1.PanelOptionsGroup, { title: "Styles" },
            react_1.default.createElement(react_1.default.Fragment, null,
                this.props.rules.map(function (rule, i) {
                    return (react_1.default.createElement("div", { key: i },
                        i === 0 ? null : react_1.default.createElement("hr", null),
                        react_1.default.createElement(RuleEditor_1.RuleEditor, { key: i, rule: rule, variables: _this.props.variables, onChange: function (newRule) {
                                _this.props.onChange(_this.props.rules.map(function (currentRule) {
                                    return currentRule === rule
                                        ? newRule
                                        : currentRule;
                                }));
                            }, onDelete: function () {
                                _this.props.onChange(_this.props.rules.filter(function (currentRule) {
                                    return currentRule === rule
                                        ? false
                                        : true;
                                }));
                            } })));
                }),
                this.props.rules.length === 0 ? null : react_1.default.createElement("hr", null),
                react_1.default.createElement(ui_1.Button, { onClick: function () {
                        _this.props.onChange(_this.props.rules.concat([
                            types_1.defaultMultistatRule
                        ]));
                    } }, "Add Rule"))));
    };
    return RuleListEditor;
}(react_1.PureComponent));
exports.RuleListEditor = RuleListEditor;
