import { errRes } from "../../utility/util.service";

export default (req, res, next) => {
    let lang: any;
    lang = req.query.lang;
    return errRes(res, "notFound", 404, lang);
};