"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var humps_1 = __importDefault(require("humps"));
var parse_link_header_1 = __importDefault(require("parse-link-header"));
var qs_1 = __importDefault(require("qs"));
var url_join_1 = __importDefault(require("url-join"));
var request_1 = __importDefault(require("request"));
function wait(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
exports.wait = wait;
function defaultRequest(_a, endpoint, _b) {
    var url = _a.url, useXMLHttpRequest = _a.useXMLHttpRequest, rejectUnauthorized = _a.rejectUnauthorized;
    var headers = _b.headers, body = _b.body, qs = _b.qs, formData = _b.formData, _c = _b.resolveWithFullResponse, resolveWithFullResponse = _c === void 0 ? false : _c;
    var params = {
        url: url_join_1.default(url, endpoint),
        headers: headers,
        json: true,
    };
    if (body)
        params.body = humps_1.default.decamelizeKeys(body);
    if (qs) {
        if (useXMLHttpRequest) {
            // The xhr package doesn't have a way of passing in a qs object until v3
            params.url = url_join_1.default(params.url, "?" + qs_1.default.stringify(humps_1.default.decamelizeKeys(qs), { arrayFormat: 'brackets' }));
        }
        else {
            params.qs = humps_1.default.decamelizeKeys(qs);
            params.qsStringifyOptions = { arrayFormat: 'brackets' };
        }
    }
    if (formData)
        params.formData = formData;
    params.resolveWithFullResponse = resolveWithFullResponse;
    params.rejectUnauthorized = rejectUnauthorized;
    return params;
}
function getStream(service, endpoint, options) {
    if (options === void 0) { options = {}; }
    if (service.useXMLHttpRequest) {
        throw new Error("Cannot use streaming functionality with XMLHttpRequest. Please instantiate without this\n      option to use streaming");
    }
    var requestOptions = defaultRequest(service, endpoint, {
        headers: service.headers,
        qs: options,
    });
    return request_1.default.get(requestOptions);
}
function getPaginated(service, endpoint, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var showPagination, maxPages, queryOptions, requestOptions, response, links, page, underMaxPageLimit, more, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    showPagination = options.showPagination, maxPages = options.maxPages, queryOptions = __rest(options, ["showPagination", "maxPages"]);
                    requestOptions = defaultRequest(service, endpoint, {
                        headers: service.headers,
                        qs: queryOptions,
                        resolveWithFullResponse: true,
                    });
                    return [4 /*yield*/, service.requester.get(requestOptions)];
                case 1:
                    response = _a.sent();
                    links = parse_link_header_1.default(response.headers.link) || {};
                    page = response.headers['x-page'];
                    underMaxPageLimit = maxPages ? page < maxPages : true;
                    more = [];
                    if (!(!queryOptions.page && underMaxPageLimit && links.next)) return [3 /*break*/, 3];
                    return [4 /*yield*/, getPaginated(service, links.next.url.replace(service.url, ''), options)];
                case 2:
                    more = _a.sent();
                    data = response.body.concat(more);
                    return [3 /*break*/, 4];
                case 3:
                    data = response.body;
                    _a.label = 4;
                case 4:
                    if (queryOptions.page && showPagination) {
                        return [2 /*return*/, {
                                data: data,
                                pagination: {
                                    total: response.headers['x-total'],
                                    next: response.headers['x-next-page'] || null,
                                    current: response.headers['x-page'] || null,
                                    previous: response.headers['x-prev-page'] || null,
                                    perPage: response.headers['x-per-page'],
                                    totalPages: response.headers['x-total-pages'],
                                },
                            }];
                    }
                    return [2 /*return*/, data];
            }
        });
    });
}
var RequestHelper = /** @class */ (function () {
    function RequestHelper() {
    }
    RequestHelper.request = function (type, service, endpoint, options, form, stream) {
        if (options === void 0) { options = {}; }
        if (form === void 0) { form = false; }
        if (stream === void 0) { stream = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, requestOptions, requestOptions, requestOptions, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 13, , 15]);
                        _b = type;
                        switch (_b) {
                            case 'get': return [3 /*break*/, 1];
                            case 'post': return [3 /*break*/, 5];
                            case 'put': return [3 /*break*/, 7];
                            case 'delete': return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 11];
                    case 1:
                        if (!stream) return [3 /*break*/, 3];
                        return [4 /*yield*/, getStream(service, endpoint, options)];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [4 /*yield*/, getPaginated(service, endpoint, options)];
                    case 4: return [2 /*return*/, _c.sent()];
                    case 5:
                        requestOptions = defaultRequest(service, endpoint, (_a = {
                                headers: service.headers
                            },
                            _a[form ? 'formData' : 'body'] = options,
                            _a));
                        return [4 /*yield*/, service.requester.post(requestOptions)];
                    case 6: return [2 /*return*/, _c.sent()];
                    case 7:
                        requestOptions = defaultRequest(service, endpoint, {
                            headers: service.headers,
                            body: options,
                        });
                        return [4 /*yield*/, service.requester.put(requestOptions)];
                    case 8: return [2 /*return*/, _c.sent()];
                    case 9:
                        requestOptions = defaultRequest(service, endpoint, {
                            headers: service.headers,
                            qs: options,
                        });
                        return [4 /*yield*/, service.requester.delete(requestOptions)];
                    case 10: return [2 /*return*/, _c.sent()];
                    case 11: throw new Error("Unknown request type " + type);
                    case 12: return [3 /*break*/, 15];
                    case 13:
                        err_1 = _c.sent();
                        return [4 /*yield*/, RequestHelper.handleRequestError(err_1)];
                    case 14:
                        _c.sent();
                        return [2 /*return*/, RequestHelper.request(type, service, endpoint, options, form, stream)];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    RequestHelper.handleRequestError = function (err) {
        return __awaiter(this, void 0, void 0, function () {
            var sleepTime;
            return __generator(this, function (_a) {
                if (!err.response ||
                    !err.response.headers ||
                    !err.response.headers['retry-after'] ||
                    parseInt(err.statusCode, 10) !== 429) {
                    throw err;
                }
                sleepTime = parseInt(err.response.headers['retry-after'], 10);
                if (!sleepTime)
                    throw err;
                return [2 /*return*/, wait(sleepTime * 1000)];
            });
        });
    };
    RequestHelper.get = function (service, endpoint, options, _a) {
        if (options === void 0) { options = {}; }
        var _b = (_a === void 0 ? {} : _a).stream, stream = _b === void 0 ? false : _b;
        return RequestHelper.request('get', service, endpoint, options, false, stream);
    };
    RequestHelper.post = function (service, endpoint, options, form) {
        if (options === void 0) { options = {}; }
        if (form === void 0) { form = false; }
        return RequestHelper.request('post', service, endpoint, options, form);
    };
    RequestHelper.put = function (service, endpoint, options) {
        if (options === void 0) { options = {}; }
        return RequestHelper.request('put', service, endpoint, options);
    };
    RequestHelper.delete = function (service, endpoint, options) {
        if (options === void 0) { options = {}; }
        return RequestHelper.request('delete', service, endpoint, options);
    };
    return RequestHelper;
}());
exports.default = RequestHelper;
