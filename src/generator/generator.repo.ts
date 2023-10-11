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


  static async generatePage(body: { componentsIds: number[] }): Promise<void> {
    body[0];

    const version = 'ver1';

    try {
      const mainStylesCSS = readFileSync(`html-templates/${version}/styles/main-styles`, 'utf-8');
      const layoutHTML = readFileSync('html-templates/layout.html', 'utf-8');
      const pageTemplate = Handlebars.compile(layoutHTML);
      const mainStylesTemplate = Handlebars.compile(mainStylesCSS);

      const generatedPage = pageTemplate({
        content: {
          header: {
            title: 'Generated Page LPG',
          }
        },
        components: {
          header: {
            desktop: readFileSync(`html-templates/${version}/components/header/header-desktop.html`, 'utf-8'),
            mobile: readFileSync(`html-templates/${version}/components/header/header-mobile.html`, 'utf-8')
          },
          footer: readFileSync(`html-templates/${version}/components/footer/footer.html`, 'utf-8')
        }
      });


      const generatedMainStyle = mainStylesTemplate({
        body: {
          background: 'rgb(100, 129, 133)'
        }
      });


      console.log('Generated!');


      writeFileSync('generated/generated-page.html', generatedPage);
      writeFileSync('generated/styles/main-styles.css', generatedMainStyle);

    }
    catch (err) {
      console.log(err);
    }

  }
}
