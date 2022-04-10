"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var booking_controller_1 = require("../../controllers/web/booking.controller");
var resturant_controller_1 = require("../../controllers/web/resturant.controller");
var user_controller_1 = require("../../controllers/web/user.controller");
var auth_1 = require("../../middlewares/web/auth");
var otp_1 = require("../../middlewares/web/otp");
var route = express.Router();
/// Not Auth
route.post("/register", user_controller_1.default.register);
route.post("/otp", otp_1.default, user_controller_1.default.checkOtp);
route.post("/login", user_controller_1.default.login);
route.post("/forget/password", user_controller_1.default.forget);
route.post("/verify/password", user_controller_1.default.verifyPassword);
route.get("/resturant/:id", resturant_controller_1.default.getOneResturant);
route.get("/resturant-all", resturant_controller_1.default.getAllResturants);
//  Need Auth
route.use(auth_1.default);
// booking
route.post("/resturant/:id/booking", booking_controller_1.default.makeBooking);
route.put("/booking/edit/:id", booking_controller_1.default.EditReservation);
route.put("/booking/cancel/:id", booking_controller_1.default.cancalReservation);
route.delete("/booking/delete/:id", booking_controller_1.default.DeleteReservation);
route.get("/booking/active", booking_controller_1.default.getActiveBookings);
route.get("/booking/previous", booking_controller_1.default.getPreviousBookings);
exports.default = route;
//# sourceMappingURL=v1.js.map