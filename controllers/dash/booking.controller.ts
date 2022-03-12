import { Booking } from "../../src/entity/Booking";
import { Tables } from "../../src/entity/Tables";
import { okRes } from "../../utility/util.service";

import moment = require("moment");
export default class BookingController {

    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async changeState(req, res): Promise<object> {
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
}