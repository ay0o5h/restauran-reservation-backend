import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Twilio } from "twilio";
import * as validate from "validate.js";
import CONFIG from "../../config";
import PhoneFormat from "../../utility/phoneFormat.service";
import { errRes, getOtp, okRes } from "../../utility/util.service";
import Validator from "../../utility/validation";
import { User } from './../../src/entity/User';



export default class UserController {
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async register(req: Request, res: Response): Promise<object> {
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
        let user;
        user = await User.findOne({ where: { phone } });
        // if exists but not verified
        if (user) {
            if (!user.isVerfied) {
                Object.keys(body).forEach((key) => {
                    user[key] = body[key];
                });
            } else return errRes(res, "phoneExist", 400, lang, body.phone);
        } else {
            user = await User.create({
                firstName: body.firstName,
                lastName: body.lastName,
                phone: body.phone,
                password: body.password,
                otp: body.otp,
            });
        }

        // save the user
        await user.save();

        // send sms
        const accountSid = "AC1ec944609532d00468cecce1145b5575";
        const authToken = "cb6f14425becfcea726e09609b765829";
        const client = new Twilio(accountSid, authToken);
        client.messages
            .create({
                body: `your vervication code is ${otp}`,
                to: '+9647805847657',
                from: "+18066066506"
            })
            .then(message => console.log(message.sid))
        let token = jwt.sign({ id: user.id }, CONFIG.jwtUserSecret);

        // return res
        return okRes(res, { token });
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
        // get user from db by phone + isVerified
        let user = await User.findOne({ where: { phone, isVerified: true } });
        if (!user) return errRes(res, "complete", 400, lang);

        // compaire the password
        let check = await bcrypt.compare(password, user.password);
        if (!check) return errRes(res, "incorrectCred", 400, lang);

        // token
        let token = jwt.sign({ id: user.id }, CONFIG.jwtUserSecret);

        // return token
        return okRes(res, { token, user });
    }


    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async forget(req, res) {
        let lang: any;
        lang = req.query.lang;
        let body = req.body;

        let notValid = validate(body, Validator.forget());
        if (notValid) return errRes(res, notValid);

        // format phone
        let phoneObj = PhoneFormat.getAllFormats(body.phone);
        if (!phoneObj.isNumber)
            return errRes(res, "phoneInvalid", 400, lang, body.phone);

        let phone = phoneObj.globalP;

        // get admin from db using phone + isVerified
        let user = await User.findOne({
            where: { phone, isVerfied: true, isActive: true },
        });
        if (!user) return errRes(res, "complete", 400);

        // create passwordOtp & save
        let otpNewPassword = getOtp();

        user.otpNewPassword = otpNewPassword;
        await user.save();

        // create token
        let token = jwt.sign({ phone: user.phone }, CONFIG.jwtPasswordSecret);

        return okRes(res, { token });
    }

    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async verifyPassword(req, res) {
        let lang: any;
        lang = req.query.lang;
        let body = req.body;

        let notValid = validate(body, Validator.verifyPassword());
        if (notValid) return errRes(res, notValid);

        // get the token
        let token = req.headers.token;
        let phone;
        // get the user from db using id
        try {
            let payload;
            payload = jwt.verify(token, CONFIG.jwtPasswordSecret);
            phone = payload.phone;
        } catch (error) {
            return errRes(res, "Invalid token");
        }

        let user = await User.findOne({ where: { phone } });
        if (!user) return errRes(res, "userNotFound", 400, lang);

        // compaire the passwordOtp from db & body
        if (body.passwordOtp != user.otpNewPassword)
            return errRes(res, "invalidOtp", 400, lang);

        // hash new password
        let salt = await bcrypt.genSalt(12);
        let password = await bcrypt.hash(body.newPassword, salt);

        // save new password
        user.password = password;
        return okRes(res, { msg: "All good 😊" });
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
            data = await User.findOne({ where: { id: payload.id } });
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