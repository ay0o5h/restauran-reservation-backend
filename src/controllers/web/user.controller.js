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
var twilio_1 = require("twilio");
var validate = require("validate.js");
var config_1 = require("../../config");
var phoneFormat_service_1 = require("../../utility/phoneFormat.service");
var util_service_1 = require("../../utility/util.service");
var validation_1 = require("../../utility/validation");
var User_1 = require("./../../src/entity/User");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    UserController.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, body, notValid, phoneObj, phone, salt, password, otp, user, accountSid, authToken, client, token;
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
                        return [4 /*yield*/, User_1.User.findOne({ where: { phone: phone } })];
                    case 3:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 4];
                        if (!user.isVerfied) {
                            Object.keys(body).forEach(function (key) {
                                user[key] = body[key];
                            });
                        }
                        else
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "phoneExist", 400, lang, body.phone)];
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, User_1.User.create({
                            firstName: body.firstName,
                            lastName: body.lastName,
                            phone: body.phone,
                            password: body.password,
                            otp: body.otp,
                        })];
                    case 5:
                        user = _a.sent();
                        _a.label = 6;
                    case 6: 
                    // save the user
                    return [4 /*yield*/, user.save()];
                    case 7:
                        // save the user
                        _a.sent();
                        accountSid = "AC1ec944609532d00468cecce1145b5575";
                        authToken = "cb6f14425becfcea726e09609b765829";
                        client = new twilio_1.Twilio(accountSid, authToken);
                        client.messages
                            .create({
                            body: "your vervication code is ".concat(otp),
                            to: '+9647805847657',
                            from: "+18066066506"
                        })
                            .then(function (message) { return console.log(message.sid); });
                        token = jwt.sign({ id: user.id }, config_1.default.jwtUserSecret);
                        // return res
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { token: token })];
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
    UserController.checkOtp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, body, otp, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lang = req.query.lang;
                        body = req.body;
                        otp = body.otp;
                        if (!otp)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "otpReq", 400, lang)];
                        user = req.user;
                        // if not -> delete the otp from DB + ask user to try again
                        if (user.otp != otp) {
                            // user.otp = null;
                            // await user.save();
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "otpIncorrect", 400, lang)];
                        }
                        // if yes -> isVerified = true
                        user.isVerified = true;
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _a.sent();
                        // return res
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { user: user })];
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
    UserController.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, body, notValid, phoneObj, phone, password, user, check, token;
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
                        console.log(password);
                        return [4 /*yield*/, User_1.User.findOne({ where: { phone: phone, isVerified: true } })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "complete", 400, lang)];
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        check = _a.sent();
                        if (!check)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "incorrectCred", 400, lang)];
                        token = jwt.sign({ id: user.id }, config_1.default.jwtUserSecret);
                        // return token
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { token: token, user: user })];
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
    UserController.forget = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, body, notValid, phoneObj, phone, user, otpNewPassword, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lang = req.query.lang;
                        body = req.body;
                        notValid = validate(body, validation_1.default.forget());
                        if (notValid)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, notValid)];
                        phoneObj = phoneFormat_service_1.default.getAllFormats(body.phone);
                        if (!phoneObj.isNumber)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "phoneInvalid", 400, lang, body.phone)];
                        phone = phoneObj.globalP;
                        return [4 /*yield*/, User_1.User.findOne({
                                where: { phone: phone, isVerified: true, isActive: true },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "complete", 400)];
                        otpNewPassword = (0, util_service_1.getOtp)();
                        user.otpNewPassword = otpNewPassword;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        token = jwt.sign({ phone: user.phone }, config_1.default.jwtPasswordSecret);
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { token: token })];
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
    UserController.verifyPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, body, notValid, token, phone, payload, user, salt, password;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lang = req.query.lang;
                        body = req.body;
                        notValid = validate(body, validation_1.default.verifyPassword());
                        if (notValid)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, notValid)];
                        token = req.headers.token;
                        // get the user from db using id
                        try {
                            payload = void 0;
                            payload = jwt.verify(token, config_1.default.jwtPasswordSecret);
                            phone = payload.phone;
                        }
                        catch (error) {
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "Invalid token")];
                        }
                        return [4 /*yield*/, User_1.User.findOne({ where: { phone: phone } })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "userNotFound", 400, lang)];
                        // compaire the passwordOtp from db & body
                        if (body.passwordOtp != user.otpNewPassword)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "invalidOtp", 400, lang)];
                        return [4 /*yield*/, bcrypt.genSalt(12)];
                    case 2:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(body.newPassword, salt)];
                    case 3:
                        password = _a.sent();
                        // save new password
                        user.password = password;
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { msg: "All good 😊" })];
                }
            });
        });
    };
    UserController.deactive = function (req, res) {
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
                        return [4 /*yield*/, User_1.User.findOne({ where: { id: payload.id } })];
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
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map