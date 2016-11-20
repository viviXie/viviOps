"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSVG = getSVG;
exports.getImage = getImage;
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

var PNG_BASEDIR = exports.PNG_BASEDIR = "../../assets/images/",
    PNG_SUFFIX = exports.PNG_SUFFIX = ".png",
    SVG_BASEDIR = exports.SVG_BASEDIR = "../../assets/svg/",
    SVG_SUFFIX = exports.SVG_SUFFIX = ".svg",
    SVG_START = exports.SVG_START = "start-latest",
    SVG_START_SELECTED = exports.SVG_START_SELECTED = "start-selected-latest",
    SVG_STAGE = exports.SVG_STAGE = "stage-latest",
    SVG_STAGE_SELECTED = exports.SVG_STAGE_SELECTED = "stage-selected-latest",
    SVG_ADD_STAGE = exports.SVG_ADD_STAGE = "add-stage-latest",
    SVG_ADD_STAGE_SELECTED = exports.SVG_ADD_STAGE_SELECTED = "add-stage-selected-latest",
    SVG_END = exports.SVG_END = "end-latest",
    SVG_ACTION = exports.SVG_ACTION = "action-latest",
    SVG_ACTION_SELECTED = exports.SVG_ACTION_SELECTED = "action-selected-latest",
    SVG_ADD_ACTION = exports.SVG_ADD_ACTION = "add-action-latest",
    SVG_ADD_ACTION_SELECTED = exports.SVG_ADD_ACTION_SELECTED = "add-action-selected-latest",
    SVG_DELETE = exports.SVG_DELETE = "delete-latest",
    SVG_DELETE_SELECTED = exports.SVG_DELETE_SELECTED = "delete-selected-latest",
    SVG_REMOVE_LINK = exports.SVG_REMOVE_LINK = "remove-link-latest",
    SVG_REMOVE_LINK_SELECTED = exports.SVG_REMOVE_LINK_SELECTED = "remove-link-selected-latest",
    SVG_ZOOMIN = exports.SVG_ZOOMIN = "zoomin",
    SVG_ZOOMOUT = exports.SVG_ZOOMOUT = "zoomout",
    SVG_CONFLICT = exports.SVG_CONFLICT = "conflict",
    SVG_REMOVE_CONFLICT = exports.SVG_REMOVE_CONFLICT = "remove-conflict",
    SVG_HIGHLIGHT_CONFLICT = exports.SVG_HIGHLIGHT_CONFLICT = "highlight-conflict";

function getSVG(name) {
    return SVG_BASEDIR + name + SVG_SUFFIX;
}

function getImage(name) {
    return PNG_BASEDIR + name + PNG_SUFFIX;
}