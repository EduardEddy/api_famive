import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator"; 

class CreateValidation {
    validData = () => {
        return [
            body("name").notEmpty().withMessage('the name is required'),
            body("address").notEmpty().withMessage('the address is required'),
            body("city").notEmpty().withMessage('the city is required'),
            body("country").notEmpty().withMessage('the country is required'),
            body("phone").notEmpty().withMessage('the phone is required'),
            //body("image").notEmpty().withMessage('the image is required'),
            body("schedule").notEmpty().withMessage('the schedule is required'),
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

export default CreateValidation