"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPipelineHistories = getPipelineHistories;
exports.getPipelineHistory = getPipelineHistory;
exports.getActionRunHistory = getActionRunHistory;
exports.getLineDataInfo = getLineDataInfo;

var _api = require("../common/api");

function getPipelineHistories() {
    return _api.historyApi.pipelineHistories();
} /*
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

function getPipelineHistory(pipelineName, versionName, pipelineRunSequence) {
    return _api.historyApi.pipelineHistory(pipelineName, versionName, pipelineRunSequence);
}

function getActionRunHistory(pipelineName, versionName, pipelineRunSequence, stageName, actionName) {
    return _api.historyApi.action(pipelineName, versionName, pipelineRunSequence, stageName, actionName);
}

function getLineDataInfo(pipelineName, versionName, pipelineRunSequence, sequenceLineId) {
    return _api.historyApi.relation(pipelineName, versionName, pipelineRunSequence, sequenceLineId);
}

// export function sequenceData(pipelineName,versionID,pipelineRunSequenceID){
//     return historyApi.sequenceData(pipelineName,versionID,pipelineRunSequenceID);
// }

// export function sequenceList( ){
//     return historyApi.sequenceList( );
//}