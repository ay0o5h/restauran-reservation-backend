import { Booking } from "../../src/entity/Booking";
import { Tables } from "../../src/entity/Tables";
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
        let body = req.body;
        let book;
        let table;
        let rest = await Resturant.findOne({
            where: { id: id },
            join: {
                alias: "rest",
                leftJoinAndSelect: {
                    table: "rest.table",
                },
            }
        });
        let open = moment(rest.openDate).format('LT');
        let close = moment(rest.closeDate).format('LT');
        let nowDate = moment().format('LT');
        console.log(nowDate);
        console.log(close);
        console.log(open);


        if (open === nowDate) errRes(res, "resturantOpen", 404, lang);
        else if (close === nowDate) errRes(res, "resturantClose", 404, lang);
        else if (open !== nowDate && close !== nowDate) {

            console.log("way to go my sun");
            for (let i = 0; i < rest.table.length; i++) {
                if (rest.table[i].isBooked && body.table === rest.table[i].id) {
                    errRes(res, "tableIsBooked", 404, lang);
                } else {
                    book = await Booking.create({
                        numOfPeople: body.numOfPeople,
                        resTime: body.resTime,
                        user: req.user,
                        table: body.table,
                    });
                    table = await Tables.findOne({ where: { id: body.table } })

                    table.isBooked = true
                }
            }
            await table.save();
            await book.save();
        }
        return okRes(res, { book });
    }
    static async EditReservation(req, res): Promise<object> {
        let id = req.params.id;
        let lang: any;
        lang = req.query.lang;
        let body = req.body;

        let data = await Booking.findOne({ where: { id: id }, });
        data.numOfPeople = body.numOfPeople;
        data.resTime = body.resTime;
        data.table = body.table,
            await data.save();

        return okRes(res, { data });
    }
    static async cancalReservation(req, res): Promise<object> {
        let id = req.params.id;
        let lang: any;
        lang = req.query.lang;
        let data
        data = await Booking.findOne({ where: { id: id }, });

        if (!data) return errRes(res, "notFound", 404, lang);
        data.status = "cancaled";
        await data.save();

        return okRes(res, { data });
    }
    static async DeleteReservation(req, res): Promise<object> {
        let id = req.params.id;
        let lang: any;
        lang = req.query.lang;
        let data
        data = await Booking.findOne({ where: { id: id }, });
        if (!data) return errRes(res, "notFound", 404, lang);
        data = await Booking.delete(id);
        return okRes(res, { data });
    }
}