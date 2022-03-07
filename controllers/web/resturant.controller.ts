import { errRes, okRes } from "../../utility/util.service";
import { Resturant } from './../../src/entity/Resturant';
export default class ResturantController {

    /**
     *
     * @param req
     * @param res
     * @returns
     */
    static async getAllResturants(req, res): Promise<object> {

        let rest = await Resturant.find({
            join: {
                alias: "rest",
                leftJoinAndSelect: {
                    table: "rest.table",
                },
            }
        });
        return okRes(res, { rest });

    }
    static async getOneResturant(req, res): Promise<object> {
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
        if (!rest) return errRes(res, "notFound", 404, lang);
        return okRes(res, { rest });

    }
}