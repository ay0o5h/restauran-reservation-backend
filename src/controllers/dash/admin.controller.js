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
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var validate = require("validate.js");
var config_1 = require("../../config");
var phoneFormat_service_1 = require("../../utility/phoneFormat.service");
var util_service_1 = require("../../utility/util.service");
var validation_1 = require("../../utility/validation");
var Admin_1 = require("./../../src/entity/Admin");
var AdminController = /** @class */ (function () {
    function AdminController() {
    }
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    AdminController.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, body, notValid, phoneObj, phone, salt, password, otp, admin, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lang = req.query.lang;
                        body = req.body;
                        notValid = validate(body, validation_1.default.register());
                        if (notValid)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, notValid)];
                        phoneObj = phoneFormat_service_1.default.getAllFormats(body.phone);
                        if (!phoneObj.isNumber)
                            // return errRes(res, `Phone ${body.phone} is not valid`);
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "phoneInvalid", 400, lang, body.phone)];
                        body.phone = phoneObj.globalP;
                        phone = phoneObj.globalP;
                        return [4 /*yield*/, bcrypt.genSalt(12)];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(body.password, salt)];
                    case 2:
                        password = _a.sent();
                        otp = (0, util_service_1.getOtp)();
                        body.password = password;
                        body.otp = otp;
                        return [4 /*yield*/, Admin_1.Admin.findOne({ where: { phone: phone } })];
                    case 3:
                        admin = _a.sent();
                        if (!admin) return [3 /*break*/, 4];
                        if (!admin.isVerfied) {
                            Object.keys(body).forEach(function (key) {
                                admin[key] = body[key];
                            });
                        }
                        else
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "phoneExist", 400, lang, body.phone)];
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, Admin_1.Admin.create({
                            firstName: body.firstName,
                            lastName: body.lastName,
                            phone: body.phone,
                            password: body.password,
                            otp: body.otp,
                        })];
                    case 5:
                        admin = _a.sent();
                        _a.label = 6;
                    case 6: 
                    // save the user
                    return [4 /*yield*/, admin.save()];
                    case 7:
                        // save the user
                        _a.sent();
                        token = jwt.sign({ id: admin.id }, config_1.default.jwtUserSecret);
                        // return res
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { token: token, admin: admin })];
                }
            });
        });
    };
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    AdminController.checkOtp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, body, otp, admin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lang = req.query.lang;
                        body = req.body;
                        otp = body.otp;
                        if (!otp)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "otpReq", 400, lang)];
                        admin = req.admin;
                        // if not -> delete the otp from DB + ask user to try again
                        if (admin.otp != otp) {
                            // user.otp = null;
                            // await user.save();
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "otpIncorrect", 400, lang)];
                        }
                        // if yes -> isVerified = true
                        admin.isVerified = true;
                        return [4 /*yield*/, admin.save()];
                    case 1:
                        _a.sent();
                        // return res
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { admin: admin })];
                }
            });
        });
    };
    AdminController.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, body, notValid, phoneObj, phone, password, admin, check, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lang = req.query.lang;
                        body = req.body;
                        notValid = validate(body, validation_1.default.login());
                        if (notValid)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, notValid)];
                        phoneObj = phoneFormat_service_1.default.getAllFormats(body.phone);
                        if (!phoneObj.isNumber)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "phoneInvalid", 400, lang, body.phone)];
                        phone = phoneObj.globalP;
                        password = body.password;
                        return [4 /*yield*/, Admin_1.Admin.findOne({ where: { phone: phone, isActive: true } })];
                    case 1:
                        admin = _a.sent();
                        if (!admin)
                            (0, util_service_1.errRes)(res, "complete", 400, lang);
                        return [4 /*yield*/, bcrypt.compare(password, admin.password)];
                    case 2:
                        check = _a.sent();
                        if (!check)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "incorrectCred", 400, lang)];
                        token = jwt.sign({ id: admin.id }, config_1.default.jwtUserSecret);
                        // return token
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { token: token, admin: admin })];
                }
            });
        });
    };
    AdminController.deactive = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, token, data, payload, error_1, errMsg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lang = req.query.lang;
                        token = req.headers.token;
                        if (!token)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "needRegister", 400, lang)];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        payload = void 0;
                        payload = jwt.verify(token, config_1.default.jwtUserSecret);
                        return [4 /*yield*/, Admin_1.Admin.findOne({ where: { id: payload.id } })];
                    case 2:
                        data = _a.sent();
                        if (!data)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "userNotFound", 400, lang)];
                        data.isActive = !data.isActive;
                        return [4 /*yield*/, data.save()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        errMsg = error_1.detail ? error_1.detail : error_1;
                        return [2 /*return*/, (0, util_service_1.errRes)(res, errMsg)];
                    case 5: return [2 /*return*/, (0, util_service_1.okRes)(res, { data: data })];
                }
            });
        });
    };
    return AdminController;
}());
exports.default = AdminController;
//# sourceMappingURL=admin.controller.js.map