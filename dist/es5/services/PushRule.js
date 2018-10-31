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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var PushRule = /** @class */ (function (_super) {
    __extends(PushRule, _super);
    function PushRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushRule.prototype.create = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.post(this, "projects/" + pId + "/push_rule", options);
    };
    PushRule.prototype.edit = function (projectId, _a) {
        if (_a === void 0) { _a = {}; }
        var _b = _a.upsert, upsert = _b === void 0 ? false : _b, options = __rest(_a, ["upsert"]);
        return __awaiter(this, void 0, void 0, function () {
            var pId, pushRule;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        pId = encodeURIComponent(projectId);
                        if (!upsert) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.show(projectId)];
                    case 1:
                        pushRule = _c.sent();
                        if (!pushRule)
                            return [2 /*return*/, this.create(projectId, options)];
                        _c.label = 2;
                    case 2: return [2 /*return*/, infrastructure_1.RequestHelper.put(this, "projects/" + pId + "/push_rule", options)];
                }
            });
        });
    };
    PushRule.prototype.remove = function (projectId) {
        var pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.delete(this, "projects/" + pId + "/push_rule");
    };
    PushRule.prototype.show = function (projectId) {
        var pId = encodeURIComponent(projectId);
        return infrastructure_1.RequestHelper.get(this, "projects/" + pId + "/push_rule");
    };
    return PushRule;
}(infrastructure_1.BaseService));
exports.default = PushRule;