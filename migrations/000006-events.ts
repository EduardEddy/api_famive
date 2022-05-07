import { DataTypes } from "sequelize";
import { Migration } from "../umzug";

export const up: Migration = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable('events',{
        id: {
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        title:{
            type:DataTypes.STRING
        },
        price:{
            type:DataTypes.DECIMAL(15,2),
            defaultValue: 0.0
        },
        dateEvent:{
            type:DataTypes.DATE
        },
        site:{
            type:DataTypes.STRING,
        },
        country:{
            type:DataTypes.STRING,
            allowNull:true
        },
        city:{
            type:DataTypes.STRING,
            allowNull:true
        },
        description:{
            type:DataTypes.STRING(1000),
            allowNull:true
        },
        saleIn:{
            type:DataTypes.STRING
        },
        storeId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references:{
                model: 'stores',
                key: 'id'
            }
        },
        category:{
            type:DataTypes.STRING
        },
        suspended:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
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
    await sequelize.getQueryInterface().dropTable('events');
}