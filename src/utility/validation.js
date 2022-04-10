"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validate = /** @class */ (function () {
    function Validate(parameters) {
    }
    Validate.register = function (must) {
        if (must === void 0) { must = true; }
        return ({
            firstName: {
                presence: must,
                type: "string",
            },
            lastName: {
                presence: must,
                type: "string",
            },
            phone: {
                presence: must,
                type: "string",
            },
            password: {
                presence: must,
                type: "string",
            },
        });
    };
    Validate.login = function (must) {
        if (must === void 0) { must = true; }
        return ({
            phone: {
                presence: must,
                type: "string",
            },
            password: {
                presence: must,
                type: "string",
            },
        });
    };
    Validate.forget = function (must) {
        if (must === void 0) { must = true; }
        return ({
            phone: {
                presence: must,
                type: "string",
            },
        });
    };
    Validate.verifyPassword = function (must) {
        if (must === void 0) { must = true; }
        return ({
            passwordOtp: {
                presence: must,
                type: "number",
            },
            newPassword: {
                presence: must,
                type: "string",
            },
        });
    };
    Validate.resturant = function (must) {
        if (must === void 0) { must = true; }
        return ({
            name: {
                presence: must,
                type: "string",
            },
            bgImage: {
                presence: must,
                type: "string",
            },
            floorMap: {
                presence: must,
                type: "string",
            },
            numOfTable: {
                presence: false,
                type: "number",
            },
            openDate: {
                presence: must,
                type: "string",
            },
            closeDate: {
                presence: must,
                type: "string",
            },
        });
    };
    Validate.table = function (must) {
        if (must === void 0) { must = true; }
        return ({
            tableNum: {
                presence: must,
                type: "number",
            },
            x: {
                presence: must,
                type: "number",
            },
            y: {
                presence: must,
                type: "number",
            },
            rest: {
                presence: must,
                type: "number",
            },
        });
    };
    return Validate;
}());
exports.default = Validate;
//# sourceMappingURL=validation.js.map