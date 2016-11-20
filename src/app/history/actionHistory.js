"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getActionHistory = getActionHistory;

var _widget = require("../theme/widget");

var _historyData = require("./historyData");

var historyDataService = _interopRequireWildcard(_historyData);

var _notify = require("../common/notify");

var _loading = require("../common/loading");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// function(pipelineName,versionName,pipelineRunSequence,stageName,actionName){
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

function getActionHistory(pipelineName, versionName, pipelineRunSequence, stageName, actionName) {
    // loading.show();
    var promise = historyDataService.getActionRunHistory(pipelineName, versionName, pipelineRunSequence, stageName, actionName);
    promise.done(function (data) {
        _loading.loading.hide();
        showActionHistoryView(data.result, actionName);
    });
    promise.fail(function (xhr, status, error) {
        _loading.loading.hide();
        if (!_.isUndefined(xhr.responseJSON) && xhr.responseJSON.errMsg) {
            (0, _notify.notify)(xhr.responseJSON.errMsg, "error");
        } else {
            (0, _notify.notify)("Server is unreachable", "error");
        }
    });
}

var sequenceLogDetail = [];
function showActionHistoryView(history, actionname) {
    $.ajax({
        url: "../../templates/history/actionHistory.html",
        type: "GET",
        cache: false,
        success: function success(data) {
            $("#history-pipeline-detail").html($(data));
            $("#actionHistoryTitle").text("Action history -- " + actionname);

            var inputStream = JSON.stringify(history.data.input, undefined, 2);
            $("#action-input-stream").val(inputStream);

            var outputStream = JSON.stringify(history.data.output, undefined, 2);
            $("#action-output-stream").val(outputStream);

            _.each(history.logList, function (log, index) {
                var allLogs = log.substr(23);
                var logJson = JSON.parse(allLogs);
                var num = index + 1;

                // if(!logJson.data && !logJson.resp){
                // console.log("=========starta=========");
                console.log("log=====", log);
                // console.log("allLogs=====",allLogs);
                console.log("logJson=====", logJson);
                // console.log("num=====",num);
                // console.log("log=========end=========");
                sequenceLogDetail[index] = logJson.INFO;
                var logTime = log.substr(0, 19);

                var row = "<tr class=\"log-item\"><td>" + num + "</td><td>" + logTime + "</td><td>" + logJson.EVENT + "</td><td>" + logJson.EVENTID + "</td><td>" + logJson.RUN_ID + "</td><td>" + logJson.INFO.status + "</td><td>" + logJson.INFO.result + "</td><td><button data-logid=\"" + "info_" + index + "\" type=\"button\" class=\"btn btn-success sequencelog-detail\"><i class=\"glyphicon glyphicon-list-alt\" style=\"font-size:14px\"></i>&nbsp;&nbsp;Detail</button></td></tr>";
                $("#logs-tr").append(row);
                var c = $(".sequencelog-detail").attr("data-logid");
                console.log("c", c);

                // } else {
                //     var row = `<tr class="log-item"><td>`
                //                     + num + `</td><td></td><td></td><td></td><td></td><td></td><td></td><td>`
                //                     + logJson.data +`</td><td>`
                //                     + logJson.resp +`</td><td></td></tr>`;
                //     $("#logs-tr").append(row);    
                // }
            });

            (0, _widget.resizeWidget)();

            $(".sequencelog-detail").on("click", function (e) {

                var target = $(e.target);
                var tempLogIdArray = target.attr("data-logid").split("_");

                if (null != tempLogIdArray && tempLogIdArray.length > 1) {

                    var logjsoin = sequenceLogDetail[tempLogIdArray[1]];
                    var detailData = "";

                    for (var prop in logjsoin) {
                        console.log(logjsoin[prop]);
                        // detailData += prop + ":" + logjsoin[prop].replace(/\\n/g,"<br/>");
                        detailData += prop + ":" + logjsoin[prop];
                        detailData += "<br /><br />";
                    }
                    $(".dialogContant").html(detailData);
                }

                $(".dialogWindow").css("height", "auto");
                $("#dialog").show();
                if ($(".dialogWindow").height() < $("#dialog").height() * 0.75) {

                    $(".dialogWindow").css("height", "auto");
                } else {

                    $(".dialogWindow").css("height", "80%");
                    $(".dialogContant").css("height", "100%");
                }

                $("#detailClose").on("click", function () {
                    $("#dialog").hide();
                });
            });
        }
    });
}