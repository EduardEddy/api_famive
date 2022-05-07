import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize({
	dialect: 'mysql',
    database: process.env.DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
	//storage: './db.sqlite',
});

export const migrator = new Umzug({
	migrations: {
		glob: ['migrations/*.ts', { cwd: __dirname }],
	},
	context: sequelize,
	storage: new SequelizeStorage({
		sequelize,
	}),
	logger: console,
});

export type Migration = typeof migrator._types.migration;