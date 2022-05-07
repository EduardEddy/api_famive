import { DataTypes } from "sequelize";
import db from '../../config/db/connection';
import Store from "./store";

const Product = db.define('products',{
    name:DataTypes.STRING,
    price:DataTypes.DECIMAL,
    description:  DataTypes.STRING,
    category:DataTypes.STRING,
    storeId:DataTypes.INTEGER,
    suspended:DataTypes.BOOLEAN
})

Store.hasMany(Product)
Product.belongsTo(Store,{foreignKey:'storeId'})

export default Product;