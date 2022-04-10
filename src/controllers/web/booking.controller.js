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
var Booking_1 = require("../../src/entity/Booking");
var Tables_1 = require("../../src/entity/Tables");
var util_service_1 = require("../../utility/util.service");
var Resturant_1 = require("./../../src/entity/Resturant");
var moment = require("moment");
var BookingController = /** @class */ (function () {
    function BookingController() {
    }
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    BookingController.getActiveBookings = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lang, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        lang = req.query.lang;
                        return [4 /*yield*/, Booking_1.Booking.find({
                                isEnd: false, user: req.user
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { data: data })];
                }
            });
        });
    };
    BookingController.getPreviousBookings = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lang, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        lang = req.query.lang;
                        return [4 /*yield*/, Booking_1.Booking.find({
                                isEnd: true, user: req.user
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { data: data })];
                }
            });
        });
    };
    BookingController.makeBooking = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lang, body, book, table, rest, open, close, nowDate, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        lang = req.query.lang;
                        body = req.body;
                        return [4 /*yield*/, Resturant_1.Resturant.findOne({
                                where: { id: id },
                                join: {
                                    alias: "rest",
                                    leftJoinAndSelect: {
                                        table: "rest.table",
                                    },
                                }
                            })];
                    case 1:
                        rest = _a.sent();
                        open = moment(rest.openDate).format('LT');
                        close = moment(rest.closeDate).format('LT');
                        nowDate = moment().format('LT');
                        console.log(nowDate);
                        console.log(close);
                        console.log(open);
                        if (!(open === nowDate)) return [3 /*break*/, 2];
                        (0, util_service_1.errRes)(res, "resturantOpen", 404, lang);
                        return [3 /*break*/, 11];
                    case 2:
                        if (!(close === nowDate)) return [3 /*break*/, 3];
                        (0, util_service_1.errRes)(res, "resturantClose", 404, lang);
                        return [3 /*break*/, 11];
                    case 3:
                        if (!(open !== nowDate && close !== nowDate)) return [3 /*break*/, 11];
                        console.log("way to go my sun");
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < rest.table.length)) return [3 /*break*/, 11];
                        if (!(rest.table[i].isBooked && body.table === rest.table[i].id)) return [3 /*break*/, 5];
                        (0, util_service_1.errRes)(res, "tableIsBooked", 404, lang);
                        return [3 /*break*/, 10];
                    case 5: return [4 /*yield*/, Booking_1.Booking.create({
                            numOfPeople: body.numOfPeople,
                            resTime: body.resTime,
                            user: req.user,
                            table: body.table,
                        })];
                    case 6:
                        book = _a.sent();
                        return [4 /*yield*/, book.save()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, Tables_1.Tables.findOne({ where: { id: body.table } })];
                    case 8:
                        table = _a.sent();
                        table.isBooked = true;
                        return [4 /*yield*/, table.save()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 4];
                    case 11: return [2 /*return*/, (0, util_service_1.okRes)(res, { book: book })];
                }
            });
        });
    };
    BookingController.EditReservation = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lang, body, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        lang = req.query.lang;
                        body = req.body;
                        return [4 /*yield*/, Booking_1.Booking.findOne({ where: { id: id }, })];
                    case 1:
                        data = _a.sent();
                        data.numOfPeople = body.numOfPeople;
                        data.resTime = body.resTime;
                        data.table = body.table;
                        return [4 /*yield*/, data.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { data: data })];
                }
            });
        });
    };
    BookingController.cancalReservation = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lang, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        lang = req.query.lang;
                        return [4 /*yield*/, Booking_1.Booking.findOne({ where: { id: id }, })];
                    case 1:
                        data = _a.sent();
                        if (!data)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "notFound", 404, lang)];
                        if (!(data.status === null)) return [3 /*break*/, 3];
                        data.status = "cancaled";
                        data.isEnd = true;
                        return [4 /*yield*/, data.save()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, (0, util_service_1.okRes)(res, { data: data })];
                }
            });
        });
    };
    BookingController.DeleteReservation = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lang, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        lang = req.query.lang;
                        return [4 /*yield*/, Booking_1.Booking.findOne({ where: { id: id }, })];
                    case 1:
                        data = _a.sent();
                        if (!data)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "notFound", 404, lang)];
                        return [4 /*yield*/, Booking_1.Booking.delete(id)];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { data: data })];
                }
            });
        });
    };
    return BookingController;
}());
exports.default = BookingController;
//# sourceMappingURL=booking.controller.js.map