import { loginRespInterface } from "../../interfaces/resp.interface";
import { UserInterface } from "../../interfaces/user.interface";
import BaseService from "../base.service";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class LoginService extends BaseService {
    _loginRepository:any
    constructor(loginRepository:any) {
        super(loginRepository)
        this._loginRepository = loginRepository
    }

    login = async(email:string, password:string):Promise<loginRespInterface> => {
        try {
            const user = await this._loginRepository.login(email) as UserInterface
            if(user) {
                const info = await bcrypt.compare(password, user.password!)
                if( info ) {
                    const token = await jwt.sign(
                        {
                            'id':user.id,
                            'name':user.name,
                            'lastname':user.lastname
                        },
                        process.env.PRIVATE_KEY||'TRY-TO-TEST'
                    )
                    return {
                        status:200,
                        data:{user, token}
                    }
                }
            }
            return {
                message:'Invalid credentials',
                status:404
            }
        } catch (error) {
            console.log(`error: login services:  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }
}

export default LoginService