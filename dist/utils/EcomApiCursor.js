"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = __importStar(require("querystring"));
var EcomApiCursor = /** @class */ (function () {
    function EcomApiCursor(baseUrl, axiosClient, resource, filters) {
        if (filters === void 0) { filters = {}; }
        this.baseUrl = baseUrl;
        this.axiosClient = axiosClient;
        this.resource = resource;
        this.filters = filters;
    }
    EcomApiCursor.prototype.getCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var countResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.recordCount) {
                            return [2 /*return*/, this.recordCount];
                        }
                        return [4 /*yield*/, this.axiosClient.get("".concat(this.baseUrl, "/count.json?").concat(querystring.stringify(this.filters)))];
                    case 1:
                        countResponse = _a.sent();
                        this.recordCount = countResponse.data.count;
                        return [2 /*return*/, this.recordCount];
                }
            });
        });
    };
    EcomApiCursor.prototype.toArray = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var elements, _b, _c, item, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        elements = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this.items());
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        elements.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, elements];
                }
            });
        });
    };
    EcomApiCursor.prototype.items = function () {
        return __asyncGenerator(this, arguments, function items_1() {
            var offset, limit, count, qs_1, url, apiResponse, dataSet, dataSet_1, dataSet_1_1, element, e_2_1;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        offset = 0;
                        limit = 250;
                        return [4 /*yield*/, __await(this.getCount())];
                    case 1:
                        count = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(offset < count)) return [3 /*break*/, 14];
                        qs_1 = querystring.stringify(__assign(__assign({}, this.filters), { offset: offset, limit: limit }));
                        url = "".concat(this.baseUrl, ".json?").concat(qs_1);
                        return [4 /*yield*/, __await(this.axiosClient.get(url))];
                    case 3:
                        apiResponse = _b.sent();
                        dataSet = apiResponse.data[this.resource];
                        if (!(dataSet === undefined || !Array.isArray(dataSet))) return [3 /*break*/, 5];
                        console.error('Data Set Empty');
                        return [4 /*yield*/, __await('done')];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5:
                        _b.trys.push([5, 11, 12, 13]);
                        dataSet_1 = (e_2 = void 0, __values(dataSet)), dataSet_1_1 = dataSet_1.next();
                        _b.label = 6;
                    case 6:
                        if (!!dataSet_1_1.done) return [3 /*break*/, 10];
                        element = dataSet_1_1.value;
                        return [4 /*yield*/, __await(element)];
                    case 7: return [4 /*yield*/, _b.sent()];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9:
                        dataSet_1_1 = dataSet_1.next();
                        return [3 /*break*/, 6];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (dataSet_1_1 && !dataSet_1_1.done && (_a = dataSet_1.return)) _a.call(dataSet_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 13:
                        offset += dataSet.length;
                        return [3 /*break*/, 2];
                    case 14: return [4 /*yield*/, __await('done')];
                    case 15: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return EcomApiCursor;
}());
exports.default = EcomApiCursor;
