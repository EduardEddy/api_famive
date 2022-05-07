import { ProductsInterface } from "../interfaces/product.interface";
import { RespInterface } from "../interfaces/resp.interface";
import BaseService from "./base.service";

class ProductService extends BaseService {
    _productRepository:any
    constructor(productRepository:any) {
        super(productRepository)
        this._productRepository = productRepository
    }

    create = async (entity:any):Promise<RespInterface> => {
        try {
            const store = await this._productRepository.create(entity) as ProductsInterface
            return { status: 201, message:'success', data:store}
        } catch (error) {
            console.log(`error: StoreService create :  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }

    inactive = async(id:number):Promise<RespInterface> => {
        try {
            if(!id){ return { status:400, message: 'The id is required'} }

            const user = await this._productRepository.show(id)
            if(!user){ return { status:404, message: 'Product not found'} }

            await this._productRepository.inactive(id)
            return { status:200, message:"success" }
        } catch (error) {
            console.log(`error: ${this._productRepository as String } suspended services:  ${error}`)
            return { status:500, message:'Internal error' }
        }
    }
}

export default ProductService