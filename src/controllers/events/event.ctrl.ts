import Event from '../../models/event'
import { Request, Response } from 'express'
import { UserInterface } from '../../interfaces/user.interface'
import uploadToCloudinary from '../../helpers/cloudinary_upload'
import { EventsInterface } from '../../interfaces/events.interface'
import EventService from '../../services/event.service'
import EventRepository from '../../repositories/event.repository'

class EventCtrl {
    private static instance:EventCtrl
    _eventService:EventService

    constructor(){
        this._eventService = new EventService(new EventRepository(Event))
    }

    public static getinstance():EventCtrl{
        if( !EventCtrl.instance ){ EventCtrl.instance = new EventCtrl }
        return EventCtrl.instance
    }

    index = async (req:Request, res:Response ) => {
        const events = await this._eventService.get()
        return res.status(events.status).json(events.data)
    }

    show = async ( req:Request, res:Response ) => {
        const {id} = req.params
        const event = await this._eventService.show(id as unknown as number)
        return res.status(event.status).json(event.data ?? {message:event.message})
    }

    store = async (req:Request, res:Response ) => {
        try {
            const _user = req.user as UserInterface
            req.body.userId = _user.id
            const {body} = req
            const eventResp = await this._eventService.create(body)
            const event = eventResp.data as EventsInterface
            if( req.files != null){
                const result_upload = await uploadToCloudinary(req.files!.image, event.id,'events')
                if( result_upload.name == 'Error' ){
                    return res.status(400).json({
                        message:'Error to upload image'
                    })    
                }else{
                    this._eventService.update({'image':result_upload.url},event.id)
                }
            }
            return res.status(eventResp.status).json({ message:eventResp.message })
        } catch (error) {
            console.log("Error stores ProductCtrl")
            console.log(error)
            return res.status(500).json({ message:'Internal error' })
        }
    }

    update =  async (req:Request, res:Response ) => {
        const { id } = req.params
        const { image, ...rest } = req.body
        const event = await this._eventService.update(rest, id as unknown as number)
        return res.status(event.status).json({ message:event.message })
    }

    inactive = async (req:Request, res:Response ) => {
        const { id } = req.params
        const event = await this._eventService.inactive(id as unknown as number)
        return res.status(event.status).json({ message:event.message })
    }
}

export default EventCtrl