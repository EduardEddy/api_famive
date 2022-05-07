import { DataTypes } from "sequelize";
import { Migration } from "../umzug";

export const up: Migration = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable('reset_password',{
        email: {
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true
        },
        token:{
            type:DataTypes.STRING,
            allowNull:false
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
    await sequelize.getQueryInterface().dropTable('reset_password');
}