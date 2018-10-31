"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var infrastructure_1 = require("../infrastructure");
var MergeRequests = /** @class */ (function (_super) {
    __extends(MergeRequests, _super);
    function MergeRequests() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MergeRequests.prototype.accept = function (projectId, mergerequestId, options) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.put(this, "projects/" + pId + "/merge_requests/" + mId + "/merge", options);
    };
    MergeRequests.prototype.addSpentTime = function (projectId, mergerequestId, duration) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.post(this, "projects/" + pId + "/issues/" + mId + "/add_spent_time", {
            duration: duration,
        });
    };
    MergeRequests.prototype.addTimeEstimate = function (projectId, mergerequestId, duration) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.post(this, "projects/" + pId + "/issues/" + mId + "/time_estimate", {
            duration: duration,
        });
    };
    MergeRequests.prototype.approve = function (projectId, mergerequestId, _a) {
        var sha = _a.sha;
        var _b = [projectId, mergerequestId].map(encodeURIComponent), pId = _b[0], mId = _b[1];
        return infrastructure_1.RequestHelper.post(this, "projects/" + pId + "/merge_requests/" + mId + "/approve", { sha: sha });
    };
    MergeRequests.prototype.approvals = function (projectId, _a) {
        var mergerequestId = (_a === void 0 ? {} : _a).mergerequestId;
        var pId = encodeURIComponent(projectId);
        var mergeRequest = mergerequestId ? "merge_requests/" + encodeURIComponent(mergerequestId) : '';
        return infrastructure_1.RequestHelper.get(this, "projects/" + pId + "/" + mergeRequest + "/approvals");
    };
    MergeRequests.prototype.all = function (_a) {
        if (_a === void 0) { _a = {}; }
        var projectId = _a.projectId, options = __rest(_a, ["projectId"]);
        var url = projectId ? "projects/" + encodeURIComponent(projectId) + "/merge_requests" : 'merge_requests';
        return infrastructure_1.RequestHelper.get(this, url, options);
    };
    MergeRequests.prototype.cancelOnPipelineSucess = function (projectId, mergerequestId) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.put(this, "projects/" + pId + "/merge_requests/" + mId + "/cancel_merge_when_pipeline_succeeds");
    };
    MergeRequests.prototype.changes = function (projectId, mergerequestId) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.get(this, "projects/" + pId + "/merge_requests/" + mId + "/changes");
    };
    MergeRequests.prototype.closesIssues = function (projectId, mergerequestId) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.get(this, "projects/" + pId + "/merge_requests/" + mId + "/closes_issues");
    };
    MergeRequests.prototype.commits = function (projectId, mergerequestId) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.get(this, "projects/" + pId + "/merge_requests/" + mId + "/commits");
    };
    MergeRequests.prototype.create = function (projectId, sourceBranch, targetBranch, title, options) {
        var pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.post(this, "projects/" + pId + "/merge_requests", __assign({ id: pId, sourceBranch: sourceBranch,
            targetBranch: targetBranch,
            title: title }, options));
    };
    MergeRequests.prototype.edit = function (projectId, mergerequestId, options) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.put(this, "projects/" + pId + "/merge_requests/" + mId, options);
    };
    MergeRequests.prototype.editApprovals = function (projectId, _a) {
        var mergerequestId = _a.mergerequestId, options = __rest(_a, ["mergerequestId"]);
        var pId = encodeURIComponent(projectId);
        var mergeRequest = mergerequestId ? "merge_requests/" + encodeURIComponent(mergerequestId) + "/" : '';
        return infrastructure_1.RequestHelper.post(this, "projects/" + pId + "/" + mergeRequest + "approvals", options);
    };
    MergeRequests.prototype.editApprovers = function (projectId, _a) {
        var mergerequestId = _a.mergerequestId, options = __rest(_a, ["mergerequestId"]);
        var pId = encodeURIComponent(projectId);
        var mergeRequest = mergerequestId ? "merge_requests/" + encodeURIComponent(mergerequestId) + "/" : '';
        return infrastructure_1.RequestHelper.put(this, "projects/" + pId + "/" + mergeRequest + "approvers", options);
    };
    MergeRequests.prototype.pipelines = function (projectId, _a) {
        var mergerequestId = (_a === void 0 ? {} : _a).mergerequestId;
        var pId = encodeURIComponent(projectId);
        var mergeRequest = mergerequestId ? "merge_requests/" + encodeURIComponent(mergerequestId) : '';
        return infrastructure_1.RequestHelper.get(this, "projects/" + pId + "/" + mergeRequest + "/pipelines");
    };
    MergeRequests.prototype.remove = function (projectId, mergerequestId) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.delete(this, "projects/" + pId + "/merge_requests/" + mId);
    };
    MergeRequests.prototype.resetSpentTime = function (projectId, mergerequestId) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.post(this, "projects/" + pId + "/merge_requests/" + mId + "/reset_spent_time");
    };
    MergeRequests.prototype.resetTimeEstimate = function (projectId, mergerequestId) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.post(this, "projects/" + pId + "/merge_requests/" + mId + "/reset_time_estimate");
    };
    MergeRequests.prototype.show = function (projectId, mergerequestId) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.get(this, "projects/" + pId + "/merge_requests/" + mId);
    };
    MergeRequests.prototype.timeStats = function (projectId, mergerequestId) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.get(this, "projects/" + pId + "/merge_requests/" + mId + "/time_stats");
    };
    MergeRequests.prototype.version = function (projectId, mergerequestId, versionId) {
        var _a = [projectId, mergerequestId, versionId].map(encodeURIComponent), pId = _a[0], mId = _a[1], vId = _a[2];
        return infrastructure_1.RequestHelper.get(this, "projects/" + pId + "/merge_requests/" + mId + "/versions/" + vId);
    };
    MergeRequests.prototype.versions = function (projectId, mergerequestId) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.get(this, "projects/" + pId + "/merge_requests/" + mId + "/versions");
    };
    MergeRequests.prototype.unapprove = function (projectId, mergerequestId) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.post(this, "projects/" + pId + "/merge_requests/" + mId + "/approve");
    };
    MergeRequests.prototype.unsubscribe = function (projectId, mergerequestId) {
        var _a = [projectId, mergerequestId].map(encodeURIComponent), pId = _a[0], mId = _a[1];
        return infrastructure_1.RequestHelper.delete(this, "projects/" + pId + "/merge_requests/" + mId + "/unsubscribe");
    };
    return MergeRequests;
}(infrastructure_1.BaseService));
exports.default = MergeRequests;
