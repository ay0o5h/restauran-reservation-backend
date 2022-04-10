import * as express from "express";
import AdminController from "../../controllers/dash/admin.controller";
import BookingController from '../../controllers/dash/booking.controller';
import ResturantController from '../../controllers/dash/resturant.controller';
import auth from "../../middlewares/dash/auth";
import otp from "../../middlewares/dash/otp";
const route = express.Router();

/// Not Auth
route.post("/login", AdminController.login);
route.post("/register", AdminController.register);

route.post("/otp", otp, AdminController.checkOtp);


route.put("/resturant/:id", ResturantController.updateStateOpining);
route.put("/change/:id", ResturantController.RR);

//  Need Auth
route.use(auth);
// resturant
route.get("/resturant/:id", ResturantController.getResturant);
route.get("/resturant", ResturantController.getAllResturants);
route.post("/resturant-add", ResturantController.addResturant);
route.put("/resturant-edit/:id", ResturantController.editResturant);
route.delete("/resturant-delete/:id", ResturantController.deleteResturant);

// tables 
route.get("/table/:id", ResturantController.getTables);
route.post("/table-add", ResturantController.addTable);
route.put("/table-edit/:id", ResturantController.editTable);
route.delete("/table-delete/:id", ResturantController.deleteTable);

// booking 
route.put("/table/:table/booking/:id", BookingController.makeItDone);
route.put("/table/booking/:id", BookingController.changeState);
route.get("/booking", BookingController.getActiveBookings);






export default route;