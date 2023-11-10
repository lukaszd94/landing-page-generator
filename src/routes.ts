// import { requestValidator } from './core/utils/requestValidator.js';
import { Schema } from 'joi';
import { GeneratorController } from './generator/generator.ctrl.js';

export const GENERATOR_ENDPOINT = 'generator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerRoutes(router: any) {

  //===GENERATOR===
  router.post(`/${GENERATOR_ENDPOINT}/generate-page`, GeneratorController.generatePage);
  router.post(`/${GENERATOR_ENDPOINT}/download-generated-page`, GeneratorController.downloadGeneratedPage);
  router.get(`/${GENERATOR_ENDPOINT}/page-components/:pageComponentId`, GeneratorController.getPageComponentById);
  router.get(`/${GENERATOR_ENDPOINT}/page-components`, GeneratorController.getPageComponents);
  router.put(`/${GENERATOR_ENDPOINT}/page-components/:pageComponentId`, GeneratorController.savePageComponents);

}


export const validationSchemaConfig: { [key: string]: Schema } = {
}
