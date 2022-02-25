import * as express from "express";
// import otp from "../../middlewares/web/otp";
import auth from "../../middlewares/web/auth";

const route = express.Router();

/// Not Auth
route.post("/register",);




//  Need Auth
route.use(auth);



export default route;