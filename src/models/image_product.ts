import { DataTypes } from "sequelize";
import db from '../../config/db/connection';
import Product from './product'

const ImageProduct = db.define('image_products',{
    url:DataTypes.STRING,
    productId:DataTypes.INTEGER
})

Product.hasMany(ImageProduct)
ImageProduct.belongsTo(Product, { foreignKey:'productId'})

export default ImageProduct;