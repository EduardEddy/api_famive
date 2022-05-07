import { Request, Response } from 'express'
import uploadToCloudinary from "../../helpers/cloudinary_upload"
import ImageEvent from '../../models/image_event'
import ImageProduct from '../../models/image_product'

class ImageCtrl {
    
    receiveImage = async (req:Request, res:Response ) => {
        var status:number = 404;
        var message:string = 'image not sent'
        const {body} = req
        if( req.files !== null && req.files !== undefined ){
            const result_upload = await uploadToCloudinary(req.files!.image, body.referencesId,body.model)
            if( result_upload.name == 'Error' ){
                message='Error to upload image'
                status=400
            }else{
                switch (body.model ) {
                    case "events":
                        await ImageEvent.create({'url':result_upload.url, 'eventId':body.referencesId})
                        break;
                
                    case "products":
                        await ImageProduct.create({'url':result_upload.url, 'productId':body.referencesId})
                        break;
                }
            }
            message='success'
            status=201
        }
        return res.status(status).json({message})
    }
}

export default ImageCtrl