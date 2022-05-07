import BaseRepository from "./base.repository";

class UserRepository extends BaseRepository {
    _user:any
    constructor( User:any ){
        super(User)
        this._user = User
    }

    suspended = async (id:number) => {
        return await this._user.update({'suspended':true},{where:{'id':id}})
    }

    findByEmail = async (email:string) => {
        return await this._user.findOne({where:{'email':email}})
    }
}

export default UserRepository;