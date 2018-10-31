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
Object.defineProperty(exports, "__esModule", { value: true });
var infrastructure_1 = require("../infrastructure");
var LEVELS = {
    DISABLED: 'disabled',
    PARTICIPATING: 'participating',
    WATCH: 'watch',
    GLOBAL: 'global',
    MENTION: 'mention',
    CUSTOM: 'custom',
};
var EVENTS = {
    NEW_NOTE: 'new_note',
    NEW_ISSUE: 'new_issue',
    REOPEM_ISSUE: 'reopen_issue',
    CLOSE_ISSUE: 'close_issue',
    REASSIGN_ISSUE: 'reassign_issue',
    NEW_MERGE_REQUESTS: 'new_merge_request',
    PUSH_TO_MERGE_REQUEST: 'push_to_merge_request',
    REOPEN_MERGE_REQUESTS: 'reopen_merge_request',
    CLOSE_MERGE_REQUEST: 'close_merge_request',
    REASSIGN_MERGE_REQUEST: 'reassign_merge_request',
    MERGE_MERGE_REQUEST: 'merge_merge_request',
    FAILED_PIPELINE: 'failed_pipeline',
    SUCCESS_PIPELINE: 'success_pipeline',
};
var NotificationSettings = /** @class */ (function (_super) {
    __extends(NotificationSettings, _super);
    function NotificationSettings(baseParams) {
        var _this = _super.call(this, baseParams) || this;
        _this.LEVELS = LEVELS;
        _this.EVENTS = EVENTS;
        return _this;
    }
    NotificationSettings.prototype.all = function (_a) {
        var _b = _a === void 0 ? {} : _a, projectId = _b.projectId, groupId = _b.groupId;
        var url = '';
        if (projectId) {
            url += "projects/" + encodeURIComponent(projectId) + "/";
        }
        else if (groupId) {
            url += "groups/" + encodeURIComponent(groupId) + "/";
        }
        return infrastructure_1.RequestHelper.get(this, url + "notification_settings");
    };
    NotificationSettings.prototype.edit = function (options, _a) {
        var _b = _a === void 0 ? {} : _a, projectId = _b.projectId, groupId = _b.groupId;
        var url = '';
        if (projectId) {
            url += "projects/" + encodeURIComponent(projectId) + "/";
        }
        else if (groupId) {
            url += "groups/" + encodeURIComponent(groupId) + "/";
        }
        return infrastructure_1.RequestHelper.put(this, url + "notification_settings", options);
    };
    return NotificationSettings;
}(infrastructure_1.BaseService));
exports.default = NotificationSettings;
