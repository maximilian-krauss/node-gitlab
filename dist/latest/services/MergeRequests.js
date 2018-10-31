"use strict";
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
const infrastructure_1 = require("../infrastructure");
class MergeRequests extends infrastructure_1.BaseService {
    accept(projectId, mergerequestId, options) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}/merge`, options);
    }
    addSpentTime(projectId, mergerequestId, duration) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.post(this, `projects/${pId}/issues/${mId}/add_spent_time`, {
            duration,
        });
    }
    addTimeEstimate(projectId, mergerequestId, duration) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.post(this, `projects/${pId}/issues/${mId}/time_estimate`, {
            duration,
        });
    }
    approve(projectId, mergerequestId, { sha }) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/approve`, { sha });
    }
    approvals(projectId, { mergerequestId } = {}) {
        const pId = encodeURIComponent(projectId);
        const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/${mergeRequest}/approvals`);
    }
    all(_a = {}) {
        var { projectId } = _a, options = __rest(_a, ["projectId"]);
        const url = projectId ? `projects/${encodeURIComponent(projectId)}/merge_requests` : 'merge_requests';
        return infrastructure_1.RequestHelper.get(this, url, options);
    }
    cancelOnPipelineSucess(projectId, mergerequestId) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}/cancel_merge_when_pipeline_succeeds`);
    }
    changes(projectId, mergerequestId) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/changes`);
    }
    closesIssues(projectId, mergerequestId) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/closes_issues`);
    }
    commits(projectId, mergerequestId) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/commits`);
    }
    create(projectId, sourceBranch, targetBranch, title, options) {
        const pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.post(this, `projects/${pId}/merge_requests`, Object.assign({ id: pId, sourceBranch,
            targetBranch,
            title }, options));
    }
    edit(projectId, mergerequestId, options) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.put(this, `projects/${pId}/merge_requests/${mId}`, options);
    }
    editApprovals(projectId, _a) {
        var { mergerequestId } = _a, options = __rest(_a, ["mergerequestId"]);
        const pId = encodeURIComponent(projectId);
        const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}/` : '';
        return infrastructure_1.RequestHelper.post(this, `projects/${pId}/${mergeRequest}approvals`, options);
    }
    editApprovers(projectId, _a) {
        var { mergerequestId } = _a, options = __rest(_a, ["mergerequestId"]);
        const pId = encodeURIComponent(projectId);
        const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}/` : '';
        return infrastructure_1.RequestHelper.put(this, `projects/${pId}/${mergeRequest}approvers`, options);
    }
    pipelines(projectId, { mergerequestId } = {}) {
        const pId = encodeURIComponent(projectId);
        const mergeRequest = mergerequestId ? `merge_requests/${encodeURIComponent(mergerequestId)}` : '';
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/${mergeRequest}/pipelines`);
    }
    remove(projectId, mergerequestId) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}`);
    }
    resetSpentTime(projectId, mergerequestId) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/reset_spent_time`);
    }
    resetTimeEstimate(projectId, mergerequestId) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/reset_time_estimate`);
    }
    show(projectId, mergerequestId) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}`);
    }
    timeStats(projectId, mergerequestId) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/time_stats`);
    }
    version(projectId, mergerequestId, versionId) {
        const [pId, mId, vId] = [projectId, mergerequestId, versionId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/versions/${vId}`);
    }
    versions(projectId, mergerequestId) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/merge_requests/${mId}/versions`);
    }
    unapprove(projectId, mergerequestId) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.post(this, `projects/${pId}/merge_requests/${mId}/approve`);
    }
    unsubscribe(projectId, mergerequestId) {
        const [pId, mId] = [projectId, mergerequestId].map(encodeURIComponent);
        return infrastructure_1.RequestHelper.delete(this, `projects/${pId}/merge_requests/${mId}/unsubscribe`);
    }
}
exports.default = MergeRequests;
