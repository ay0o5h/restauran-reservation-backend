"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
exports.default = {
    jwtUserSecret: process.env.JWT_USER_SECRET || "shhh",
    jwtPasswordSecret: process.env.JWT_PASSWORD_SECRET || "sdjnjfnv",
};
//# sourceMappingURL=index.js.map