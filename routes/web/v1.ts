import * as express from "express";
import UserController from '../../controllers/web/user.controller';
import auth from "../../middlewares/web/auth";
import otp from "../../middlewares/web/otp";
const route = express.Router();

/// Not Auth
route.post("/register", UserController.register);
route.post("/otp", otp, UserController.checkOtp);
route.post("/login", UserController.login);





//  Need Auth
route.use(auth);



export default route;