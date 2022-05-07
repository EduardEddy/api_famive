import { DataTypes } from "sequelize";
import { Migration } from "../umzug";

export const up: Migration = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable('stores',{
        id: {
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type:DataTypes.STRING(15),
            allowNull:true
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        schedule:{
            type:DataTypes.STRING,
            allowNull:true
        },
        country:{
            type:DataTypes.STRING,
            allowNull:true
        },
        city:{
            type:DataTypes.STRING,
            allowNull:true
        },
        image:{
            type:DataTypes.STRING,
            allowNull:true
        },
        suspended:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references:{
                model: 'users',
                key:'id'
            }
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
    await sequelize.getQueryInterface().dropTable('stores');
}