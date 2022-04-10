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
var Resturant_1 = require("../../src/entity/Resturant");
var Tables_1 = require("../../src/entity/Tables");
var util_service_1 = require("../../utility/util.service");
var BookingController = /** @class */ (function () {
    function BookingController() {
    }
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    BookingController.makeItDone = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, idtable, lang, booking, table;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        idtable = req.params.table;
                        lang = req.query.lang;
                        return [4 /*yield*/, Booking_1.Booking.findOne({ where: { id: id } })];
                    case 1:
                        booking = _a.sent();
                        booking.isEnd = true;
                        return [4 /*yield*/, booking.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Tables_1.Tables.findOne({ where: { id: idtable } })];
                    case 3:
                        table = _a.sent();
                        table.isBooked = false;
                        return [4 /*yield*/, table.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { table: table, booking: booking })];
                }
            });
        });
    };
    BookingController.changeState = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lang, data, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        lang = req.query.lang;
                        body = req.body;
                        return [4 /*yield*/, Booking_1.Booking.findOne({ where: { id: id }, })];
                    case 1:
                        data = _a.sent();
                        if (!data)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "notFound", 404, lang)];
                        data.status = body.status;
                        body.status === "reject" ? data.isEnd = true : data.isEnd = false;
                        return [4 /*yield*/, data.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { data: data })];
                }
            });
        });
    };
    BookingController.getActiveBookings = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lang, rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        lang = req.query.lang;
                        return [4 /*yield*/, Resturant_1.Resturant.find({
                                where: { admin: req.admin },
                                join: {
                                    alias: "rest",
                                    leftJoinAndSelect: {
                                        table: "rest.table",
                                        book: "table.book",
                                        user: "book.user",
                                    },
                                }
                            })];
                    case 1:
                        rest = _a.sent();
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { rest: rest })];
                }
            });
        });
    };
    return BookingController;
}());
exports.default = BookingController;
//# sourceMappingURL=booking.controller.js.map