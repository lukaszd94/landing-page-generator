// import { requestValidator } from './core/utils/requestValidator.js';
import { Schema } from 'joi';
import { GeneratorController } from './generator/generator.ctrl.js';
import { Server } from 'socket.io';

export const GENERATOR_ENDPOINT = 'generator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerRoutes(router: any, io: Server) {

  //===GENERATOR===
  router.post(`/${GENERATOR_ENDPOINT}/generate-page`, (req: Request, res: Response) => GeneratorController.generatePage(req, res));
  router.post(`/${GENERATOR_ENDPOINT}/download-generated-page`, (req: Request, res: Response) => GeneratorController.downloadGeneratedPage(req, res));
  router.get(`/${GENERATOR_ENDPOINT}/page-components/:pageComponentId`, (req: Request, res: Response) => GeneratorController.getPageComponentById(req, res));
  router.get(`/${GENERATOR_ENDPOINT}/page-components`, GeneratorController.getPageComponents);
  router.put(`/${GENERATOR_ENDPOINT}/page-components/:pageComponentId`, (req: Request, res: Response) => GeneratorController.savePageComponent(req, res, io));
  router.post(`/${GENERATOR_ENDPOINT}/page-components/:pageComponentId/generate`, (req: Request, res: Response) => GeneratorController.generatePageComponent(req, res, io));
  router.post(`/${GENERATOR_ENDPOINT}/page-components`, (req: Request, res: Response) => GeneratorController.createPageComponent(req, res));
  router.delete(`/${GENERATOR_ENDPOINT}/page-components/:pageComponentId`, (req: Request, res: Response) => GeneratorController.deletePageComponent(req, res));

}


export const validationSchemaConfig: { [key: string]: Schema } = {
}
