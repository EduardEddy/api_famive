import { Request, Response } from "express";
import User from "../../models/user";
import bcrypt from 'bcrypt'
import UserService from "../../services/user.service";
import makeRandomNumber from "../../helpers/random_number";
import UserRepository from "../../repositories/user.repository";
import { RespInterface } from "../../interfaces/resp.interface";

class UserCtrl {
    private static instance: UserCtrl;
    userService:UserService;
    constructor(){
        this.userService = new UserService(new UserRepository(User))
    }
    
    public static getInstance(): UserCtrl {
        if( !UserCtrl.instance ){ UserCtrl.instance = new UserCtrl }
        return UserCtrl.instance
    }

    index = async ( req:Request, res:Response ) =>{
        const user:RespInterface = await this.userService!.get()
        return res.status(user.status).json(user.data ?? {'message':user.message});
    }

    show = async (req:Request, res:Response) =>{
        const { id } = req.params
        const user = await this.userService!.show(id as unknown as number)
        return res.status(user.status).json(user.data ?? {message:user.message})
    }

    store = async (req:Request, res:Response)=>{
        const {body} = req;
        body.confirmToken = await makeRandomNumber()
        body.password = await bcrypt.hash(body.password,10)
        const user = await this.userService!.create(body)
        return res.status(user.status).json({ message:user.message })
    }

    udpate = async (req:Request, res:Response)=>{
        const { password, email, profile, confirmToken, inactive, ...rest} = req.body
        const { id } = req.params
        const user = await this.userService!.update(rest, id as unknown as number)
        return res.status(user.status).json({ message:user.message })
    }

    delete = async (req:Request, res:Response)=>{
        const { id } = req.params
        const user = await this.userService!.suspended(id as unknown as number)
        return res.status(user.status).json({ message:user.message })
    }
}

export default UserCtrl;