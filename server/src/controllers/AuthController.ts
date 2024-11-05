import { Request, Response } from "express"
import prisma from "../config/db.config.js"
import  jwt from "jsonwebtoken"
interface LoginPayloadType{
    name : string | null
    email : string | null
    provider : string | null
    oauth_id : string | null
    image? : string | null
    
}
class AuthController{
    static async login(request:Request, response : Response){
        try{
            const body: LoginPayloadType = request.body
            let findUser = await prisma.user.findUnique({
                where:{
                    email : body.email
                }
            })
            if(!findUser){
                findUser = await prisma.user.create({
                    data: body
                })
            }
            const JWTPayload = {
                name : findUser.name,
                id : findUser.id,
                email : findUser.email
            }
            const token = jwt.sign(JWTPayload,process.env.JWT_PASSWORD)
        }catch(error){

        }
    }
}
export default AuthController