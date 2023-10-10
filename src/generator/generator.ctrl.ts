import { HttpClientHelper, StatusCodes } from "../core/utils/http-client.helper.js";
import { GeneratorRepository } from "./generator.repo.js";
import { Request, Response } from "express";
import { DEFINED_ERRORS } from "../core/utils/definedErrors.js";

export class GeneratorController {

  constructor() {}

  static async generatePage(req: Request, res: Response) {
    try {

      const body = req.body;

      await GeneratorRepository.generatePage(body);

      HttpClientHelper.send<string>(res, {
        payload: "ok",
        code: StatusCodes.SUCCESS,
      });
    } catch (err) {
      HttpClientHelper.send<void>(res, {
        error: DEFINED_ERRORS.UNKNOWN_ERROR,
        code: StatusCodes.INTERNAL_ERROR,
      });
    }

  }
}
