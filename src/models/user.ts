import { DataTypes } from "sequelize";
import db from '../../config/db/connection';

const User = db.define('users',{
    name:DataTypes.STRING,
    lastname:DataTypes.STRING,
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    profile:DataTypes.STRING,
    phone:DataTypes.STRING,
    status:DataTypes.STRING,
    suspended:DataTypes.BOOLEAN,
    confirmToken:DataTypes.STRING,
    city:DataTypes.STRING,
    country:DataTypes.STRING,
})

User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());  
    delete values.password;
    return values;
}

export default User;