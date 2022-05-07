import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator"; 
import User from "../../../models/user";


class StoreValidateRequest {
    
    validData = () => {
        return [
            body('email').isEmail().withMessage('Email cant be empty')
            .notEmpty().withMessage('it cant be empty')
              .custom(value => {
                if( value !== undefined ){
                  return User.findOne({where:{'email':value}}).then(user => {
                    if (user) {
                      return Promise.reject('E-mail already in use');
                    }
                  });
                }
              }),
            body('password').isLength({min:6}).withMessage('must be at least 6 chars long').notEmpty().withMessage('it cant be empty'),
            body('name').notEmpty().withMessage('it cant be empty'),
            body('lastname').notEmpty().withMessage('it cant be empty'),
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

export default StoreValidateRequest;