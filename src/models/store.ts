import { DataTypes } from "sequelize";
import db from '../../config/db/connection';
import User from './user'
//import Product from "./product";

const Store = db.define('stores',{
    name:DataTypes.STRING,
    phone:DataTypes.STRING,
    address:DataTypes.STRING,
    schedule:DataTypes.STRING,
    country:DataTypes.STRING,
    city:DataTypes.STRING,
    image:DataTypes.STRING,
    userId:DataTypes.INTEGER,
    suspended:DataTypes.BOOLEAN
});

User.hasOne(Store)
Store.belongsTo(User,{as:'store', foreignKey:'userId'})

export default Store;