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
Object.defineProperty(exports, "__esModule", { value: true });
var validate = require("validate.js");
var Tables_1 = require("../../src/entity/Tables");
var util_service_1 = require("../../utility/util.service");
var validation_1 = require("../../utility/validation");
var Resturant_1 = require("./../../src/entity/Resturant");
var moment = require("moment");
var ResturantController = /** @class */ (function () {
    function ResturantController() {
    }
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    ResturantController.getAllResturants = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Resturant_1.Resturant.find({
                            where: { admin: req.admin },
                            join: {
                                alias: "rest",
                                leftJoinAndSelect: {
                                    table: "rest.table",
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
    ResturantController.getResturant = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lang, rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        lang = req.query.lang;
                        return [4 /*yield*/, Resturant_1.Resturant.findOne({
                                where: { id: id, admin: req.admin },
                                join: {
                                    alias: "rest",
                                    leftJoinAndSelect: {
                                        table: "rest.table",
                                        book: "table.book",
                                    },
                                },
                            })];
                    case 1:
                        rest = _a.sent();
                        if (!rest)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "notFound", 404, lang)];
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { rest: rest })];
                }
            });
        });
    };
    ResturantController.addResturant = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, body, notValid, rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lang = req.query.lang;
                        body = req.body;
                        notValid = validate(body, validation_1.default.resturant());
                        if (notValid)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, notValid)];
                        return [4 /*yield*/, Resturant_1.Resturant.findOne({ where: { name: body.name } })];
                    case 1:
                        rest = _a.sent();
                        if (rest)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "alreadyExist", 400, lang)];
                        return [4 /*yield*/, Resturant_1.Resturant.create({
                                name: body.name,
                                bgImage: body.bgImage,
                                floorMap: body.floorMap,
                                numOfTable: body.numOfTable,
                                openDate: body.openDate,
                                closeDate: body.closeDate,
                                admin: req.admin
                            })];
                    case 2:
                        rest = _a.sent();
                        return [4 /*yield*/, rest.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { rest: rest })];
                }
            });
        });
    };
    ResturantController.editResturant = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lang, body, notValid, rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        lang = req.query.lang;
                        body = req.body;
                        notValid = validate(body, validation_1.default.resturant(false));
                        if (notValid)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, notValid)];
                        return [4 /*yield*/, Resturant_1.Resturant.findOne({ where: { id: id, admin: req.admin } })];
                    case 1:
                        rest = _a.sent();
                        if (!rest)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "notFound", 404, lang)];
                        Object.keys(rest).forEach(function (key) {
                            if (body[key])
                                rest[key] = body[key];
                        });
                        return [4 /*yield*/, rest.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { rest: rest })];
                }
            });
        });
    };
    ResturantController.deleteResturant = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, id, rest, table, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lang = req.query.lang;
                        id = req.params.id;
                        return [4 /*yield*/, Resturant_1.Resturant.findOne({ where: { id: id, admin: req.admin } })];
                    case 1:
                        rest = _a.sent();
                        if (!rest)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "notFound", 404, lang)];
                        return [4 /*yield*/, Tables_1.Tables.find({ where: { rest: id } })];
                    case 2:
                        table = _a.sent();
                        if (!table)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "notFound", 404, lang)];
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < table.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, table[i].remove()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, Resturant_1.Resturant.delete(id)];
                    case 7:
                        rest = _a.sent();
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { rest: rest })];
                }
            });
        });
    };
    ResturantController.getTables = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lang, table;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        lang = req.query.lang;
                        return [4 /*yield*/, Tables_1.Tables.find({ where: { rest: id } })];
                    case 1:
                        table = _a.sent();
                        if (!table)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "notFound", 404, lang)];
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { table: table })];
                }
            });
        });
    };
    ResturantController.addTable = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, body, notValid, table;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lang = req.query.lang;
                        body = req.body;
                        notValid = validate(body, validation_1.default.table());
                        if (notValid)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, notValid)];
                        return [4 /*yield*/, Tables_1.Tables.findOne({ where: { rest: body.rest, x: body.x, y: body.y } })];
                    case 1:
                        table = _a.sent();
                        if (table)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "alreadyExist", 400, lang)];
                        return [4 /*yield*/, Tables_1.Tables.create(__assign({}, body))];
                    case 2:
                        table = _a.sent();
                        return [4 /*yield*/, table.save()];
                    case 3:
                        _a.sent();
                        // return token
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { table: table })];
                }
            });
        });
    };
    ResturantController.editTable = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lang, body, notValid, table;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        lang = req.query.lang;
                        body = req.body;
                        notValid = validate(body, validation_1.default.table(false));
                        if (notValid)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, notValid)];
                        return [4 /*yield*/, Tables_1.Tables.findOne({ where: { id: id } })];
                    case 1:
                        table = _a.sent();
                        if (!table)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "notFound", 404, lang)];
                        // table.x = body.x,
                        //     table.y = body.y,
                        Object.keys(table).forEach(function (key) {
                            if (body[key])
                                table[key] = body[key];
                        });
                        return [4 /*yield*/, table.save()];
                    case 2:
                        _a.sent();
                        // return token
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { table: table })];
                }
            });
        });
    };
    ResturantController.deleteTable = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, id, table;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lang = req.query.lang;
                        id = req.params.id;
                        return [4 /*yield*/, Tables_1.Tables.findOne({ where: { id: id } })];
                    case 1:
                        table = _a.sent();
                        if (!table)
                            return [2 /*return*/, (0, util_service_1.errRes)(res, "notFound", 404, lang)];
                        return [4 /*yield*/, Tables_1.Tables.delete(id)];
                    case 2:
                        table = _a.sent();
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { table: table })];
                }
            });
        });
    };
    ResturantController.updateStateOpining = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, rest, hours, i, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Resturant_1.Resturant.findOne({ where: { id: id } })];
                    case 1:
                        rest = _a.sent();
                        hours = [];
                        for (i = Number(moment(rest.closeDate).format("HH")); i < 24; i++) {
                            hours.push(i);
                        }
                        for (j = Number(moment(rest.openDate).format("HH")) - 1; j > 0; j--) {
                            hours.push(j);
                        }
                        if (hours.includes(Number(moment().format("HH")))) {
                            rest.isOpen = false;
                        }
                        else {
                            rest.isOpen = true;
                        }
                        return [4 /*yield*/, rest.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, (0, util_service_1.okRes)(res, { rest: rest })];
                }
            });
        });
    };
    return ResturantController;
}());
exports.default = ResturantController;
//# sourceMappingURL=resturant.controller.js.map