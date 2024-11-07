import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const AuthMiddleware = (req:Request, res: Response, next : NextFunction) => {
    const authHeaders = req.headers.authorization
    if( authHeaders == null || authHeaders == undefined){
        return res.status(401).json({status : 401, message: "UnAuthorized"})
    }
    const token = authHeaders.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err)
            return res.status(401).json({status : 401, message: "UnAuthorized"})
        req.user = user as AuthUser
        next();
    })
}

export default AuthMiddleware