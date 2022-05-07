import { RespInterface } from "../interfaces/resp.interface";
import { StoreInterface } from "../interfaces/strore.interface";
import BaseService from "./base.service";

class StoreService extends BaseService
{
    _storeRespository:any
    constructor(storeRepository:any) {
        super(storeRepository)
        this._storeRespository = storeRepository
    }

    create = async (entity:any):Promise<RespInterface> => {
        try {
            const store = await this._storeRespository.create(entity) as StoreInterface
            return { status: 201, message:'success', data:store}
        } catch (error) {
            console.log(`error: StoreService create :  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }

    inactive = async(id:number):Promise<RespInterface> => {
        try {
            if(!id){ return { status:400, message: 'The id is required'} }

            const user = await this._storeRespository.show(id)
            if(!user){ return { status:404, message: 'Store not found'} }

            await this._storeRespository.inactive(id)
            return { status:200, message:"success" }
        } catch (error) {
            console.log(`error: ${this._storeRespository as string } suspended services:  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }

    findByUser = async(userId:number):Promise<RespInterface> => {
        try {
            if(!userId){ return { status:400, message: 'The id is required'} }

            const store = await this._storeRespository.findOne({where:{'userId':userId}})
            return {status:200, message:'success',data:store}
        } catch (error) {
            console.log(`error: findbyUser services:  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }
}

export default StoreService