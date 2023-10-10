import { DbService } from "../core/utils/db.service.js";
import { Component } from "./generator.model.js";
import Handlebars from "handlebars";
import { readFileSync, writeFileSync } from 'fs';

export class GeneratorRepository {
  constructor() { }

  static async getPageComponents(): Promise<Component[]> {
    const queryResult = await DbService.runQuery(
      "SELECT * FROM components"
    );

    return queryResult.map((item: Component) => item);
  }


  static async generatePage(body: { componentsIds: number[]}): Promise<void> {
      body[0];

      const layout = readFileSync('html-templates/layout.html', 'utf-8');

      const headerContent = readFileSync('html-templates/components/header.html', 'utf-8');
      const footerContent = readFileSync('html-templates/components/footer.html', 'utf-8');

      const template = Handlebars.compile(layout);
      const generatedPage = template({
        title: 'Generated Page',
        backgroundColor: 'rgb(100, 129, 133);',
        header: headerContent,
        footer: footerContent
      });

      console.log('Generated!');

      writeFileSync('generated/generated-page.html', generatedPage);

  }
}
