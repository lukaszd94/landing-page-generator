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
      const mainStylesCSS = readFileSync(`html-templates/${version}/styles/main-styles.css`, 'utf-8');
      const layoutHTML = readFileSync('html-templates/layout.html', 'utf-8');
      const pageTemplate = Handlebars.compile(layoutHTML);
      const mainStylesTemplate = Handlebars.compile(mainStylesCSS);


      //compoinents files and handlebars templates
      const headerDesktopFile = readFileSync(`html-templates/${version}/components/header/header.desktop.html`, 'utf-8');
      const headerDesktopTemplate = Handlebars.compile(headerDesktopFile);

      const footerDesktopFile = readFileSync(`html-templates/${version}/components/footer/footer.desktop.html`, 'utf-8');
      const footerDesktopTemplate = Handlebars.compile(footerDesktopFile);

      const componentsData = {
        header: {
          title: 'Generated Page LPG',
          menu: {
            leftNav: [{
              text: 'Dlaczego warto',
              title: 'Dlaczego warto',
              url: 'https://test.pl',
              type: 'link'
            }, {
              text: 'Co zyskasz',
              title: 'Co zyskasz',
              url: 'https://test.pl',
              type: 'link'
            }],
            rightNav: [{
              text: 'Dla kogo',
              title: 'Dla kogo',
              url: 'https://test.pl',
              type: 'link'
            }, {
              text: 'Zamów Apteczkę',
              title: 'Zamów Apteczkę',
              url: 'https://test.pl',
              type: 'btn'
            }]
          }
        },
        footer: {
        }
      }

      const filledHeaderDesktopComponenent = headerDesktopTemplate(componentsData.header);
      const filledFooterDesktopComponenent = footerDesktopTemplate(componentsData.footer);

      console.log(filledHeaderDesktopComponenent);
      console.log(filledFooterDesktopComponenent);

      const generatedPage = pageTemplate({
        content: {

        },

        components: {
          header: {
            desktop: filledHeaderDesktopComponenent,
          },
          footer: {
            desktop: filledFooterDesktopComponenent
          }
        }
      });


      const generatedMainStyle = mainStylesTemplate({

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
