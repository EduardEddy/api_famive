import express, { Application } from 'express'

import * as routePath from '../src/routes/index'
//import {userRoutes, authRoutes, storeRoute, productRoute, eventRouter, activeAccount, imageRoute, recoveryPassword } from '../src/routes/index'
import cloudinary from 'cloudinary'
import fileUpload from "express-fileupload";

class Server {
    private app: Application;
    port: string;

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT || "8000";

        this.middleware()
        this.routes()
    }

    listen():void{
        this.app.listen(this.port, ()=>{
            console.log('Server run in port '+this.port)
        })
    }
    
    routes():void{
        this.app.use('/api', routePath.authRoutes )
        this.app.use('/api', routePath.activeAccount )
        this.app.use('/api', routePath.recoveryPassword )
        this.app.use('/api/users', routePath.userRoutes )
        this.app.use('/api/stores', routePath.storeRoute )
        this.app.use('/api/products', routePath.productRoute )
        this.app.use('/api/events', routePath.eventRouter )
        this.app.use('/api', routePath.imageRoute )
    }
    
    middleware(){
        //this.app.use(passport.initialize())
        // read body parser
        this.app.use(express.json())

        //fileupload configuration
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
        // configuration cloudinary
        cloudinary.v2.config({
            cloud_name: process.env.CLOUD_NAME_CLOUDINARY, 
            api_key: process.env.API_KEY_CLOUDINARY, 
            api_secret: process.env.API_SECRET_CLOUDINARY,
            secure: true
        })
    }
}

export default Server;
