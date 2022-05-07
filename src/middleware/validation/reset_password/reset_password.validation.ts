import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator"; 
import User from "../../../models/user";

class ResetPasswordValidationRequest 
{
    validData = () => {
        return [
            body('email').isEmail().withMessage('Invalid email')
                .notEmpty().withMessage('it cant be empty')
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

export default ResetPasswordValidationRequest