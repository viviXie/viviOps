"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLineHistory = getLineHistory;

var _widget = require("../theme/widget");

var _historyData = require("./historyData");

var historyDataService = _interopRequireWildcard(_historyData);

var _notify = require("../common/notify");

var _loading = require("../common/loading");

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

function getLineHistory(pipelineName, versionName, pipelineRunSequence, sequenceLineId) {
    // loading.show();
    var promise = historyDataService.getLineDataInfo(pipelineName, versionName, pipelineRunSequence, sequenceLineId);
    promise.done(function (data) {
        _loading.loading.hide();
        showLineHistoryView(data.define);
    });
    promise.fail(function (xhr, status, error) {
        _loading.loading.hide();
        if (!_.isUndefined(xhr.responseJSON) && xhr.responseJSON.errMsg) {
            (0, _notify.notify)(xhr.responseJSON.errMsg, "error");
        } else if (xhr.statusText != "abort") {
            (0, _notify.notify)("Server is unreachable", "error");
        }
    });
}

function showLineHistoryView(history) {
    $.ajax({
        url: "../../templates/history/lineHistory.html",
        type: "GET",
        cache: false,
        success: function success(data) {
            $("#history-pipeline-detail").html($(data));

            var inputStream = JSON.stringify(history.input, undefined, 2);
            $("#action-input-stream").val(inputStream);

            var outputStream = JSON.stringify(history.output, undefined, 2);
            $("#action-output-stream").val(outputStream);

            (0, _widget.resizeWidget)();
        }
    });
}