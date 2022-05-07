import { DataTypes } from "sequelize";
import { Migration } from "../umzug";

export const up: Migration = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable('products',{
        id: {
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        price:{
            type:DataTypes.DECIMAL(15,2),
            allowNull: true,
            defaultValue: 0.0
        },
        description: {
            type: DataTypes.STRING(1200),
            allowNull:true,
            defaultValue:''
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
    await sequelize.getQueryInterface().dropTable('products');
}