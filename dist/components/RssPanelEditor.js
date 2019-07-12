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
var RssPanelEditor = /** @class */ (function (_super) {
    __extends(RssPanelEditor, _super);
    function RssPanelEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.onUpdatePanel = function () {
            return _this.props.onOptionsChange(__assign({}, _this.props.options, { feedUrl: _this.state.feedUrl }));
        };
        _this.onFeedUrlChange = function (_a) {
            var target = _a.target;
            return _this.setState({ feedUrl: target.value });
        };
        _this.state = { feedUrl: props.options.feedUrl };
        return _this;
    }
    RssPanelEditor.prototype.render = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.PanelOptionsGroup, { title: "Feed" },
                react_1.default.createElement("div", { className: "gf-form" },
                    react_1.default.createElement(ui_1.FormField, { label: "Feed url", labelWidth: 6, inputWidth: 25, value: this.state.feedUrl, onChange: this.onFeedUrlChange, onBlur: this.onUpdatePanel })))));
    };
    return RssPanelEditor;
}(react_1.PureComponent));
exports.RssPanelEditor = RssPanelEditor;
