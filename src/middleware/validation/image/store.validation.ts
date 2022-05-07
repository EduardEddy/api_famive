import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator"; 

class ImageValidationRequest {
    validData = () => {
        return [
            body('referencesId').notEmpty().withMessage('The references Id cannot be empty').isNumeric().withMessage('the references Id is invalid'),
            body('model').notEmpty().withMessage('The model cannot be empty')
        ]
    }

    validate = (req:Request, res:Response, next:NextFunction ) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) { return next() }

        const extractedErrors:any = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
      
        return res.status(422).json({
          errors: extractedErrors,
        })
    }
}

export default ImageValidationRequest