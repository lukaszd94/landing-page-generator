import { HttpClientHelper, StatusCodes } from "../core/utils/http-client.helper.js";
import { GeneratorRepository } from "./generator.repo.js";
import { Request, Response } from "express";
import { DEFINED_ERRORS } from "../core/utils/definedErrors.js";
import { PageComponent } from "./generator.model.js";
import { Server } from 'socket.io';

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

  static async savePageComponent(req: Request, res: Response, io: Server) {
    try {

      const pageComponent = req.body;
      const pageComponentId = +req.params.pageComponentId;
      await GeneratorRepository.savePageComponent(pageComponentId, pageComponent);
      const generatedComponentUrl = await GeneratorRepository.generatePageComponent(pageComponentId);

      io.emit('generated', {
        pageComponentId: pageComponentId,
        pageComponentUrl: generatedComponentUrl
      });

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

  static async generatePageComponent(req: Request, res: Response, io: Server) {
    try {

      const pageComponentId = +req.params.pageComponentId;
      const generatedComponentUrl = await GeneratorRepository.generatePageComponent(pageComponentId);

      io.emit('generated', {
        pageComponentId: pageComponentId,
        pageComponentUrl: generatedComponentUrl
      });

      HttpClientHelper.send<string>(res, {
        payload: generatedComponentUrl,
        code: StatusCodes.SUCCESS,
      });
    } catch (err) {
      HttpClientHelper.send<void>(res, {
        error: DEFINED_ERRORS.UNKNOWN_ERROR,
        code: StatusCodes.INTERNAL_ERROR,
      });
    }
  }

  static async createPageComponent(req: Request, res: Response) {
    try {

      const pageComponent = req.body;
      const newPageComponentId = await GeneratorRepository.createPageComponent(pageComponent);

      HttpClientHelper.send<number>(res, {
        payload: newPageComponentId,
        code: StatusCodes.SUCCESS,
      });
    } catch (err) {
      HttpClientHelper.send<void>(res, {
        error: DEFINED_ERRORS.UNKNOWN_ERROR,
        code: StatusCodes.INTERNAL_ERROR,
      });
    }
  }

  static async deletePageComponent(req: Request, res: Response) {
    try {

      const pageComponentId = +req.params.pageComponentId;
      await GeneratorRepository.deleteGeneratedComponent(pageComponentId);

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
 static async getPageComponentUrl(req: Request, res: Response) {
    try {

      const pageComponentId = +req.params.pageComponentId;
      const url = await GeneratorRepository.getPageComponentUrl(pageComponentId);

      HttpClientHelper.send<string>(res, {
        payload: url,
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
