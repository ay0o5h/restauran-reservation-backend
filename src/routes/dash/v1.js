"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var admin_controller_1 = require("../../controllers/dash/admin.controller");
var booking_controller_1 = require("../../controllers/dash/booking.controller");
var resturant_controller_1 = require("../../controllers/dash/resturant.controller");
var auth_1 = require("../../middlewares/dash/auth");
var otp_1 = require("../../middlewares/dash/otp");
var route = express.Router();
/// Not Auth
route.post("/login", admin_controller_1.default.login);
route.post("/register", admin_controller_1.default.register);
route.post("/otp", otp_1.default, admin_controller_1.default.checkOtp);
route.put("/resturant/:id", resturant_controller_1.default.updateStateOpining);
//  Need Auth
route.use(auth_1.default);
// resturant
route.get("/resturant/:id", resturant_controller_1.default.getResturant);
route.get("/resturant", resturant_controller_1.default.getAllResturants);
route.post("/resturant-add", resturant_controller_1.default.addResturant);
route.put("/resturant-edit/:id", resturant_controller_1.default.editResturant);
route.delete("/resturant-delete/:id", resturant_controller_1.default.deleteResturant);
// tables 
route.get("/table/:id", resturant_controller_1.default.getTables);
route.post("/table-add", resturant_controller_1.default.addTable);
route.put("/table-edit/:id", resturant_controller_1.default.editTable);
route.delete("/table-delete/:id", resturant_controller_1.default.deleteTable);
// booking 
route.put("/table/:table/booking/:id", booking_controller_1.default.makeItDone);
route.put("/table/booking/:id", booking_controller_1.default.changeState);
route.get("/booking", booking_controller_1.default.getActiveBookings);
exports.default = route;
//# sourceMappingURL=v1.js.map