import { RespInterface } from "../interfaces/resp.interface";
import BaseService from "./base.service";

class EventService extends BaseService 
{
    _eventRepository:any
    constructor(eventRepository:any){
        super(eventRepository)
        this._eventRepository = eventRepository
    }

    inactive = async (id:number):Promise<RespInterface>=>{
        try {
            if(!id){ return { status:400, message: 'The id is required'} }

            const user = await this._eventRepository.show(id)
            if(!user){ return { status:404, message: 'Event not found'} }

            await this._eventRepository.inactive(id)
            return { status:200, message:"success" }
        } catch (error) {
            console.log(`error: ${this._eventRepository as String } suspended services:  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }
}

export default EventService