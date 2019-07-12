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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var brace_1 = __importDefault(require("brace"));
var CodeEditor = /** @class */ (function (_super) {
    __extends(CodeEditor, _super);
    function CodeEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.refEditor = react_1.default.createRef();
        return _this;
    }
    CodeEditor.prototype.componentDidMount = function () {
        this.setupAceEditor();
        this.updateAceFromProps();
    };
    CodeEditor.prototype.componentWillUnmount = function () {
        this.getAce().destroy();
        this.editor = undefined;
    };
    CodeEditor.prototype.componentDidUpdate = function (prev) {
        this.updateAceFromProps();
    };
    CodeEditor.prototype.setupAceEditor = function () {
        var component = this.refEditor.current;
        if (!component) {
            throw new Error("Component was not found when setting up ace editor. This should never happen.");
        }
        this.editor = brace_1.default.edit(component);
        this.editor.$blockScrolling = Infinity;
        this.editor.setTheme("ace/theme/chrome");
        this.editor.setOptions({
            showPrintMargin: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
        });
    };
    CodeEditor.prototype.getAce = function () {
        var editor = this.editor;
        if (!editor) {
            throw new Error("Ace editor was not found when getting ace editor. This should never happen.");
        }
        return editor;
    };
    CodeEditor.prototype.updateAceFromProps = function () {
        var _this = this;
        var value = this.getAce().getValue();
        if (this.props.value !== value) {
            this.getAce().setValue(this.props.value);
        }
        this.getAce().onTextInput = function () {
            _this.props.onChange(_this.getAce().getValue());
        };
    };
    CodeEditor.prototype.render = function () {
        return (react_1.default.createElement("div", { ref: this.refEditor, style: { width: "500px", height: "500px" } }));
    };
    return CodeEditor;
}(react_1.Component));
exports.CodeEditor = CodeEditor;
