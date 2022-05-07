import BaseRepository from "../base.repository"

class ActiveAccountRepository extends BaseRepository {
    _user:any
    constructor(user:any) {
        super(user)
        this._user = user
    }

    active = async (code:number) => {
        return this._user.findOne({where:{'confirmToken':code}})
    }

    newCode = async (confirmToken:number, email:string) => {
        return this._user.update({confirmToken:confirmToken},{where:{'email':email}})
        
    }
}

export default ActiveAccountRepository