import { RespInterface } from "../interfaces/resp.interface";
import UserRepository from "../repositories/user.repository";
import BaseService from "./base.service"

class UserService extends BaseService {
    
    _userRepository:UserRepository;
    constructor(userRespository:UserRepository) {
        super(userRespository)
        this._userRepository = userRespository;
    }

    suspended = async(id:number):Promise<RespInterface> => {
        try {
            if(!id){
                return { status:400, message: 'The id is required'}
            }
            const user = await this._userRepository.show(id)
            if(!user){
                return { status:404, message: 'User not found'}
            }
            await this._userRepository.suspended(id)
            return { status:200, message:"success" }
        } catch (error) {
            console.log(`error: ${this._userRepository } suspended services:  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }

    findByEmail = async(email:string):Promise<RespInterface> => {
        try {
            const user = await this._userRepository.findByEmail(email)
            
            if(!user){ return { status:404, message:'user not found'}}
            return {status:200, message:'success', data:user}
        } catch (error) {
            console.log(`error: ${this._userRepository } findByEmail services:  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }

    where = async(data:object, info:string):Promise<RespInterface> =>{
        try {
            const user = await this._userRepository.where(data)
            if(!user){
                return { message:`Invalid ${info}`, status:404 }
            }
            return { status:200, message:'success',data:user }
        } catch (error) {
            console.log(`error: userService where0 function:  ${error}`)
            return { status:500, message:'Internal error' }    
        }
    }
}

export default UserService