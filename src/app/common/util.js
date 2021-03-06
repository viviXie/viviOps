"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isObject = isObject;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isString = isString;
exports.findAllRelatedLines = findAllRelatedLines;
exports.findInputLines = findInputLines;
exports.findOutputLines = findOutputLines;
exports.removeRelatedLines = removeRelatedLines;
exports.findAllActionsOfStage = findAllActionsOfStage;
exports.disappearAnimation = disappearAnimation;
exports.transformAnimation = transformAnimation;
exports.judgeType = judgeType;
exports.changeCurrentElement = changeCurrentElement;
exports.draged = draged;
exports.zoomed = zoomed;
exports.showZoomBtn = showZoomBtn;
exports.showToolTip = showToolTip;
exports.cleanToolTip = cleanToolTip;

var _constant = require("./constant");

var constant = _interopRequireWildcard(_constant);

var _config = require("./config");

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

function isObject(o) {
    return Object.prototype.toString.call(o) == '[object Object]';
}
function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}
function isBoolean(o) {
    return Object.prototype.toString.call(o) == '[object Boolean]';
}
function isNumber(o) {
    return Object.prototype.toString.call(o) == '[object Number]';
}
function isString(o) {
    return Object.prototype.toString.call(o) == '[object String]';
}

function findAllRelatedLines(itemId) {
    var relatedLines = _.filter(constant.linePathAry, function (item) {
        return item.startData != undefined && item.endData != undefined && (item.startData.id == itemId || item.endData.id == itemId);
    });
    return relatedLines;
}
function findInputLines(itemId) {
    var relatedLines = _.filter(constant.linePathAry, function (item) {
        return item.endData != undefined && item.endData.id == itemId;
    });
    return relatedLines;
}
function findOutputLines(itemId) {
    var relatedLines = _.filter(constant.linePathAry, function (item) {
        return item.startData != undefined && item.startData.id == itemId;
    });
    return relatedLines;
}
function removeRelatedLines(args) {
    if (isString(args)) {
        var relatedLines = findAllRelatedLines(args);
        constant.setLinePathAry(_.difference(constant.linePathAry, relatedLines));
    } else {
        _.each(args, function (item) {
            removeRelatedLines(item.id);
        });
    }
}
function findAllActionsOfStage(stageId) {
    var groupId = "#action" + "-" + stageId;
    var selector = groupId + "> image";
    return $(selector);
}
function disappearAnimation(args) {
    if (isString(args)) {
        d3.selectAll(args).transition().duration(200).style("opacity", 0);
    } else {
        _.each(args, function (selector) {
            disappearAnimation(selector);
        });
    }
}
function transformAnimation(args, type) {
    _.each(args, function (item) {
        d3.selectAll(item.selector).filter(function (d, i) {
            return i > item.itemIndex;
        }).transition().delay(200).duration(200).attr("transform", function (d, i) {
            var translateX = 0,
                translateY = 0;
            if (type == "action") {
                translateX = item.type == "siblings" ? d.translateX : 0;
                translateY = item.type == "siblings" ? d.translateY - constant.ActionNodeSpaceSize : 0 - constant.ActionNodeSpaceSize;
            } else if (type == "stage") {
                translateX = item.type == "siblings" ? d.translateX - constant.PipelineNodeSpaceSize : 0 - constant.PipelineNodeSpaceSize;
                translateY = item.type == "siblings" ? d.translateY : 0;
            }
            return "translate(" + translateX + "," + translateY + ")";
        });
    });
}

function judgeType(target) {
    if (isObject(target)) {
        return "object";
    } else if (isArray(target)) {
        return "array";
    } else if (isBoolean(target)) {
        return "boolean";
    } else if (isString(target)) {
        return "string";
    } else if (isNumber(target)) {
        return "number";
    } else {
        return "null";
    }
}

function changeCurrentElement(previousData) {
    if (previousData != null) {
        switch (previousData.type) {
            case "stage":
                d3.select("#" + previousData.data.id).attr("href", config.getSVG(config.SVG_STAGE));
                break;
            case "start":
                d3.select("#" + previousData.data.id).attr("href", config.getSVG(config.SVG_START));
                break;
            case "action":
                d3.select("#" + previousData.data.id).attr("href", config.getSVG(config.SVG_ACTION));
                break;
            case "line":
                d3.select("#" + previousData.data.attr("id")).attr("stroke", "#E6F3E9");
                break;

        }
    }
}

function draged(d) {
    if (d && d.name && d.name == "conflictTree") {
        var scale = Number(d3.select(this).attr("scale"));
        d3.select(this).attr("translateX", d3.event.x).attr("translateY", d3.event.y).attr("scale", scale).attr("transform", "translate(" + d3.event.x + "," + d3.event.y + ") scale(" + scale + ")");
    } else {
        var scale = Number(constant.pipelineView.attr("scale"));
        var translate = "translate(" + d3.event.x + "," + d3.event.y + ") scale(" + scale + ")";
        var targetCollection = [constant.pipelineView, constant.actionsView, constant.linesView];
        _.each(targetCollection, function (target) {
            target.attr("translateX", d3.event.x).attr("translateY", d3.event.y).attr("transform", translate).attr("scale", scale);
        });
    }
}

var zoom = d3.behavior.zoom().on("zoom", redraw).scaleExtent([constant.zoomMinimum, constant.zoomMaximum]);

function redraw(d) {
    if (d && d.name && d.name == "conflictTree") {
        d3.select(this).attr("translateX", d3.event.translate[0]).attr("translateY", d3.event.translate[1]).attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")").attr("scale", d3.event.scale);
    } else {
        var targetCollection = [constant.pipelineView, constant.actionsView, constant.linesView];
        _.each(targetCollection, function (target) {
            target.attr("translateX", d3.event.translate[0]).attr("translateY", d3.event.translate[1]).attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")").attr("scale", d3.event.scale);
        });
    }
}
function zoomed(type, target, scaleObj) {
    var currentTranslateX = Number(target.attr("translateX"));
    var currentTranslateY = Number(target.attr("translateY"));
    var currentTranslate = [currentTranslateX, currentTranslateY];
    // zoom.scale(scale).translate(currentTranslate).event(constant.pipelineView);
    d3.transition().duration(constant.zoomDuration).tween("zoom", function () {
        if (type == "zoomin") {
            scaleObj.zoomTargetScale = scaleObj.zoomScale + constant.zoomFactor <= constant.zoomMaximum ? scaleObj.zoomScale + constant.zoomFactor : constant.zoomMaximum;
        } else if (type == "zoomout") {
            scaleObj.zoomTargetScale = scaleObj.zoomScale - constant.zoomFactor >= constant.zoomMinimum ? scaleObj.zoomScale - constant.zoomFactor : constant.zoomMinimum;
        }
        var interpolate_scale = d3.interpolate(scaleObj.zoomScale, scaleObj.zoomTargetScale),
            interpolate_trans = d3.interpolate(currentTranslate, currentTranslate);
        return function (t) {
            zoom.scale(interpolate_scale(t)).translate(interpolate_trans(t)).event(target);
            scaleObj.zoomScale = scaleObj.zoomTargetScale;
        };
    });
}
function showZoomBtn(index, type, containerView, target, scaleObj, options) {
    options = options || {};
    var horizonSpace = options.horizonSpace || constant.buttonHorizonSpace;
    var verticalSpace = options.verticalSpace || constant.buttonVerticalSpace;
    var backgroundY = options.backgroundY || constant.rectBackgroundY;

    containerView.append("image").attr("xlink:href", function (ad, ai) {
        if (type == "zoomin") {
            return config.getSVG(config.SVG_ZOOMIN);
        } else if (type == "zoomout") {
            return config.getSVG(config.SVG_ZOOMOUT);
        }
    }).attr("translateX", function (d, i) {
        return index * horizonSpace + (index - 1) * constant.buttonWidth;
    }).attr("translateY", function (d, i) {

        return verticalSpace + backgroundY;
    }).attr("transform", function (d, i) {
        var translateX = d3.select(this).attr("translateX");
        var translateY = d3.select(this).attr("translateY");
        return "translate(" + translateX + "," + translateY + ")";
    }).attr("width", constant.buttonWidth).attr("height", constant.buttonHeight).style("cursor", "pointer").on("mouseover", function (d, i) {
        var content = "";
        var href = "";
        if (type == "zoomin") {
            content = "Zoomin";
            href = config.getSVG(config.SVG_ZOOMIN);
        } else if (type == "zoomout") {
            content = "Zoomout";
            href = config.getSVG(config.SVG_ZOOMOUT);
        }
        d3.select(this).attr("href", href);
        var options = {
            "x": Number(d3.select(this).attr("translateX")),
            "y": Number(d3.select(this).attr("translateY")) + constant.buttonHeight,
            "text": content,
            "popupId": "button-element-popup",
            "parentView": containerView
        };
        showToolTip(options);
    }).on("mouseout", function (d, i) {
        cleanToolTip(containerView, "#button-element-popup");
    }).on("click", function (d, i) {
        zoomed(type, target, scaleObj);
    });
}
function showToolTip(options) {
    var x = options.x,
        y = options.y,
        text = options.text,
        popupId = options.popupId,
        parentView = options.parentView,
        width = options.width || constant.popupWidth,
        height = options.height || constant.popupHeight;

    parentView.append("g").attr("id", popupId);
    parentView.selectAll("#" + popupId).append("rect").attr("width", width).attr("height", height).attr("x", function (pd, pi) {
        return x;
    }).attr("y", function (pd, pi) {
        return y;
    }).attr("rx", 3).attr("ry", 3).style("fill", constant.toolTipBackground).style("opacity", 0.9);
    parentView.selectAll("#" + popupId).append("text").attr("x", x + 10).attr("y", y + height / 2 + 4).style("fill", "white").style("opacity", 0.9).text(text);
}

function cleanToolTip(containerView, id) {
    containerView.selectAll(id).remove();
}

/* make svg self-adaption */
// export function autoFix() {
//     setTimeout(function() {
//         d3.select("#div-d3-main-svg > svg")
//             .attr("viewBox", function() {
//                 var width = d3.select("#div-d3-main-svg > svg")[0][0].width.animVal.value;
//                 var height = d3.select("#div-d3-main-svg > svg")[0][0].height.animVal.value;
//                 return "0 0 " + width + " " + height;
//             })
//             .attr("preserveAspectRatio", "xMinYMin meet")
//     }, 1500)

// }