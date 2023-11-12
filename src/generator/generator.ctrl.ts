import { HttpClientHelper, StatusCodes } from "../core/utils/http-client.helper.js";
import { GeneratorRepository } from "./generator.repo.js";
import { Request, Response } from "express";
import { DEFINED_ERRORS } from "../core/utils/definedErrors.js";
import { PageComponent } from "./generator.model.js";

export class GeneratorController {

  constructor() {}

  static async generatePage(req: Request, res: Response) {
    try {

      const templateData = req.body.templateData;

      await GeneratorRepository.generatePage(templateData);

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

  static async downloadGeneratedPage(_req: Request, res: Response) {
    try {
      await GeneratorRepository.downloadGeneratedPage();

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

  static async getPageComponentById(req: Request, res: Response) {
    try {

      const pageComponentId = +req.params.pageComponentId;
      const pageComponent = await GeneratorRepository.getPageComponentById(pageComponentId);

      HttpClientHelper.send<PageComponent>(res, {
        payload: pageComponent,
        code: StatusCodes.SUCCESS,
      });
    } catch (err) {
      HttpClientHelper.send<void>(res, {
        error: DEFINED_ERRORS.UNKNOWN_ERROR,
        code: StatusCodes.INTERNAL_ERROR,
      });
    }
  }

  static async getPageComponents(_req: Request, res: Response) {
    try {

      const pageComponents = await GeneratorRepository.getPageComponents();

      HttpClientHelper.send<Array<PageComponent>>(res, {
        payload: pageComponents,
        code: StatusCodes.SUCCESS,
      });
    } catch (err) {
      HttpClientHelper.send<void>(res, {
        error: DEFINED_ERRORS.UNKNOWN_ERROR,
        code: StatusCodes.INTERNAL_ERROR,
      });
    }
  }

  static async savePageComponents(req: Request, res: Response) {
    try {

      const pageComponent = req.body;
      const pageComponentId = +req.params.pageComponentId;
      await GeneratorRepository.savePageComponents(pageComponentId, pageComponent);

      HttpClientHelper.send<void>(res, {
        payload: null,
        code: StatusCodes.SUCCESS,
      });
    } catch (err) {
      HttpClientHelper.send<void>(res, {
        error: DEFINED_ERRORS.UNKNOWN_ERROR,
        code: StatusCodes.INTERNAL_ERROR,
      });
    }
  }

  static async generatePageComponent(req: Request, res: Response) {
    try {

      const pageComponentId = +req.params.pageComponentId;
      await GeneratorRepository.generatePageComponent(pageComponentId);

      HttpClientHelper.send<void>(res, {
        payload: null,
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
