// import { requestValidator } from './core/utils/requestValidator.js';
import { Schema } from 'joi';
import { GeneratorController } from './generator/generator.ctrl.js';

export const GENERATOR_ENDPOINT = 'generator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerRoutes(router: any) {

  //===GENERATOR===
  router.post(`/${GENERATOR_ENDPOINT}/generate-page`, GeneratorController.generatePage);

}


export const validationSchemaConfig: { [key: string]: Schema } = {
}
