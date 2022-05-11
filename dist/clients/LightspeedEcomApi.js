"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var EcomApiCursor_1 = __importDefault(require("../utils/EcomApiCursor"));
function getClusterUrl(clusterId) {
    switch (clusterId) {
        case 'EU1':
        case 'eu1':
            return 'api.webshopapp.com';
        case 'us1':
        case 'US1':
            return 'api.shoplightspeed.com';
        default:
            throw new Error("clusterID ".concat(clusterId, " is not supported. Must be 'eu1' or 'us1'"));
    }
}
function buildBaseUrl(clusterId, language) {
    return "https://".concat(getClusterUrl(clusterId), "/").concat(language, "/");
}
var LightspeedEcomApi = /** @class */ (function () {
    function LightspeedEcomApi(opts) {
        var apiKey = opts.apiKey, apiSecret = opts.apiSecret, clusterId = opts.clusterId, language = opts.language;
        LightspeedEcomApi.__validate(opts);
        this.axiosClient = axios_1.default.create({
            baseURL: buildBaseUrl(clusterId, language || 'us'),
            responseType: 'json',
            withCredentials: false,
            auth: {
                username: apiKey,
                password: apiSecret,
            },
        });
    }
    LightspeedEcomApi.__validate = function (opts) {
        var e_1, _a;
        var missingField = null;
        var requiredFields = ['apiKey', 'apiSecret', 'clusterId'];
        try {
            for (var requiredFields_1 = __values(requiredFields), requiredFields_1_1 = requiredFields_1.next(); !requiredFields_1_1.done; requiredFields_1_1 = requiredFields_1.next()) {
                var requiredField = requiredFields_1_1.value;
                if (!opts[requiredField]) {
                    missingField = requiredField;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (requiredFields_1_1 && !requiredFields_1_1.done && (_a = requiredFields_1.return)) _a.call(requiredFields_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (missingField) {
            throw new Error("Param ".concat(missingField, " is required"));
        }
    };
    LightspeedEcomApi.prototype.getAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axiosClient.get('account.json')];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    LightspeedEcomApi.prototype.getOrders = function () {
        return new EcomApiCursor_1.default('orders', this.axiosClient, 'orders');
    };
    LightspeedEcomApi.prototype.getOrderProducts = function (orderId) {
        return new EcomApiCursor_1.default("orders/".concat(orderId, "/products"), this.axiosClient, 'orderProducts');
    };
    LightspeedEcomApi.prototype.getProductVariants = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axiosClient.get("variants.json?product=".concat(productId))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.variants];
                }
            });
        });
    };
    LightspeedEcomApi.prototype.getVariant = function (variantId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axiosClient.get("variants/".concat(variantId, ".json"))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.variant];
                }
            });
        });
    };
    return LightspeedEcomApi;
}());
exports.default = LightspeedEcomApi;
