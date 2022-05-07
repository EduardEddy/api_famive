import { DataTypes } from "sequelize";
import { Migration } from "../umzug";

export const up: Migration = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable('users',{
        id: {
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        profile:{
            type:DataTypes.ENUM('user','admin','supplier'),
            allowNull:false
        },
        phone:{
            type:DataTypes.STRING(15),
            allowNull:true
        },
        status:{
            type:DataTypes.ENUM('active','inactive'),
            defaultValue:'inactive'
        },
        suspended:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        confirmToken:{
            type:DataTypes.STRING,
            allowNull:true
        },
        city:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        country:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false
        },
        updatedAt:{
            type:DataTypes.DATE,
            allowNull:false
        }
    })
}

export const down: Migration = async ({context:sequelize}) => {
    await sequelize.getQueryInterface().dropTable('users');
}