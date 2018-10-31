"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
const humps_1 = __importDefault(require("humps"));
const parse_link_header_1 = __importDefault(require("parse-link-header"));
const qs_1 = __importDefault(require("qs"));
const url_join_1 = __importDefault(require("url-join"));
const request_1 = __importDefault(require("request"));
function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
exports.wait = wait;
function defaultRequest({ url, useXMLHttpRequest, rejectUnauthorized }, endpoint, { headers, body, qs, formData, resolveWithFullResponse = false }) {
    const params = {
        url: url_join_1.default(url, endpoint),
        headers,
        json: true,
    };
    if (body)
        params.body = humps_1.default.decamelizeKeys(body);
    if (qs) {
        if (useXMLHttpRequest) {
            // The xhr package doesn't have a way of passing in a qs object until v3
            params.url = url_join_1.default(params.url, `?${qs_1.default.stringify(humps_1.default.decamelizeKeys(qs), { arrayFormat: 'brackets' })}`);
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
function getStream(service, endpoint, options = {}) {
    if (service.useXMLHttpRequest) {
        throw new Error(`Cannot use streaming functionality with XMLHttpRequest. Please instantiate without this
      option to use streaming`);
    }
    const requestOptions = defaultRequest(service, endpoint, {
        headers: service.headers,
        qs: options,
    });
    return request_1.default.get(requestOptions);
}
function getPaginated(service, endpoint, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { showPagination, maxPages } = options, queryOptions = __rest(options, ["showPagination", "maxPages"]);
        const requestOptions = defaultRequest(service, endpoint, {
            headers: service.headers,
            qs: queryOptions,
            resolveWithFullResponse: true,
        });
        const response = yield service.requester.get(requestOptions);
        const links = parse_link_header_1.default(response.headers.link) || {};
        const page = response.headers['x-page'];
        const underMaxPageLimit = maxPages ? page < maxPages : true;
        let more = [];
        let data;
        // If not looking for a singular page and still under the max pages limit
        // AND their is a next page, paginate
        if (!queryOptions.page && underMaxPageLimit && links.next) {
            more = yield getPaginated(service, links.next.url.replace(service.url, ''), options);
            data = [...response.body, ...more];
        }
        else {
            data = response.body;
        }
        if (queryOptions.page && showPagination) {
            return {
                data,
                pagination: {
                    total: response.headers['x-total'],
                    next: response.headers['x-next-page'] || null,
                    current: response.headers['x-page'] || null,
                    previous: response.headers['x-prev-page'] || null,
                    perPage: response.headers['x-per-page'],
                    totalPages: response.headers['x-total-pages'],
                },
            };
        }
        return data;
    });
}
class RequestHelper {
    static request(type, service, endpoint, options = {}, form = false, stream = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                switch (type) {
                    case 'get':
                        if (stream)
                            return yield getStream(service, endpoint, options);
                        return yield getPaginated(service, endpoint, options);
                    case 'post': {
                        const requestOptions = defaultRequest(service, endpoint, {
                            headers: service.headers,
                            [form ? 'formData' : 'body']: options,
                        });
                        return yield service.requester.post(requestOptions);
                    }
                    case 'put': {
                        const requestOptions = defaultRequest(service, endpoint, {
                            headers: service.headers,
                            body: options,
                        });
                        return yield service.requester.put(requestOptions);
                    }
                    case 'delete': {
                        const requestOptions = defaultRequest(service, endpoint, {
                            headers: service.headers,
                            qs: options,
                        });
                        return yield service.requester.delete(requestOptions);
                    }
                    default:
                        throw new Error(`Unknown request type ${type}`);
                }
            }
            catch (err) {
                yield RequestHelper.handleRequestError(err);
                return RequestHelper.request(type, service, endpoint, options, form, stream);
            }
        });
    }
    static handleRequestError(err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!err.response ||
                !err.response.headers ||
                !err.response.headers['retry-after'] ||
                parseInt(err.statusCode, 10) !== 429) {
                throw err;
            }
            const sleepTime = parseInt(err.response.headers['retry-after'], 10);
            if (!sleepTime)
                throw err;
            return wait(sleepTime * 1000);
        });
    }
    static get(service, endpoint, options = {}, { stream = false } = {}) {
        return RequestHelper.request('get', service, endpoint, options, false, stream);
    }
    static post(service, endpoint, options = {}, form = false) {
        return RequestHelper.request('post', service, endpoint, options, form);
    }
    static put(service, endpoint, options = {}) {
        return RequestHelper.request('put', service, endpoint, options);
    }
    static delete(service, endpoint, options = {}) {
        return RequestHelper.request('delete', service, endpoint, options);
    }
}
exports.default = RequestHelper;
