import { DataTypes } from "sequelize";
import { Migration } from "../umzug";

export const up: Migration = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable('countries_code',{
        id: {
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        phoneCode:{
            type:DataTypes.INTEGER,
        },
        countryCode:{
            type:DataTypes.STRING,
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW
        },
        updatedAt:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW
        }
    })
}

export const down: Migration = async ({context:sequelize}) => {
    await sequelize.getQueryInterface().dropTable('countries_code');
}