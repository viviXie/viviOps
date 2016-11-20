"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pipelineCheck = pipelineCheck;

var _notify = require("../common/notify");

var _constant = require("../common/constant");

var constant = _interopRequireWildcard(_constant);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// validate
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

function pipelineCheck(data) {
    var completeness = true;
    for (var index = 0; index < data.length; index++) {
        var item = data[index];
        if (item.type == constant.PIPELINE_START) {
            completeness = checkPipelineStart(item);
        } else if (item.type == constant.PIPELINE_STAGE) {
            completeness = checkPipelineStage(item, index);
        }
        if (!completeness) {
            break;
        }
    }
    if (completeness) {
        (0, _notify.notify)("Pipeline is available.", "success");
    }
    return completeness;
}

function checkPipelineStart(data) {
    var completeness = true;
    if (_.isUndefined(data.outputJson) || _.isEmpty(data.outputJson)) {
        (0, _notify.notify)("Output json missed ---- < Start stage >", "info");
        completeness = false;
    } else if (_.isUndefined(data.setupData) || _.isEmpty(data.setupData)) {
        (0, _notify.notify)("Base config missed ---- < Start stage >", "info");
        completeness = false;
    }
    return completeness;
}

function checkPipelineStage(data, index) {
    var completeness = true;
    if (_.isUndefined(data.setupData) || _.isEmpty(data.setupData)) {
        (0, _notify.notify)("Base config missed ---- < Stage No. " + index + " >", "info");
        completeness = false;
    } else if (_.isEmpty(data.setupData.name)) {
        (0, _notify.notify)("Name missed ---- < Stage No. " + index + " >", "info");
        completeness = false;
    } else if (_.isEmpty(data.setupData.timeout)) {
        (0, _notify.notify)("Timeout missed ---- < Stage No. " + index + " >", "info");
        completeness = false;
    }

    if (!completeness) {
        return completeness;
    }

    for (var i = 0; i < data.actions.length; i++) {
        var item = data.actions[i];
        completeness = checkPipelineAction(item, index, i);
        if (!completeness) {
            break;
        }
    }

    return completeness;
}

function checkPipelineAction(data, stageindex, actionindex) {
    var completeness = true;
    if (_.isUndefined(data.outputJson) || _.isEmpty(data.outputJson)) {
        (0, _notify.notify)("Output json missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (_.isUndefined(data.inputJson) || _.isEmpty(data.inputJson)) {
        (0, _notify.notify)("Input json missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (_.isUndefined(data.setupData) || _.isEmpty(data.setupData)) {
        (0, _notify.notify)("Base config missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else {
        completeness = checkActionCompleteness(data, stageindex, actionindex);
    }
    return completeness;
}

function checkActionCompleteness(data, stageindex, actionindex) {
    var completeness = true;
    if (_.isEmpty(data.setupData.action.name)) {
        (0, _notify.notify)("Name missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (_.isEmpty(data.setupData.action.timeout)) {
        (0, _notify.notify)("Timeout missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (_.isEmpty(data.setupData.action.image.name)) {
        (0, _notify.notify)("Image name missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (_.isEmpty(data.setupData.action.image.tag)) {
        (0, _notify.notify)("Image tag missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (_.isEmpty(data.setupData.action.datafrom)) {
        (0, _notify.notify)("Data From missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (_.isEmpty(data.setupData.action.ip)) {
        (0, _notify.notify)("Kubernetes IP missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (_.isEmpty(data.setupData.action.apiserver)) {
        (0, _notify.notify)("Kubernetes api server missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (!data.setupData.action.useAdvanced) {
        completeness = checkActionBaseSetting(data, stageindex, actionindex);
    } else if (data.setupData.action.useAdvanced) {
        completeness = checkActionAdvancedSetting(data, stageindex, actionindex);
    }

    return completeness;
}

function checkActionBaseSetting(data, stageindex, actionindex) {
    var completeness = true;
    if (_.isEmpty(data.setupData.pod.spec.containers[0].resources.limits.cpu.toString())) {
        (0, _notify.notify)("CPU limits missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (_.isEmpty(data.setupData.pod.spec.containers[0].resources.limits.memory)) {
        (0, _notify.notify)("Memory limits missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (_.isEmpty(data.setupData.pod.spec.containers[0].resources.requests.cpu.toString())) {
        (0, _notify.notify)("CPU requests missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (_.isEmpty(data.setupData.pod.spec.containers[0].resources.requests.memory)) {
        (0, _notify.notify)("Memory requests missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else {
        var type = data.setupData.service.spec.type;
        var ports = data.setupData.service.spec.ports;
        if (ports.length == 0) {
            (0, _notify.notify)("No ports setting ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
            completeness = false;
        }
        for (var i = 0; i < ports.length; i++) {
            if (_.compact(_.values(ports[i])).length < 3 && type == "NodePort") {
                (0, _notify.notify)("Ports or target ports or node ports missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
                completeness = false;
                break;
            } else if (_.compact(_.values(ports[i])).length < 2 && type == "ClusterIP") {
                (0, _notify.notify)("Ports or target ports missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
                completeness = false;
                break;
            }
        }
    }

    return completeness;
}

function checkActionAdvancedSetting(data, stageindex, actionindex) {
    var completeness = true;
    if (_.isUndefined(data.setupData.service_advanced) || _.isEmpty(data.setupData.service_advanced)) {
        (0, _notify.notify)("Service advanced setting missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    } else if (_.isUndefined(data.setupData.pod_advanced) || _.isEmpty(data.setupData.pod_advanced)) {
        (0, _notify.notify)("Pod advanced setting missed ---- < Stage No. " + stageindex + " / Action No. " + (actionindex + 1) + " >", "info");
        completeness = false;
    }

    return completeness;
}