"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_service_1 = require("../../utility/util.service");
exports.default = (function (req, res, next) {
    var lang;
    lang = req.query.lang;
    return (0, util_service_1.errRes)(res, "notFound", 404, lang);
});
//# sourceMappingURL=notFount.js.map