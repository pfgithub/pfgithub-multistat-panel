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
var CodeEditor_1 = require("./CodeEditor");
var RuleListEditor_1 = require("./RuleListEditor");
var MultistatPanelEditor = /** @class */ (function (_super) {
    __extends(MultistatPanelEditor, _super);
    function MultistatPanelEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.onFeedUrlChange = function (_a) {
            var target = _a.target;
            return _this.setState({ text: target.value });
        };
        _this.state = {
            text: props.options.text,
            rules: _this.props.options.rules
        };
        _this.updatePanelProgress = undefined;
        return _this;
    }
    MultistatPanelEditor.prototype.onUpdatePanel = function () {
        var _this = this;
        this.updatePanelProgress && clearTimeout(this.updatePanelProgress);
        this.updatePanelProgress = setTimeout(function () {
            _this.props.onOptionsChange(__assign({}, _this.props.options, { text: _this.state.text, rules: _this.state.rules }));
        }, 500);
    };
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
                                }, function () { return _this.onUpdatePanel(); });
                            } })))),
            react_1.default.createElement(RuleListEditor_1.RuleListEditor, { variables: variables, rules: this.state.rules, onChange: function (rules) { return _this.setState({ rules: rules }, function () { return _this.onUpdatePanel(); }); } })));
    };
    return MultistatPanelEditor;
}(react_1.PureComponent));
exports.MultistatPanelEditor = MultistatPanelEditor;
