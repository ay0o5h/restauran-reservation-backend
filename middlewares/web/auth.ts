import * as jwt from "jsonwebtoken";
import CONFIG from "../../config";
import { User } from "../../src/entity/User";
import { errRes } from "../../utility/util.service";

export default async (req, res, next) => {
    let lang: any;
    lang = req.query.lang;
    const token = req.headers.token;
    if (!token) return errRes(res, "needRegister", 400, lang);
    // verify token

    try {
        let payload: any;
        payload = jwt.verify(token, CONFIG.jwtUserSecret);
        // get user
        let user = await User.findOne({ where: { id: payload.id } });
        console.log({ user, payload });

        // check user isVerified
        if (!user.isVerified) return errRes(res, "verifyAccount", 400, lang);
        req.user = user;
        // next
        return next();
    } catch (error) {
        return errRes(res, "invalid token");
    }
};