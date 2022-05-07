import { Request, Response } from "express";
import makeRandomNumber from "../../helpers/random_number";
import { UserInterface } from "../../interfaces/user.interface";
import User from "../../models/user";
import bcrypt from 'bcrypt'
import UserRepository from "../../repositories/user.repository";
import UserService from "../../services/user.service";

class RecoveryPassword {
    _userService:UserService

    constructor(){
        this._userService = new UserService( new UserRepository(User)
        )
    }

    createCode = async  (req:Request, res:Response ) => {
        const {email} = req.body
        const user = await this._userService.where({'email':email,'status':"active", "suspended":false},'email')
    
        if( user.status != 200 ){ 
            return res.status(user.status).json({message:user.message})
        }
        
        const userData = user.data as UserInterface
        const confirmToken = await makeRandomNumber()
        const new_code = await this._userService.update({confirmToken:confirmToken},userData.id!)
        return res.status(new_code.status).json({message:new_code.message})
    }

    changePassword = async ( req:Request, res:Response ) => {
        const {code, password} = req.body
        const user = await this._userService.where({confirmToken:code}, 'code')
        if( user.status != 200 ){
            return res.status(user.status).json({message:user.message})
        }
        const userData = user.data as UserInterface
        const pass = await bcrypt.hash(password,10)
        const  new_data = await this._userService.update({
            'password':pass,
            "confirmToken":null
        }, userData.id!)
        
        return res.status(new_data.status).json({message:new_data.message})
    }
}

export default RecoveryPassword;