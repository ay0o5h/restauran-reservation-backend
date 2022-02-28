import * as express from "express";
import ResturantController from '../../controllers/web/resturant.controller';
import UserController from '../../controllers/web/user.controller';
import auth from "../../middlewares/web/auth";
import otp from "../../middlewares/web/otp";
const route = express.Router();

/// Not Auth
route.post("/register", UserController.register);
route.post("/otp", otp, UserController.checkOtp);
route.post("/login", UserController.login);
route.get("/resturant", ResturantController.getOneResturant);
route.get("/resturant-all", ResturantController.getAllResturants);


//  Need Auth
route.use(auth);



export default route;