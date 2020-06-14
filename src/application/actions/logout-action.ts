import { Request, Response, NextFunction } from "express";
import { Dependencies } from "../dependencies";

export const logoutAction = (dependencies:Partial<Dependencies>) => (req:Request,res:Response, next:NextFunction) => {
    res.status(200).send({XDDDD: "po prostu wyjeb ten token XD"})
}