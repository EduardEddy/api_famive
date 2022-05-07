import cloudinary from "cloudinary";
import makeRandom from "./random_string";

 const uploadToCloudinary = async (path:any, id:number, name:string)=>{
    const newName = makeRandom(20)
    
    const resp = await cloudinary.v2.uploader.upload(path.tempFilePath, {public_id:`${name}/${name}_${id}/${newName}`},
    (err: any,result: any)=>{
        if(err !== undefined){
            return err
        }
        result.name = 'success'
        return result
    });
    return resp
}

export default uploadToCloudinary;
