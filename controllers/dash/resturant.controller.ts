import * as validate from "validate.js";
import { errRes, okRes } from "../../utility/util.service";
import Validator from "../../utility/validation";
import { Resturant } from './../../src/entity/Resturant';



export default class ResturantController {

    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async getResturant(req, res): Promise<object> {
        let id = req.params.id;
        let lang: any;
        lang = req.query.lang;
        let rest = await Resturant.findOne({ where: { id: id, admin: req.admin } });
        if (!rest) return errRes(res, "notFound", 404, lang);
        return okRes(res, { rest });

    }
    static async addResturant(req, res): Promise<object> {
        let lang: any;
        lang = req.query.lang;
        let body = req.body;

        let notValid = validate(body, Validator.resturant());
        if (notValid) return errRes(res, notValid);


        let rest = await Resturant.findOne({ where: { name: body.name } });
        if (rest) return errRes(res, "alreadyExist", 400, lang);

        rest = await Resturant.create({
            name: body.name,
            bgImage: body.bgImage,
            floorMap: body.floorMap,
            numOfTable: body.numOfTable,
            openDate: body.openDate,
            closeDate: body.closeDate,
            admin: req.admin
        })
        await rest.save();
        // return token
        return okRes(res, { rest });
    }
    static async editResturant(req, res): Promise<object> {
        let id = req.params.id
        let lang: any;
        lang = req.query.lang;
        let body = req.body;

        let notValid = validate(body, Validator.resturant(false));
        if (notValid) return errRes(res, notValid);


        let rest = await Resturant.findOne({ where: { id: id, admin: req.admin } });
        if (!rest) return errRes(res, "notFound", 404, lang);
        rest.name = body.name,
            rest.bgImage = body.bgImage,
            rest.floorMap = body.floorMap,
            rest.numOfTable = body.numOfTable,
            rest.openDate = body.openDate,
            rest.closeDate = body.closeDate,

            await rest.save();
        // return token
        return okRes(res, { rest });
    }

    static async deleteResturant(req, res): Promise<object> {
        let lang: any;
        lang = req.query.lang;
        let id = req.params.id;
        let rest;


        rest = await Resturant.findOne({ where: { id: id, admin: req.admin } });
        if (!rest) return errRes(res, "notFound", 404, lang);
        rest = await Resturant.delete(id);

        return okRes(res, { rest });
    }



}