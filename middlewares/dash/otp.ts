import * as jwt from "jsonwebtoken";
import CONFIG from "../../config";
import { Admin } from "../../src/entity/Admin";
import { errRes } from "../../utility/util.service";

export default async (req, res, next) => {
    let lang: any;
    lang = req.query.lang
    const token = req.headers.token;
    if (!token) return errRes(res, "needRegister", 400, lang);
    // verify token

    try {
        let payload: any;
        payload = jwt.verify(token, CONFIG.jwtUserSecret);
        // get user
        let admin = await Admin.findOne(payload.id);
        // check user isVerified
        if (admin.isVerified) return errRes(res, "alreadyVerified", 400, lang);
        req.admin = admin;
        // next
        return next();
    } catch (error) {
        return errRes(res, error);
    }
};