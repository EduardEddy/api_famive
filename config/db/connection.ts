import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

const database:string = process.env.DATABASE||''
const dbUsername:string = process.env.DB_USERNAME||''
const dbPassword:string = process.env.DB_PASSWORD||''

const db = new Sequelize(database, dbUsername, dbPassword, {
    host: 'localhost',
    dialect: "mysql",
    //logging:false
});
export default db;