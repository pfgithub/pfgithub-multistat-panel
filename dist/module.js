"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = require("@grafana/ui");
var types_1 = require("./types");
var MultistatPanel_1 = require("./components/MultistatPanel");
var MultistatPanelEditor_1 = require("./components/MultistatPanelEditor");
exports.plugin = new ui_1.PanelPlugin(MultistatPanel_1.MultistatPanel);
exports.plugin.setEditor(MultistatPanelEditor_1.MultistatPanelEditor);
exports.plugin.setDefaults(types_1.defaults);
