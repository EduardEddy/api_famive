import { DataTypes } from "sequelize";
import { Migration } from "../umzug";

export const up: Migration = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable('image_events',{
        id: {
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        url:{
            type:DataTypes.STRING,
            allowNull:false
        },
        eventId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references:{
                model: 'events',
                key: 'id'
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
    await sequelize.getQueryInterface().dropTable('image_events');
}