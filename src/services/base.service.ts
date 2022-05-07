import { RespInterface } from "../interfaces/resp.interface";

abstract class BaseService {
    private _repository:any;
    constructor(repository:any) {
        this._repository = repository
    }

    get = async ():Promise<RespInterface> => {
        try {
            return {
                status:200,
                message:'success',
                data:await this._repository.get(),
            }
        } catch (error) {
            console.log(error)
            return {
                status:500,
                message:'Internal error',
            }
        }
    }

    show = async (id:number):Promise<RespInterface> => {
        try {
            if(!id){
                return { status:400, message: 'The id is required'}
            }
            const user = await this._repository.show(id)
            if(!user){
                return { status:404, message: 'Not found'}
            }
            return { status:200, message:"success", data:user }
        } catch (error) {
            console.log(`error: ${this._repository} show services:  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }

    create = async (entity:any):Promise<RespInterface> => {
        try {
            await this._repository.create(entity)
            return { status: 201, message:'success'}
        } catch (error) {
            console.log(`error: ${this._repository} create services:  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }
    
    update = async (entity:any, id:number):Promise<RespInterface> => {
        try {
            if(!id){
                return { status:400, message: 'The id is required'}
            }
            const user = await this._repository.show(id)
            if(!user){
                return { status:404, message: 'Product not found'}
            }
            await this._repository.update(entity, id)
            return { status:200, message:"success", data:user }
        } catch (error) {
            console.log(`error: ${this._repository} update services:  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }
}

export default BaseService