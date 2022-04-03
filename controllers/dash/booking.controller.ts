import { Booking } from "../../src/entity/Booking";
import { Resturant } from "../../src/entity/Resturant";
import { Tables } from "../../src/entity/Tables";
import { errRes, okRes } from "../../utility/util.service";

import moment = require("moment");
export default class BookingController {

    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async makeItDone(req, res): Promise<object> {
        let id = req.params.id;
        let idtable = req.params.table
        let lang: any;
        lang = req.query.lang;
        let booking, table;
        booking = await Booking.findOne({ where: { id: id } })
        booking.isEnd = true;
        await booking.save();
        table = await Tables.findOne({ where: { id: idtable } })
        table.isBooked = false;
        await table.save();

        return okRes(res, { table, booking });
    }
    static async changeState(req, res): Promise<object> {
        let id = req.params.id;
        let lang: any;
        lang = req.query.lang;
        let data;
        let body = req.body;
        data = await Booking.findOne({ where: { id: id }, });
        if (!data) return errRes(res, "notFound", 404, lang);
        data.status = body.status;
        body.status === "reject" ? data.isEnd = true : data.isEnd = false;
        await data.save();

        return okRes(res, { data });
    }
    static async getActiveBookings(req, res): Promise<object> {
        let id = req.params.id;
        let lang: any;
        lang = req.query.lang;
        // let data = await Booking.find({
        //     isEnd: false, user: req.user,

        // },

        // );
        let rest = await Resturant.find({
            where: { admin: req.admin },
            join: {
                alias: "rest",
                leftJoinAndSelect: {
                    table: "rest.table",
                    book: "table.book",
                    user: "book.user",
                },
            }
        });
        return okRes(res, { rest });
        // return okRes(res, { data })
    }
}