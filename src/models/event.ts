import { DataTypes } from "sequelize";
import db from '../../config/db/connection';

import Store from "./store";

const Event = db.define('events',{
    title:DataTypes.STRING,
    price:DataTypes.DECIMAL,
    site:DataTypes.STRING,
    country:DataTypes.STRING,
    city:DataTypes.STRING,
    description:DataTypes.STRING,
    saleIn:DataTypes.STRING,
    category:DataTypes.STRING,
    dateEvent:DataTypes.DATE,
    storeId: DataTypes.INTEGER,
    suspended:DataTypes.BOOLEAN
})

Store.hasMany(Event)

Event.belongsTo(Store,{foreignKey:'storeId'})

export default Event;