import { PanelPlugin } from "@grafana/ui";
import React, { Component, PureComponent } from "react";

import { defaults, MultistatOptions } from "./types";
import { MultistatPanel } from "./components/MultistatPanel";
import { MultistatPanelEditor } from "./components/MultistatPanelEditor";

export const plugin = new PanelPlugin<MultistatOptions>(MultistatPanel);

plugin.setEditor(MultistatPanelEditor);
plugin.setDefaults(defaults);
