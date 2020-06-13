import { Request, Response, NextFunction } from "express";

export const singupAction = (dependencies:any) => (req:Request,res:Response, next:NextFunction) => {
    console.log("TEST!")
    res.status(200).send({xd:"XD"})
}