import { errRes, okRes } from "../../utility/util.service";
import { Resturant } from './../../src/entity/Resturant';

import moment = require("moment");
export default class BookingController {

    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async makeBooking(req, res): Promise<object> {
        let id = req.params.id;
        let lang: any;
        lang = req.query.lang;
        let rest = await Resturant.findOne({
            where: { id: id },
            join: {
                alias: "rest",
                leftJoinAndSelect: {
                    table: "rest.table",
                },
            }
        });
        let o = moment(rest.openDate).format('LT');
        let c = moment(rest.closeDate).format('LT');
        let n = moment().format('LT');
        if (o === n) return errRes(res, "resturant is open");
        if (c === n) return errRes(res, "resturant is closed");
        if (o !== n && c !== n) return errRes(res, "way to go my sun");

        return okRes(res, { rest, o, c, n });


    }

}