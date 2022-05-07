import { NextFunction, Response, Request } from 'express'
import { body, validationResult } from "express-validator"
import Store from '../../../models/store';

class StoreValidation {
    validData = () => {
        return [
            body('name').notEmpty().withMessage('the name is required'),
            body('price').isNumeric().withMessage('the price is invalid').notEmpty().withMessage('the price is required'),
            body('description').notEmpty().withMessage('the description is required'),
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

export default StoreValidation