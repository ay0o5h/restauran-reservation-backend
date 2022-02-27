import * as jwt from "jsonwebtoken";
import * as validate from "validate.js";
import CONFIG from "../../config";
import { errRes, okRes } from "../../utility/util.service";
import Validator from "../../utility/validation";
import { Admin } from './../../src/entity/Admin';
import { Resturant } from './../../src/entity/Resturant';



export default class ResturantController {

    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async addResturant(req, res): Promise<object> {
        let lang: any;
        lang = req.query.lang;
        let body = req.body;

        let notValid = validate(body, Validator.resturant());
        if (notValid) return errRes(res, notValid);


        let rest = await Resturant.findOne({ where: { name: body.name } });
        if (rest) return errRes(res, "alreadyExist", 400, lang)



        // return token
        return okRes(res, { rest });
    }
    static async deactive(req, res): Promise<object> {
        let lang: any;
        lang = req.query.lang;
        const token = req.headers.token;
        if (!token) return errRes(res, "needRegister", 400, lang);
        let data;
        try {
            let payload: any;
            payload = jwt.verify(token, CONFIG.jwtUserSecret);
            data = await Admin.findOne({ where: { id: payload.id } });
            if (!data) return errRes(res, "userNotFound", 400, lang);
            data.isActive = !data.isActive;
            await data.save();
        } catch (error) {
            let errMsg = error.detail ? error.detail : error;
            return errRes(res, errMsg);
        }
        return okRes(res, { data });
    }
}