"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = exports.getOtp = exports.errRes = exports.okRes = void 0;
/**
 * ReE
 * @param body
 */
var errRes = function (res, err, code, lang, v, key) {
    if (code === void 0) { code = 400; }
    if (lang === void 0) { lang = "en"; }
    if (v === void 0) { v = ""; }
    if (key === void 0) { key = "err"; }
    if (typeof err == "object" && typeof err.message != "undefined") {
        err = err.message;
    }
    else if (typeof err == "string") {
        // translate the error
        err = translate(err, lang, v);
        var obj = {};
        obj[key] = [err];
        err = obj;
    }
    if (typeof code !== "undefined")
        res.statusCode = code;
    console.log(typeof err);
    return res.json({ status: false, errMsg: err });
};
exports.errRes = errRes;
var translate = function (errCode, lang, v) {
    var obj = {
        en: {
            default: "Something went wrong",
            emptyCart: "cart shouldn't be empty",
            phoneInvalid: "Phone ".concat(v, " is not valid"),
            phoneExist: " this number ".concat(v, " is already exist"),
            otpReq: "Otp is required",
            otpIncorrect: "otp is incorrect",
            complete: "Please complete the registration process",
            incorrectCred: "Incorrect credentials",
            userNotFound: "User not found",
            invalidOtp: "invalid one time password",
            needRegister: "You need to register",
            notActive: "the account is not active",
            verifyAccount: "Please verify your account",
            notFound: "Not Found",
            alreadyVerified: "You are already verified",
            alreadyExist: " already exist",
            resturantOpen: "resturant open now",
            resturantClose: "resturant close now",
            invalidtoken: "invalid token",
            tableIsBooked: "table is already booked",
        },
        ar: {
            default: "حصل خطأٌ ما ",
            emptyCart: "الرجاء ملئ السله",
            phoneExist: " \u0647\u0630\u0627 \u0627\u0644\u0631\u0642\u0645 ".concat(v, " \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644"),
            phoneInvalid: " \u0647\u0630\u0627 \u0627\u0644\u0631\u0642\u0645 ".concat(v, " \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"),
            otpReq: "رمز التحقق مطلوب",
            otpIncorrect: "رمز التحقق غير صحصح",
            complete: "اكمل عملية التسجيل من فضلك ",
            incorrectCred: "هناك خطأ ما في رقم او كلمة المرور",
            userNotFound: "المستخدم هذا غير موجود",
            invalidOtp: "رمز المرور غير صالح",
            needRegister: "تحتاج الى تسجيل",
            notActive: "الحساب غير مفعل",
            verifyAccount: "من فضلك قم بتأكيد حسابك",
            notFound: "غير موجود",
            alreadyVerified: "حسابك مؤكد بلفعل",
            alreadyExist: "موجود بلفعل",
            resturantOpen: "المطعم مفتوح الان يمكنك الحجز",
            resturantClose: "المطعم مغلق الان ",
            invalidtoken: "invalid token",
            tableIsBooked: "الطاولة محجوزه بلفعل",
        },
    };
    return obj[lang][errCode] ? obj[lang][errCode] : obj[lang]["default"];
};
/**
 * ReS
 * @param body
 */
var okRes = function (res, data, code) {
    if (code === void 0) { code = 200; }
    // Success Web Response
    var sendData = { status: true, errMsg: "" };
    if (typeof data == "object") {
        sendData = Object.assign(data, sendData); //merge the objects
    }
    if (typeof code !== "undefined")
        res.statusCode = code;
    return res.json(sendData);
};
exports.okRes = okRes;
var getOtp = function () { return Math.floor(1000 + Math.random() * 9000); };
exports.getOtp = getOtp;
// const getOtp = () => 1111;
var paginate = function (p, s) {
    if (p === void 0) { p = 1; }
    if (s === void 0) { s = 10; }
    return ({ take: s, skip: (p - 1) * s });
};
exports.paginate = paginate;
//# sourceMappingURL=util.service.js.map