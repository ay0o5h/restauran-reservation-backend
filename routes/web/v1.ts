import * as express from "express";
import BookingController from '../../controllers/web/booking.controller';
import ResturantController from '../../controllers/web/resturant.controller';
import UserController from '../../controllers/web/user.controller';
import auth from "../../middlewares/web/auth";
import otp from "../../middlewares/web/otp";
const route = express.Router();

/// Not Auth
route.post("/register", UserController.register);
route.post("/otp", otp, UserController.checkOtp);
route.post("/login", UserController.login);
route.post("/forget/password", UserController.forget);
route.post("/verify/password", UserController.verifyPassword);
route.get("/resturant/:id", ResturantController.getOneResturant);
route.get("/resturant-all", ResturantController.getAllResturants);


//  Need Auth
route.use(auth);
route.post("/resturant/:id/booking", BookingController.makeBooking);


export default route;