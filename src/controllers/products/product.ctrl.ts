import { Request, Response } from "express";
import uploadToCloudinary from "../../helpers/cloudinary_upload";
import { ProductsInterface } from "../../interfaces/product.interface";
import { UserInterface } from "../../interfaces/user.interface";
import ImageProduct from "../../models/image_product";
import Product from "../../models/product";
import ProductRepository from "../../repositories/product.repository";
import ProductService from "../../services/product.service";

class ProductCtrl {
    private static instance: ProductCtrl;
    _productService:ProductService
    constructor(){
        this._productService=new ProductService(new ProductRepository(Product))
    }

    public static getInstance():ProductCtrl{
        if( !ProductCtrl.instance ){ ProductCtrl.instance = new ProductCtrl }
        return ProductCtrl.instance
    }

    index = async (req:Request, res:Response) => {
        const products = await this._productService.get()
        return res.status(products.status).json(products.data)
    }

    show = async (req:Request, res:Response) => {
        const { id } = req.params
        const product = await this._productService.show(id as unknown as number)
        return res.status(product.status).json(product.data ?? {message:product.message})
    }

    store = async (req:Request, res:Response ) => {
        const _user = req.user as UserInterface
        req.body.userId = _user.id
        const { body } = req
        const product = await this._productService.create(body)
        const productData = product.data as ProductsInterface
        
        if( req.files != null){
            const result_upload = await uploadToCloudinary(req.files!.image, productData.id,'products')
            if( result_upload.name == 'Error' ){
                return res.status(400).json({
                    message:'Error to upload image'
                })    
            }else{
                await ImageProduct.create({'url':result_upload.url, 'productId':productData.id})
            }
        }
        return res.status(product.status).json({ message:product.message })
        
    }

    update = async (req:Request, res:Response ) => {
        const { id } = req.params
        const { image, ...rest } = req.body
        const product = await this._productService.update(rest, id as unknown as number)
        return res.status(product.status).json({ message:product.message })
    }

    inactive = async (req:Request, res:Response ) => {
        const { id } = req.params
        const product = await this._productService.inactive(id as unknown as number)
        return res.status(product.status).json({ message:product.message })
    }
}

export default ProductCtrl