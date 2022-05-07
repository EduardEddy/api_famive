import makeRandomNumber from "../../helpers/random_number";
import { RespInterface } from "../../interfaces/resp.interface";
import ActiveAccountRepository from "../../repositories/auth/active_account.repository";
import BaseService from "../base.service";

class ActiveAccountService extends BaseService {
    _activeAccountRepository:ActiveAccountRepository
    constructor(activeAccountRepository:ActiveAccountRepository) {
        super(activeAccountRepository)
        this._activeAccountRepository = activeAccountRepository
    }

    active = async(code:number):Promise<RespInterface>=>{
        try {
            const user = await this._activeAccountRepository.active(code)
            if( !user ){ return { message:'Invalid Code', status:404}}
            this._activeAccountRepository.update({'status':"active",'confirmToken':null}, user.id)
            return { message:'success', status:200}
        } catch (error) {
            console.log(`error: Active Account services:  ${error}`)
            return { status:500, message:'Internal error' }
            
        }
    }

    newCode =  async(code:number, email:string):Promise<RespInterface>=>{
        const confirmToken = await makeRandomNumber()
        try {
            const user = await this._activeAccountRepository.newCode(confirmToken, email)
            console.log(user)
            return { message:'success', status:200 }
        } catch (error) {
            console.log(`error: new code services:  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }
}

export default ActiveAccountService