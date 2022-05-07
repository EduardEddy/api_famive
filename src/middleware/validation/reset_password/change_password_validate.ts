import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator"; 
import User from "../../../models/user";

class ChangePasswordValidateRequest 
{
    validData  = () =>{
        return [
            body('password').isLength({min:6}).withMessage('must be at least 6 chars long').notEmpty().withMessage('it cant be empty'),
            body('code').notEmpty().withMessage('it cant be empty'),
        ]
    }
    
    validate = (req:Request, res:Response,next:NextFunction) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) { return next() }

        const extractedErrors:any = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
      
        return res.status(422).json({
          errors: extractedErrors,
        })
    }
}

export default ChangePasswordValidateRequest