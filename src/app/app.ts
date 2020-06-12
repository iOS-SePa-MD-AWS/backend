import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import { createRouter } from "./router"

export const app = () => {
    const app = express()

    app.use(cors())
    app.use(helmet())
    app.use(express.json())

    app.get("/health", (req, res) => {
        res.status(200).json({status: "200 - ok"})
    })

    app.use("api", createRouter)

    app.use("*", (req,res) => { throw new Error("Page not found!") })

    return app
}