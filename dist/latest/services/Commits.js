"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const infrastructure_1 = require("../infrastructure");
class Commits extends infrastructure_1.BaseService {
    all(projectId, options) {
        const pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/repository/commits`, options);
    }
    cherryPick(projectId, sha, branch) {
        const pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.post(this, `projects/${pId}/repository/commits/${sha}/cherry_pick`, { branch });
    }
    comments(projectId, sha) {
        const pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/comments`);
    }
    create(projectId, branch, message, actions = [], options) {
        const pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.post(this, `projects/${pId}/repository/commits`, Object.assign({ branch, commitMessage: message, actions }, options));
    }
    createComment(projectId, sha, note, options) {
        const pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.post(this, `projects/${pId}/repository/commits/${sha}/comments`, Object.assign({ note }, options));
    }
    diff(projectId, sha) {
        const pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/diff`);
    }
    editStatus(projectId, sha, options) {
        const pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.post(this, `projects/${pId}/statuses/${sha}`, options);
    }
    references(projectId, sha) {
        const pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/refs`);
    }
    show(projectId, sha, options) {
        const pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}`, options);
    }
    status(projectId, sha, options) {
        const pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.get(this, `projects/${pId}/repository/commits/${sha}/statuses`, options);
    }
}
exports.default = Commits;