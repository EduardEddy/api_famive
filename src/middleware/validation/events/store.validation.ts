import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator"; 
import Store from "../../../models/store";

class EventValidationRequest {
    validData = ()=>{
        return [
            body('price').notEmpty().withMessage('The price cannot be empty').isNumeric().withMessage('the price is invalid'),
            body('dateEvent').notEmpty().withMessage('The date event cannot be empty'),
            body('city').notEmpty().withMessage('The city cannot be empty'),
            body('country').notEmpty().withMessage('The country cannot be empty'),
            body('description').notEmpty().withMessage('The description cannot be empty'),
            body('saleIn').notEmpty().withMessage('The saleIn cannot be empty'),
            body('storeId').notEmpty().withMessage('the Store is required').custom(value => {
                if( value !== undefined ){
                  return Store.findByPk(value).then(store => {
                    if (!store) {
                      return Promise.reject('The Store Id is invalid');
                    }
                  });
                }
            }),
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

export default EventValidationRequest;