import Store from "../../models/store";
import { Request, Response } from "express";
import uploadToCloudinary from "../../helpers/cloudinary_upload";
import { StoreInterface } from "../../interfaces/strore.interface";
import { UserInterface } from "../../interfaces/user.interface";
import StoreService from "../../services/store.service";
import StoreRepository from "../../repositories/store.repository";

class StoreCtrl {
    private static instance: StoreCtrl;
    _storeService:StoreService

    constructor(){
        this._storeService = new StoreService(new StoreRepository(Store))
    }

    public static getInstance(): StoreCtrl {
        if( !StoreCtrl.instance ){ StoreCtrl.instance = new StoreCtrl }
        return StoreCtrl.instance
    }

    index = async (req:Request, res:Response) => {
        const stores = await this._storeService.get()
        return res.status(stores.status).json(stores.data)
    }

    show = async (req:Request, res:Response) => {
        const { id } = req.params
        const store = await this._storeService.show(id as unknown as number)
        return res.status(store.status).json(store.data ?? {message:store.message})
    }

    stores = async (req:Request, res:Response) => {
        const _user = req.user as UserInterface
        req.body.userId = _user.id
        const { body } = req
        
        const store = await this._storeService.create(body)
        const storeData = store.data as StoreInterface
        if( req.files !== null){
            const result_upload = await uploadToCloudinary(req.files!.image, storeData!.id ,'stores')
            if( result_upload.name == 'Error' ){
                return res.status(400).json({ message:'Error to upload image' })
            }else{
                await this._storeService.update( {'image':result_upload.url}, storeData.id )
            }
        }
        return res.status(store.status).json({ message:store.message })
    }

    update = async (req:Request, res:Response) => {
        const { id } = req.params
        const { image, ...rest } = req.body
        const store = await this._storeService.update( rest, id as unknown as number)
        return res.status(store.status).json({ message:store.message })
    }

    inactive = async (req:Request, res:Response ) => {
        const { id } = req.params
        const store = await this._storeService.inactive(id as unknown as number)
        return res.status(store.status).json({ message:store.message })
    }

}

export default StoreCtrl