import BaseRepository from "../base.repository";

class LoginRepository extends BaseRepository {
    _user:any
    constructor(user:any) {
        super(user)
        this._user = user
    }

    login = async(email:string)=>{
        return this._user.findOne({
            where: { 
                'email': email,
                'status':"active", 
                "suspended":false 
            }
        })
    }

    newCode = async (email:string, confirmToken:number )=> {
        return this._user.update({confirmToken:confirmToken},{where:{'email':email}})
    }
}

export default LoginRepository