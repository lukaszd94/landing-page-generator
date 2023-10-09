import { DbService } from "../core/utils/db.service.js";
import { Component } from "./generator.model.js";

export class GeneratorRepository {
  constructor() {}

  static async getPageComponents(): Promise<Component[]>  {
    const queryResult = await DbService.runQuery(
      "SELECT * FROM components"
    );

    return queryResult.map((item: Component) => item);
  }


  static async generatePage(): Promise<void>  {

  }
}
