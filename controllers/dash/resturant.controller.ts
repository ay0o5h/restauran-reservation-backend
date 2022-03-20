import * as validate from "validate.js";
import { Tables } from "../../src/entity/Tables";
import { errRes, okRes } from "../../utility/util.service";
import Validator from "../../utility/validation";
import { Resturant } from './../../src/entity/Resturant';

import moment = require("moment");


export default class ResturantController {

    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async getAllResturants(req, res): Promise<object> {

        let rest = await Resturant.find({
            where: { admin: req.admin },
            join: {
                alias: "rest",
                leftJoinAndSelect: {
                    table: "rest.table",
                },
            }
        });
        return okRes(res, { rest });

    }
    static async getResturant(req, res): Promise<object> {
        let id = req.params.id;
        let lang: any;
        lang = req.query.lang;
        let rest = await Resturant.findOne(
            {
                where: { id: id, admin: req.admin },
                join: {
                    alias: "rest",
                    leftJoinAndSelect: {
                        table: "rest.table",
                    },
                },
            });
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
        Object.keys(rest).forEach((key) => {
            if (body[key]) rest[key] = body[key];
        });
        await rest.save();
        return okRes(res, { rest });
    }

    static async deleteResturant(req, res): Promise<object> {
        let lang: any;
        lang = req.query.lang;
        let id = req.params.id;
        let rest;
        let table;

        rest = await Resturant.findOne({ where: { id: id, admin: req.admin } });
        if (!rest) return errRes(res, "notFound", 404, lang);


        table = await Tables.find({ where: { rest: id } });
        if (!table) return errRes(res, "notFound", 404, lang);

        for (let i = 0; i < table.length; i++) {
            await table[i].remove();
        }


        rest = await Resturant.delete(id);

        return okRes(res, { rest });
    }
    static async getTables(req, res): Promise<object> {
        let id = req.params.id;
        let lang: any;
        lang = req.query.lang;
        let table = await Tables.find({ where: { rest: id } });
        if (!table) return errRes(res, "notFound", 404, lang);
        return okRes(res, { table });

    }
    static async addTable(req, res): Promise<object> {
        let lang: any;
        lang = req.query.lang;
        let body = req.body;

        let notValid = validate(body, Validator.table());
        if (notValid) return errRes(res, notValid);


        let table;
        table = await Tables.findOne({ where: { rest: body.rest, x: body.x, y: body.y } });
        if (table) return errRes(res, "alreadyExist", 400, lang);

        table = await Tables.create({
            ...body
        })
        await table.save();
        // return token
        return okRes(res, { table });
    }
    static async editTable(req, res): Promise<object> {
        let id = req.params.id
        let lang: any;
        lang = req.query.lang;
        let body = req.body;

        let notValid = validate(body, Validator.table(false));
        if (notValid) return errRes(res, notValid);


        let table = await Tables.findOne({ where: { id: id } });
        if (!table) return errRes(res, "notFound", 404, lang);
        // table.x = body.x,
        //     table.y = body.y,
        Object.keys(table).forEach((key) => {
            if (body[key]) table[key] = body[key];
        });

        await table.save();
        // return token
        return okRes(res, { table });
    }
    static async deleteTable(req, res): Promise<object> {
        let lang: any;
        lang = req.query.lang;
        let id = req.params.id;
        let table;
        table = await Tables.findOne({ where: { id: id } });
        if (!table) return errRes(res, "notFound", 404, lang);
        table = await Tables.delete(id);
        return okRes(res, { table });
    }
    static async updateStateOpining(req, res): Promise<object> {
        let id = req.params.id;
        let rest = await Resturant.findOne({ where: { id: id } });
        var hours = [];

        for (let i = Number(moment(rest.closeDate).format("HH")); i < 24; i++) {
            hours.push(i);
        }
        for (let j = Number(moment(rest.openDate).format("HH")) - 1; j > 0; j--) {
            hours.push(j);
        }
        if (hours.includes(Number(moment().format("HH")))) {

            rest.isOpen = false;
        } else {
            rest.isOpen = true;

        }
        await rest.save();
        return okRes(res, { rest });
    }
}