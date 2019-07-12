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
var react_1 = __importStar(require("react"));
var runtime_1 = require("@grafana/runtime");
var CodeEditor = /** @class */ (function (_super) {
    __extends(CodeEditor, _super);
    function CodeEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    CodeEditor.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement("textarea", { style: {
                backgroundColor: runtime_1.config.theme.colors.black,
                color: runtime_1.config.theme.colors.white
            }, value: this.props.value, onChange: function (e) { return _this.props.onChange(e.currentTarget.value); }, onBlur: this.props.onBlur }));
    };
    return CodeEditor;
}(react_1.Component));
exports.CodeEditor = CodeEditor;
