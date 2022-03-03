import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as validate from "validate.js";
import CONFIG from "../../config";
import PhoneFormat from "../../utility/phoneFormat.service";
import { errRes, getOtp, okRes } from "../../utility/util.service";
import Validator from "../../utility/validation";
import { Admin } from './../../src/entity/Admin';



export default class AdminController {

    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async register(req, res): Promise<object> {
        let lang: any;
        lang = req.query.lang;
        const body = req.body;
        // validate the req
        let notValid = validate(body, Validator.register());
        if (notValid) return errRes(res, notValid);

        // format to the number
        let phoneObj = PhoneFormat.getAllFormats(body.phone);
        if (!phoneObj.isNumber)
            // return errRes(res, `Phone ${body.phone} is not valid`);
            return errRes(res, "phoneInvalid", 400, lang, body.phone);

        body.phone = phoneObj.globalP;
        let phone = phoneObj.globalP;

        // hash the password
        let salt = await bcrypt.genSalt(12);
        let password = await bcrypt.hash(body.password, salt);
        // create otp
        let otp = getOtp();
        body.password = password;
        body.otp = otp;

        // check if the user already exists
        let admin;
        admin = await admin.findOne({ where: { phone } });
        // if exists but not verified
        if (admin) {
            if (!admin.isVerfied) {
                Object.keys(body).forEach((key) => {
                    admin[key] = body[key];
                });
            } else return errRes(res, "phoneExist", 400, lang, body.phone);
        } else {
            admin = await admin.create({
                firstName: body.firstName,
                lastName: body.lastName,
                phone: body.phone,
                password: body.password,
                otp: body.otp,
            });
        }

        // save the user
        await admin.save();

        // send sms
        // const accountSid = "AC1ec944609532d00468cecce1145b5575";
        // const authToken = "cb6f14425becfcea726e09609b765829";
        // const client = new Twilio(accountSid, authToken);
        // client.messages
        //     .create({
        //         body: `your vervication code is ${otp}`,
        //         to: '+9647805847657',
        //         from: "+18066066506"
        //     })
        //     .then(message => console.log(message.sid))
        let token = jwt.sign({ id: admin.id }, CONFIG.jwtUserSecret);

        // return res
        return okRes(res, { token, admin });
    }

    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async checkOtp(req, res): Promise<object> {
        let lang: any;
        lang = req.query.lang;
        let body = req.body;
        let otp = body.otp;
        if (!otp) return errRes(res, "otpReq", 400, lang);
        // check if they are the same DB
        let user = req.user;


        // if not -> delete the otp from DB + ask user to try again
        if (user.otp != otp) {
            // user.otp = null;
            // await user.save();
            return errRes(res, "otpIncorrect", 400, lang);
        }


        // if yes -> isVerified = true
        user.isVerified = true;
        await user.save();
        // return res
        return okRes(res, { user });
    }
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
        if (!admin) errRes(res, "complete", 400, lang);
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