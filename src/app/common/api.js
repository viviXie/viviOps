"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.historyApi = exports.componentApi = exports.pipelineApi = undefined;

var _loading = require("./loading");

var apiUrlConf = {
	// "host" : "https://test-1.containerops.sh",
	"host": "http://test-2.containerops.sh:3306",
	"pipeline": {
		"list": "/v2/{namespace}/{repository}/workflow/v1/define/list",
		"data": "/v2/{namespace}/{repository}/workflow/v1/define/{pipelineName}?id={pipelineID}",
		"add": "/v2/{namespace}/{repository}/workflow/v1/define",
		"save": "/v2/{namespace}/{repository}/workflow/v1/define/{pipelineName}",
		"eventOutput": "/v2/{namespace}/{repository}/workflow/v1/define/event/{site}/{eventName}",
		"getEnv": "/v2/{namespace}/{repository}/workflow/v1/define/{pipelineName}/env?id={pipelineID}",
		"setEnv": "/v2/{namespace}/{repository}/workflow/v1/define/{pipelineName}/env",
		"changeState": "/v2/{namespace}/{repository}/workflow/v1/define/{pipelineName}/state",
		"getToken": "/v2/{namespace}/{repository}/workflow/v1/define/{pipelineName}/token?id={pipelineID}"
	},

	"component": {
		"list": "/v2/{namespace}/component/list",
		"data": "/v2/{namespace}/component/{componentName}?id={componentID}",
		"add": "/v2/{namespace}/component",
		"save": "/v2/{namespace}/component/{componentName}"
	},

	"history": {
		"pipelineHistories": "/v2/{namespace}/{repository}/workflow/v1/log/list",
		"pipelineHistory": "/v2/{namespace}/{repository}/workflow/v1/log/{pipelineName}/{version}?sequence={sequence}",
		"action": "/v2/{namespace}/{repository}/workflow/v1/log/{pipelineName}/{version}/{sequence}/stage/{stageName}/action/{actionName}",
		"relation": "/v2/{namespace}/{repository}/workflow/v1/log/{pipelineName}/{version}/{sequence}/{lineId}"
	}
	// "history" : {
	// 	"pipelineHistories" : "/pipeline/v1/demo/demo/histories",
	// 	"pipelineHistory" : "/pipeline/v1/demo/demo/{pipelineName}/{version}/define?sequence={sequence}",
	// 	"action" : "/pipeline/v1/demo/demo/{pipelineName}/{version}/{sequence}/stage/{stageName}/action/{actionName}/define",
	// 	"relation" : "/pipeline /v1/demo/demo/{pipelineName}/{version}/{sequence}/{lineId}"
	// }
}; /*
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

var pendingPromise = void 0;

// abort
function abortPendingPromise() {
	if (pendingPromise) {
		pendingPromise.abort();
	}
	_loading.loading.show();
}

// pipeline
var pipelineApi = exports.pipelineApi = {
	"list": function list() {
		abortPendingPromise();
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.pipeline.list.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo"),
			"type": "GET",
			"dataType": "json",
			"cache": false
		});
		return pendingPromise;
	},
	"data": function data(name, id) {
		abortPendingPromise();
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.pipeline.data.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{pipelineName}/g, name).replace(/{pipelineID}/g, id),
			"type": "GET",
			"dataType": "json",
			"cache": false
		});
		return pendingPromise;
	},
	"add": function add(name, version) {
		abortPendingPromise();
		var data = JSON.stringify({
			"name": name,
			"version": version
		});
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.pipeline.add.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo"),
			"type": "POST",
			"dataType": "json",
			"data": data
		});
		return pendingPromise;
	},
	"save": function save(name, reqbody) {
		abortPendingPromise();
		var data = JSON.stringify(reqbody);
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.pipeline.save.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{pipelineName}/g, name),
			"type": "PUT",
			"dataType": "json",
			"data": data
		});
		return pendingPromise;
	},
	"eventOutput": function eventOutput(name) {
		abortPendingPromise();
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.pipeline.eventOutput.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{site}/g, "github").replace(/{eventName}/g, name),
			"type": "GET",
			"dataType": "json",
			"cache": false
		});
		return pendingPromise;
	},
	"getEnv": function getEnv(name, id) {
		abortPendingPromise();
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.pipeline.getEnv.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{pipelineName}/g, name).replace(/{pipelineID}/g, id),
			"type": "GET",
			"dataType": "json",
			"cache": false
		});
		return pendingPromise;
	},
	"setEnv": function setEnv(name, reqbody) {
		abortPendingPromise();
		var data = JSON.stringify(reqbody);
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.pipeline.setEnv.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{pipelineName}/g, name),
			"type": "PUT",
			"dataType": "json",
			"data": data
		});
		return pendingPromise;
	},
	"changeState": function changeState(name, reqbody) {
		abortPendingPromise();
		var data = JSON.stringify(reqbody);
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.pipeline.changeState.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{pipelineName}/g, name),
			"type": "PUT",
			"dataType": "json",
			"data": data
		});
		return pendingPromise;
	},
	"getToken": function getToken(name, id) {
		abortPendingPromise();
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.pipeline.getToken.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{pipelineName}/g, name).replace(/{pipelineID}/g, id),
			"type": "GET",
			"dataType": "json",
			"cache": false
		});
		return pendingPromise;
	}
};

// component
var componentApi = exports.componentApi = {
	"list": function list() {
		abortPendingPromise();
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.component.list.replace(/{namespace}/g, "demo"),
			"type": "GET",
			"dataType": "json",
			"cache": false
		});
		return pendingPromise;
	},
	"data": function data(name, id) {
		abortPendingPromise();
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.component.data.replace(/{namespace}/g, "demo").replace(/{componentName}/g, name).replace(/{componentID}/g, id),
			"type": "GET",
			"dataType": "json",
			"cache": false
		});
		return pendingPromise;
	},
	"add": function add(name, version) {
		abortPendingPromise();
		var data = JSON.stringify({
			"name": name,
			"version": version
		});
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.component.add.replace(/{namespace}/g, "demo"),
			"type": "POST",
			"dataType": "json",
			"data": data
		});
		return pendingPromise;
	},
	"save": function save(name, reqbody) {
		abortPendingPromise();
		var data = JSON.stringify(reqbody);
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.component.save.replace(/{namespace}/g, "demo").replace(/{componentName}/g, name),
			"type": "PUT",
			"dataType": "json",
			"data": data
		});
		return pendingPromise;
	}
};

// history
var historyApi = exports.historyApi = {
	"pipelineHistories": function pipelineHistories() {
		abortPendingPromise();
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.history.pipelineHistories.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo"),
			"type": "GET",
			"dataType": "json",
			"cache": false
		});
		return pendingPromise;
	},
	"pipelineHistory": function pipelineHistory(pipelineName, versionName, pipelineRunSequence) {
		abortPendingPromise();
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.history.pipelineHistory.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{pipelineName}/g, pipelineName).replace(/{version}/g, versionName).replace(/{sequence}/g, pipelineRunSequence),
			"type": "GET",
			"dataType": "json",
			"cache": false
		});
		return pendingPromise;
	},
	"action": function action(pipelineName, versionName, pipelineRunSequence, stageName, actionName) {
		abortPendingPromise();
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.history.action.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{pipelineName}/g, pipelineName).replace(/{version}/g, versionName).replace(/{sequence}/g, pipelineRunSequence).replace(/{stageName}/g, stageName).replace(/{actionName}/g, actionName),
			"type": "GET",
			"dataType": "json",
			"cache": false
		});
		return pendingPromise;
	},
	"relation": function relation(pipelineName, versionName, pipelineRunSequence, sequenceLineId) {
		abortPendingPromise();
		pendingPromise = $.ajax({
			"url": apiUrlConf.host + apiUrlConf.history.relation.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{pipelineName}/g, pipelineName).replace(/{version}/g, versionName).replace(/{sequence}/g, pipelineRunSequence).replace(/{lineId}/g, sequenceLineId),
			"type": "GET",
			"dataType": "json",
			"cache": false
		});
		return pendingPromise;
	}
};