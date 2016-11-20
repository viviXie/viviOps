"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setPipelineView = setPipelineView;
exports.setActionsView = setActionsView;
exports.setActionView = setActionView;
exports.setButtonView = setButtonView;
exports.setLinesView = setLinesView;
exports.setLineView = setLineView;
exports.setClickNodeData = setClickNodeData;
exports.setLinePathAry = setLinePathAry;
exports.setPipelineNodeSpaceSize = setPipelineNodeSpaceSize;
exports.setActionNodeSpaceSize = setActionNodeSpaceSize;
exports.setPipelineNodeStartX = setPipelineNodeStartX;
exports.setPipelineNodeStartY = setPipelineNodeStartY;
exports.setSvgWidth = setSvgWidth;
exports.setSvgHeight = setSvgHeight;
exports.setSvgMainRect = setSvgMainRect;
exports.setSvg = setSvg;
exports.setG = setG;
exports.setCurrentSelectedItem = setCurrentSelectedItem;
/* 
Copyright 2014 Huawei Technologies Co., Ltd. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

var PIPELINE_START = exports.PIPELINE_START = "pipeline-start",
    PIPELINE_END = exports.PIPELINE_END = "pipeline-end",
    PIPELINE_ADD_STAGE = exports.PIPELINE_ADD_STAGE = "pipeline-add-stage",
    PIPELINE_ADD_ACTION = exports.PIPELINE_ADD_ACTION = "pipeline-add-action",
    PIPELINE_STAGE = exports.PIPELINE_STAGE = "pipeline-stage",
    PIPELINE_ACTION = exports.PIPELINE_ACTION = "pipeline-action",
    svgStageWidth = exports.svgStageWidth = 45,
    svgStageHeight = exports.svgStageHeight = 52,
    svgActionWidth = exports.svgActionWidth = 38,
    svgActionHeight = exports.svgActionHeight = 38,
    svgButtonWidth = exports.svgButtonWidth = 30,
    svgButtonHeight = exports.svgButtonHeight = 30,
    pipelineView = exports.pipelineView = null,
    actionsView = exports.actionsView = null,
    actionView = exports.actionView = [],
    buttonView = exports.buttonView = null,
    linesView = exports.linesView = null,
    lineView = exports.lineView = [],
    clickNodeData = exports.clickNodeData = {},
    linePathAry = exports.linePathAry = [],
    sequencePipelineView = exports.sequencePipelineView = null,
    sequenceActionsView = exports.sequenceActionsView = null,
    sequenceActionLinkView = exports.sequenceActionLinkView = null,
    sequenceActionView = exports.sequenceActionView = [],
    sequenceButtonView = exports.sequenceButtonView = null,
    sequenceLinesView = exports.sequenceLinesView = null,
    sequenceLineView = exports.sequenceLineView = [],
    sequenceLinePathArray = exports.sequenceLinePathArray = [],
    sequenceRunData = exports.sequenceRunData = [],
    sequenceRunStatus = exports.sequenceRunStatus = null,
    refreshSequenceRunData = exports.refreshSequenceRunData = [],
    PipelineNodeSpaceSize = exports.PipelineNodeSpaceSize = 200,
    ActionNodeSpaceSize = exports.ActionNodeSpaceSize = 75,
    pipelineNodeStartX = exports.pipelineNodeStartX = 0,
    pipelineNodeStartY = exports.pipelineNodeStartY = 0,
    svgWidth = exports.svgWidth = 0,
    svgHeight = exports.svgHeight = 0,
    svgMainRect = exports.svgMainRect = null,
    svg = exports.svg = null,
    g = exports.g = null,
    popupWidth = exports.popupWidth = 110,
    popupHeight = exports.popupHeight = 25,
    currentSelectedItem = exports.currentSelectedItem = null,
    zoomFactor = exports.zoomFactor = 0.2,
    zoomMinimum = exports.zoomMinimum = 0.1,
    zoomMaximum = exports.zoomMaximum = 3,
    zoomDuration = exports.zoomDuration = 300,
    buttonWidth = exports.buttonWidth = 23,
    buttonHeight = exports.buttonHeight = 23,
    buttonVerticalSpace = exports.buttonVerticalSpace = 6,
    toolTipBackground = exports.toolTipBackground = "#555",
    buttonHorizonSpace = exports.buttonHorizonSpace = 20,
    rectBackgroundY = exports.rectBackgroundY = 15;

function setPipelineView(v) {
    exports.pipelineView = pipelineView = v;
}

function setActionsView(v) {
    exports.actionsView = actionsView = v;
}

function setActionView(v) {
    exports.actionView = actionView = v;
}

function setButtonView(v) {
    exports.buttonView = buttonView = v;
}

function setLinesView(v) {
    exports.linesView = linesView = v;
}

function setLineView(v) {
    exports.lineView = lineView = v;
}

function setClickNodeData(v) {
    exports.clickNodeData = clickNodeData = v;
}

function setLinePathAry(v) {
    exports.linePathAry = linePathAry = v;
}

function setPipelineNodeSpaceSize(v) {
    exports.PipelineNodeSpaceSize = PipelineNodeSpaceSize = v;
}

function setActionNodeSpaceSize(v) {
    exports.ActionNodeSpaceSize = ActionNodeSpaceSize = v;
}

function setPipelineNodeStartX(v) {
    exports.pipelineNodeStartX = pipelineNodeStartX = v;
}

function setPipelineNodeStartY(v) {
    exports.pipelineNodeStartY = pipelineNodeStartY = v;
}

function setSvgWidth(v) {
    exports.svgWidth = svgWidth = v;
}

function setSvgHeight(v) {
    exports.svgHeight = svgHeight = v;
}

function setSvgMainRect(v) {
    exports.svgMainRect = svgMainRect = v;
}

function setSvg(v) {
    exports.svg = svg = v;
}

function setG(v) {
    exports.g = g = v;
}

function setCurrentSelectedItem(v) {
    exports.currentSelectedItem = currentSelectedItem = v;
}