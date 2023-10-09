// import { Request, Response } from 'express';
// import { DEFINED_ERRORS } from './definedErrors.js';
// import { validationSchemaConfig } from "../../routes.js";
// import { HttpClientHelper, StatusCodes } from './http-client.helper.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function requestValidator(req: Request, res: Response, next: any) {
//   try {
//     const body = req.body;
//     const schema = validationSchemaConfig[req.route.path];
//     const validationResult = schema.validate(body);

//     if (validationResult.error) {
//       HttpClientHelper.send<void>(res, {
//         error: DEFINED_ERRORS.SCHEMA_VALIDATION_ERROR,
//         // innerExption: {
//         //   message: 'Body params not valid for this endpoint',
//         //   details: validationResult.error
//         // },
//         code: StatusCodes.UNPROCESSABLE_CONTENT
//       });

//       return 0;
//     }

//     next();
//   } catch (err) {
//     HttpClientHelper.send<void>(res, { error: DEFINED_ERRORS.SCHEMA_VALIDATOR_UNKNOWN_ERROR, code: StatusCodes.INTERNAL_ERROR });
//   }
// }
