export default class Validate {
    constructor(parameters) { }

    static register = (must = true) => ({
        firstName: {
            presence: must,
            type: "string",
        },
        lastName: {
            presence: must,
            type: "string",
        },
        phone: {
            presence: must,
            type: "string",
        },
        password: {
            presence: must,
            type: "string",
        },
    });

    static login = (must = true) => ({
        phone: {
            presence: must,
            type: "string",
        },
        password: {
            presence: must,
            type: "string",
        },
    });

    static forget = (must = true) => ({
        phone: {
            presence: must,
            type: "string",
        },
    });

    static verifyPassword = (must = true) => ({
        passwordOtp: {
            presence: must,
            type: "number",
        },
        newPassword: {
            presence: must,
            type: "string",
        },
    });
    static resturant = (must = true) => ({
        name: {
            presence: must,
            type: "string",
        },
        bgImage: {
            presence: must,
            type: "string",
        },
        floorMap: {
            presence: must,
            type: "string",
        },
        numOfTable: {
            presence: false,
            type: "number",
        },
        openDate: {
            presence: must,
            type: "string",
        },
        closeDate: {
            presence: must,
            type: "string",
        },


    });
    static table = (must = true) => ({
        x: {
            presence: must,
            type: "number",
        },
        y: {
            presence: must,
            type: "number",
        },
        rest: {
            presence: must,
            type: "number",
        },
    });
}