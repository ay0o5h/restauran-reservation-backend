import * as cors from "cors";
import * as express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import notFound from "../middlewares/web/notFount";
import dashv1 from "../routes/dash/v1";
import webv1 from "../routes/web/v1";
const app = express();

const port = process.env.PORT || 3000;


createConnection()
    .then(async (connection) => {
        app.use(cors());
        app.use(express.json());
        app.use("/v1", webv1);
        app.use("/dash/v1", dashv1);
        app.use(notFound);
        app.listen(port, () => console.log(`Running on ${port}`));
    })
    .catch((error) => console.log(error));