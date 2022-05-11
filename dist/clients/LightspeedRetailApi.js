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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RetailApiCursor_1 = __importDefault(require("../utils/RetailApiCursor"));
var axios = require('axios');
var querystring = require('querystring');
var FormData = require('form-data');
var sleep = require('../utils/timeUtils').sleep;
var toLSQueryParam = function (searchParam) {
    if (typeof searchParam === 'string') {
        return searchParam;
    }
    else if (searchParam[0] === '=') {
        return searchParam[1];
    }
    else {
        return searchParam.join(',');
    }
};
var searchParamsToQueryParams = function (searchParams) {
    return Object.entries(searchParams).reduce(function (queryParams, _a) {
        var _b;
        var _c = __read(_a, 2), param = _c[0], searchParam = _c[1];
        return (__assign((_b = {}, _b[param] = toLSQueryParam(searchParam), _b), queryParams));
    }, {});
};
var getRequiredUnits = function (operation) {
    switch (operation) {
        case 'GET':
            return 1;
        case 'POST':
        case 'PUT':
            return 10;
        default:
            return 10;
    }
};
var buildAuthFormData = function (clientId, clientSecret, token) {
    var form = new FormData();
    form.append('client_id', clientId);
    form.append('client_secret', clientSecret);
    form.append('refresh_token', token);
    form.append('grant_type', 'refresh_token');
    return form;
};
var LightspeedRetailApi = /** @class */ (function () {
    function LightspeedRetailApi(opts) {
        var clientId = opts.clientId, clientSecret = opts.clientSecret, refreshToken = opts.refreshToken;
        this.lastResponse = null;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.refreshToken = refreshToken;
    }
    LightspeedRetailApi.prototype.handleResponseError = function (msg, err) {
        console.error("".concat(msg, " - ").concat(err));
        throw err;
    };
    LightspeedRetailApi.prototype.setLastResponse = function (response) {
        this.lastResponse = response;
    };
    LightspeedRetailApi.prototype.handleRateLimit = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var method, requiredUnits, rateHeader, _a, usedUnits, bucketSize, availableUnits, dripRate, unitsToWait, delay;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.lastResponse)
                            return [2 /*return*/, null];
                        method = options.method;
                        requiredUnits = getRequiredUnits(method);
                        rateHeader = this.lastResponse.headers['x-ls-api-bucket-level'];
                        if (!rateHeader)
                            return [2 /*return*/, null];
                        _a = __read(rateHeader.split('/'), 2), usedUnits = _a[0], bucketSize = _a[1];
                        availableUnits = bucketSize - usedUnits;
                        if (requiredUnits <= availableUnits)
                            return [2 /*return*/, 0];
                        dripRate = this.lastResponse.headers['x-ls-api-drip-rate'];
                        unitsToWait = requiredUnits - availableUnits;
                        delay = Math.ceil((unitsToWait / dripRate) * 1000);
                        return [4 /*yield*/, sleep(delay)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, unitsToWait];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.performRequest = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_1, axiosResponseError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Wait if needed
                    return [4 /*yield*/, this.handleRateLimit(options)];
                    case 1:
                        // Wait if needed
                        _a.sent();
                        return [4 /*yield*/, this.getToken()];
                    case 2:
                        token = (_a.sent()).access_token;
                        if (!token) {
                            throw new Error('Error fetching token');
                        }
                        options.headers = { Authorization: "Bearer ".concat(token) };
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, axios(options)];
                    case 4:
                        response = _a.sent();
                        // Keep last response
                        this.lastResponse = response;
                        return [2 /*return*/, response];
                    case 5:
                        error_1 = _a.sent();
                        axiosResponseError = error_1;
                        console.error('Failed request statusText:', axiosResponseError.response.statusText);
                        console.error('Failed data:', axiosResponseError.response.data);
                        throw axiosResponseError;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, data, options, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://cloud.merchantos.com/oauth/access_token.php';
                        data = buildAuthFormData(this.clientId, this.clientSecret, this.refreshToken);
                        options = {
                            method: 'POST',
                            url: url,
                            data: data,
                            headers: {
                                // @ts-ignore
                                'content-type': "multipart/form-data; boundary=".concat(data._boundary),
                            },
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET TOKEN', err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.postItem = function (accountId, item) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Item.json");
                        options = {
                            method: 'POST',
                            url: url,
                            data: item,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('POST ITEM', err_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.postCustomer = function (accountId, customer) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Customer.json");
                        options = {
                            method: 'POST',
                            url: url,
                            data: customer,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data.Customer];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('POST CUSTOMER', err_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.postCustomerType = function (accountId, customerType) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/CustomerType.json");
                        options = {
                            method: 'POST',
                            url: url,
                            data: customerType,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('POST CUSTOMER TYPE', err_4)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.postItemAttributeSet = function (accountId, attributeSet) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/ItemAttributeSet.json");
                        options = {
                            method: 'POST',
                            url: url,
                            data: attributeSet,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('POST ITEM ATTRIBUTE SET', err_5)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.postItemMatrix = function (accountId, itemMatrix) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/ItemMatrix.json");
                        options = {
                            method: 'POST',
                            url: url,
                            data: itemMatrix,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_6 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('POST ITEM MATRIX', err_6)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.postItemCustomField = function (accountId, customField) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Item/CustomField.json");
                        options = {
                            method: 'POST',
                            url: url,
                            data: customField,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_7 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('POST ITEM CUSTOM FIELD', err_7)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.postPaymentMethod = function (accountId, paymentMethod) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/PaymentType.json");
                        options = {
                            method: 'POST',
                            url: url,
                            data: paymentMethod,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_8 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('POST PAYMENT METHOD', err_8)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.postCustomerCustomField = function (accountId, customField) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Customer/CustomField.json");
                        options = {
                            method: 'POST',
                            url: url,
                            data: customField,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_9 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('POST CUSTOMER CUSTOM FIELD', err_9)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.postSale = function (accountId, sale) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Sale.json");
                        options = {
                            method: 'POST',
                            url: url,
                            data: sale,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data.Sale];
                    case 3:
                        err_10 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('POST SALE', err_10)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.putItem = function (accountId, item, ID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Item/").concat(ID, ".json");
                        options = {
                            method: 'PUT',
                            url: url,
                            data: item,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_11 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('PUT ITEM', err_11)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.putItemMatrix = function (accountId, matrix, ID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/ItemMatrix/").concat(ID, ".json");
                        options = {
                            method: 'PUT',
                            url: url,
                            data: matrix,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_12 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('PUT ITEM MATRIX', err_12)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.putCustomer = function (accountId, customer, ID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Customer/").concat(ID, ".json");
                        options = {
                            method: 'PUT',
                            url: url,
                            data: customer,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_13 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('PUT CUSTOMER', err_13)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://api.merchantos.com/API/Account.json';
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_14 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET ACCOUNT', err_14)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getTaxCategory = function (accountId, taxCategoryId) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.merchantos.com/API/V3/Account/".concat(accountId, "/TaxCategory/").concat(taxCategoryId, ".json");
                        return [4 /*yield*/, this.performRequest({ method: 'GET', url: url })];
                    case 1: return [2 /*return*/, (_a.sent()).data.TaxCategory];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getCompletedSalesByPeriod = function (accountId, start, end) {
        var url = null;
        if (end == undefined) {
            url = "https://api.merchantos.com/API/Account/".concat(accountId, "/Sale.json?completed==true&completeTime=").concat(encodeURIComponent(">,".concat(start)));
        }
        else {
            url = "https://api.merchantos.com/API/Account/".concat(accountId, "/Sale.json?completed==true&completeTime=").concat(encodeURIComponent("><,".concat(start, ",").concat(end)));
        }
        return new RetailApiCursor_1.default(url, 'Sale', this, {
            load_relations: '["TaxCategory","SaleLines","SaleLines.Item","SalePayments","SalePayments.PaymentType","Customer","Discount","Customer.Contact"]',
        });
    };
    LightspeedRetailApi.prototype.getSales = function (accountId) {
        var url = "https://api.merchantos.com/API/Account/".concat(accountId, "/Sale.json");
        return new RetailApiCursor_1.default(url, 'Sale', this, {
            load_relations: '["TaxCategory","SaleLines","SaleLines.Item","SalePayments","SalePayments.PaymentType","Customer","Discount","Customer.Contact"]',
        });
    };
    LightspeedRetailApi.prototype.getSale = function (accountId, saleId) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString, url, options, response, err_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryString = {
                            load_relations: JSON.stringify([
                                'TaxCategory',
                                'SaleLines',
                                'SalePayments',
                                'SalePayments.PaymentType',
                            ]),
                        };
                        url = "https://api.merchantos.com/API/Account/".concat(accountId, "/Sale/").concat(saleId, ".json?").concat(querystring.stringify(queryString));
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_15 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET SALE PAYMENT', err_15)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getSalePaymentByID = function (accountId, salePaymentID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/SalePayment/").concat(salePaymentID, ".json");
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_16 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET SALE PAYMENT', err_16)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getSalePaymentBySaleID = function (accountId, saleID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/SalePayment.json?saleID=").concat(saleID);
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_17 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET SALE PAYMENT', err_17)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getSaleLineBySaleID = function (accountId, saleID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/SaleLine.json?saleID=").concat(saleID);
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_18 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET SALE LINE', err_18)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getSaleLineByID = function (accountId, saleLineID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/SaleLine/").concat(saleLineID, ".json");
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_19 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET SALE LINE', err_19)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getPaymentTypeByID = function (accountId, paymentTypeID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/PaymentType/").concat(paymentTypeID, ".json");
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_20 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET PAYMENT TYPE', err_20)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getShopByID = function (accountId, shopID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Shop/").concat(shopID, ".json");
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_21 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET SHOP', err_21)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getDiscountByID = function (accountId, discountID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Discount/").concat(discountID, ".json");
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_22 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET DISCOUNT', err_22)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getCustomerByID = function (accountId, customerID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Customer/").concat(customerID, ".json?load_relations=[\"CustomFieldValues\", \"CustomFieldValues.value\"]");
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_23 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET CUSTOMER', err_23)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getContactByID = function (accountId, contactID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Contact/").concat(contactID, ".json");
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_24 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET CONTACT', err_24)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getItemMatrixByID = function (accountId, itemMatrixID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/ItemMatrix/").concat(itemMatrixID, ".json");
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_25 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET ITEM MATRIX', err_25)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getItemsByMatrixID = function (accountId, itemMatrixID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Item.json?itemMatrixID=").concat(itemMatrixID);
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_26 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET ITEM', err_26)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getItemByCustomSku = function (accountId, customSku) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.lightspeedapp.com/API/Account/".concat(accountId, "/Item.json?customSku=").concat(customSku);
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        err_27 = _a.sent();
                        return [2 /*return*/, this.handleResponseError('GET ACCOUNT', err_27)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getItemById = function (accountId, itemId, loadRelations) {
        if (loadRelations === void 0) { loadRelations = [
            'ItemShops',
            'Images',
            'Manufacturer',
            'CustomFieldValues',
            'CustomFieldValues.value',
        ]; }
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, err_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.merchantos.com/API/Account/".concat(accountId, "/Item/").concat(itemId, ".json?load_relations=").concat(querystring.escape(JSON.stringify(loadRelations)));
                        options = {
                            method: 'GET',
                            url: url,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data.Item];
                    case 3:
                        err_28 = _a.sent();
                        return [2 /*return*/, this.handleResponseError("GET ITEM BY ID ".concat(itemId), err_28)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightspeedRetailApi.prototype.getCategories = function (accountId) {
        var url = "https://api.merchantos.com/API/Account/".concat(accountId, "/Category.json");
        return new RetailApiCursor_1.default(url, 'Category', this);
    };
    LightspeedRetailApi.prototype.getManufacturers = function (accountId) {
        var url = "https://api.merchantos.com/API/Account/".concat(accountId, "/Manufacturer.json");
        return new RetailApiCursor_1.default(url, 'Manufacturer', this);
    };
    LightspeedRetailApi.prototype.getItems = function (accountId) {
        var url = "https://api.merchantos.com/API/Account/".concat(accountId, "/Item.json");
        return new RetailApiCursor_1.default(url, 'Item', this, {
            load_relations: '["ItemShops", "Images", "Manufacturer"]',
        });
    };
    LightspeedRetailApi.prototype.getPaymentTypes = function (accountId) {
        var url = "https://api.merchantos.com/API/Account/".concat(accountId, "/PaymentType.json");
        return new RetailApiCursor_1.default(url, 'PaymentType', this, {});
    };
    LightspeedRetailApi.prototype.getCustomers = function (accountId, customersSearchParams) {
        if (customersSearchParams === void 0) { customersSearchParams = {}; }
        var url = "https://api.merchantos.com/API/Account/".concat(accountId, "/Customer.json");
        return new RetailApiCursor_1.default(url, 'Customer', this, __assign({ load_relations: '["Contact", "CustomFieldValues"]' }, searchParamsToQueryParams(customersSearchParams)));
    };
    LightspeedRetailApi.prototype.getCustomerTypes = function (accountId) {
        var url = "https://api.merchantos.com/API/Account/".concat(accountId, "/CustomerType.json");
        return new RetailApiCursor_1.default(url, 'CustomerType', this);
    };
    return LightspeedRetailApi;
}());
exports.default = LightspeedRetailApi;
