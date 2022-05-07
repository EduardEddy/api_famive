import User from "../../models/user";
import { Response, Request } from "express";
import makeRandomNumber from "../../helpers/random_number";
import ActiveAccountService from "../../services/auth/active_account.service";
import ActiveAccountRepository from "../../repositories/auth/active_account.repository";
import UserService from "../../services/user.service";
import UserRepository from "../../repositories/user.repository";
import { Console } from "console";

class ActiveAccount {
    _activeAccountService:ActiveAccountService
    _userService:UserService
    constructor(){
        this._activeAccountService = new ActiveAccountService(new ActiveAccountRepository(User))
        this._userService = new UserService(new UserRepository(User))
    }

    active = async (req:Request, res:Response) => {
        const { code } = req.body
        const user = await this._activeAccountService.active(code)
        return res.status(user.status).json({ message:user.message })
    }

    newCode = async (req:Request, res:Response) => {
        const {email} = req.body
        const confirmToken = await makeRandomNumber()
        const exist = await this._userService.findByEmail(email)
        //console.log(exist);
        
        if( exist.status == 404 ){ 
            return res.status(exist.status).json({ message:exist.message }) 
        }
        
        const user = await this._activeAccountService.newCode(confirmToken, email)
        return res.status(user.status).json({ message:user.message })
    }
}

export default ActiveAccount