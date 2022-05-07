import { DataTypes } from "sequelize";
import db from '../../config/db/connection';
import Event from './event'

const ImageEvent = db.define('image_events',{
    url:DataTypes.STRING,
    eventId:DataTypes.INTEGER
})

Event.hasMany(ImageEvent)
ImageEvent.belongsTo(Event, { foreignKey:'eventId'})

export default ImageEvent;