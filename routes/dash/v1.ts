import * as express from "express";
import AdminController from "../../controllers/dash/admin.controller";
import ResturantController from '../../controllers/dash/resturant.controller';
import auth from "../../middlewares/dash/auth";
import otp from "../../middlewares/dash/otp";
const route = express.Router();

/// Not Auth
route.post("/login", AdminController.login);
route.post("/register", AdminController.register);

route.post("/otp", otp, AdminController.checkOtp);



//  Need Auth
route.use(auth);
// resturant
route.get("/resturant", ResturantController.getResturant);
route.post("/resturant-add", ResturantController.addResturant);
route.put("/resturant-edit/:id", ResturantController.editResturant);
route.delete("/resturant-delete/:id", ResturantController.deleteResturant);

// tables 
route.get("/table", ResturantController.getTables);
route.post("/table-add", ResturantController.addTable);
route.put("/table-edit/:id", ResturantController.editTable);
route.delete("/table-delete/:id", ResturantController.deleteTable);




export default route;