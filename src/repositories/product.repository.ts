import BaseRepository from "./base.repository";

class ProductRepository extends BaseRepository {
    _product:any
    constructor(product:any) {
        super(product)
        this._product = product
    }

    inactive = async (id:number) => {
        await this._product.update({'suspended':true},{where:{'id':id}});
    }
}

export default ProductRepository