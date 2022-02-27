import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as validate from "validate.js";
import CONFIG from "../../config";
import PhoneFormat from "../../utility/phoneFormat.service";
import { errRes, okRes } from "../../utility/util.service";
import Validator from "../../utility/validation";
import { Admin } from './../../src/entity/Admin';



export default class ResturantController {

    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async login(req, res): Promise<object> {
        let lang: any;
        lang = req.query.lang;
        let body = req.body;
        // verify body
        let notValid = validate(body, Validator.login());
        if (notValid) return errRes(res, notValid);

        // format to the number
        let phoneObj = PhoneFormat.getAllFormats(body.phone);
        if (!phoneObj.isNumber)
            return errRes(res, "phoneInvalid", 400, lang, body.phone);

        let phone = phoneObj.globalP;
        let password = body.password;

        let admin = await Admin.findOne({ where: { phone, isActive: true } });


        // compaire the password
        let check = await bcrypt.compare(password, admin.password);
        if (!check) return errRes(res, "incorrectCred", 400, lang);

        // token
        let token = jwt.sign({ id: admin.id }, CONFIG.jwtUserSecret);

        // return token
        return okRes(res, { token, admin });
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