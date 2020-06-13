import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import { createRouter } from "./application/router"
import { errorHandler } from "./application/error-handler";

export const app = async () => {
    const app = express()
    const deps = {}

    app.use(cors())
    app.use(helmet())
    app.use(express.json())

    app.get("/health", (req, res) => {
        res.status(200).json({status: "200 - ok"})
    })

    app.use("/api", createRouter(deps))

    app.all("*", (req,res) => { res.status(404).json({status:"404 - not found"}) })

    app.use(errorHandler());
    
    return app
}