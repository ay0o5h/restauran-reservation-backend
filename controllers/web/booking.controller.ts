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
    static async getActiveBookings(req, res): Promise<object> {
        let id = req.params.id;
        let lang: any;
        lang = req.query.lang;
        let data = await Booking.find({
            isEnd: false, user: req.user
        });
        return okRes(res, { data })
    }
    static async getPreviousBookings(req, res): Promise<object> {
        let id = req.params.id;
        let lang: any;
        lang = req.query.lang;
        let data = await Booking.find({
            isEnd: true, user: req.user
        });
        return okRes(res, { data })
    }
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

        table = await Tables.findOne({ where: { id: body.table } })

        if (open === nowDate) errRes(res, "resturantOpen", 404, lang);
        else if (close === nowDate) errRes(res, "resturantClose", 404, lang);
        else if (open !== nowDate && close !== nowDate) {

            console.log("way to go my sun");
            for (let i = 0; i < rest.table.length; i++) {
                if (rest.table[i].isBooked && body.table === rest.table[i].id) {
                    errRes(res, "tableIsBooked", 404, lang);
                } else {
                    try {
                        table.isBooked = true;
                        if (table.save()) {
                            book = await Booking.create({
                                numOfPeople: body.numOfPeople,
                                resTime: body.resTime,
                                user: req.user,
                                table: body.table,
                            });
                            await book.save();

                        }
                    } catch (err) {
                        console.log(err)
                    }


                }




            }
        }
        return okRes(res, { book, table });
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
        if (data.status === null) {
            data.status = "cancaled";
            data.isEnd = true;

            await data.save();
        }


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