import { NextFunction, Response, Request } from "express"
import { body, validationResult } from "express-validator"

class UpdateValidateRequest {
    
    validData = () => {
        return [
            body('name').notEmpty().withMessage('it cant be empty'),
            body('lastname').notEmpty().withMessage('it cant be empty'),
            body('phone').notEmpty().withMessage('it cant be empty'),
            body('city').notEmpty().withMessage('it cant be empty'),
            body('country').notEmpty().withMessage('it cant be empty'),
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



export default UpdateValidateRequest;