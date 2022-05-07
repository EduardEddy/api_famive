import { Request, Response } from "express";
import User from '../../models/user'
import bcrypt from 'bcrypt'
import { UserInterface } from "../../interfaces/user.interface";
import jwt from 'jsonwebtoken'
import Store from "../../models/store";
import LoginService from "../../services/auth/login.service";
import LoginRepository from "../../repositories/auth/login.respository";
import StoreService from "../../services/store.service";
import StoreRepository from "../../repositories/store.repository";

class Auth {
    _loginService:LoginService
    _storeService:StoreService
    constructor(){
        this._loginService = new LoginService( new LoginRepository(User) )
        this._storeService = new StoreService( new StoreRepository(Store) )
    }

    login = async (req:Request, res:Response)=>{

        const {body} = req        
        const dataUser = await this._loginService.login(body.email, body.password)

        if(dataUser.data == null){
            return res.status(dataUser.status).json({message:dataUser.message})
        }

        const user = dataUser.data.user
        const store = await this._storeService.findByUser(user.id!)
        return res.status(dataUser.status).json({
            user,
            token:dataUser.data!.token,
            store:store?true:false
        })
    
    }
}

export default Auth;
