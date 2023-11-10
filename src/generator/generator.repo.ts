import { DbService } from "../core/utils/db.service.js";
import Handlebars from "handlebars";
import { readFileSync, writeFileSync, createWriteStream, readdir } from 'fs';
import path from 'path';
import JSZip from "jszip";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PageComponent } from "./generator.model.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class GeneratorRepository {
  constructor() { }

  static async getPageComponentById(pageComponentId: number): Promise<PageComponent> {
    const queryResult = await DbService.runQuery(`
      SELECT
        *
      FROM
        page_component
      WHERE
        id = ${pageComponentId};
    `);

    return queryResult.map((item: PageComponent) => item);
  }

  static async getPageComponents(): Promise<Array<PageComponent>> {
    const queryResult = await DbService.runQuery(`
      SELECT
        id,
        name
      FROM
        page_component
      ORDER BY id;
    `);

    return queryResult.map((item: PageComponent) => item);
  }

  static async savePageComponents(pageComponentId: number, pageComponent: PageComponent): Promise<void> {
    await DbService.runQuery(`
      UPDATE page_component
      SET
        name = ${pageComponent.name},
        html_code = ${pageComponent.htmlCode},
        css_code = ${pageComponent.cssCode},
        js_code = ${pageComponent.jsCode},
        html_vars = ${pageComponent.htmlVars},
        css_vars = ${pageComponent.cssVars},
        js_vars = ${pageComponent.jsVars}
      WHERE
        id = ${pageComponentId};
    `);
  }

  static async downloadGeneratedPage(): Promise<void> {
    const zip = new JSZip();

    const directoryPath = path.join(__dirname.replace('build\\src\\generator', 'generated'));
    readdir(directoryPath, (_err, files) => {
      files.forEach(file => {
        zip.file(file);
      });
    });

    zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(createWriteStream('sample.zip'))
      .on('finish', function () {
        console.log("sample.zip written.");
      });

  }


  static async generatePage(templateData: {
    header: object,
    sections: {
      main: object,
      forWho: object
    },
    footer: object
  }): Promise<void> {
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

      const sectionMainFile = readFileSync(`html-templates/${version}/components/sections/section.main.html`, 'utf-8');
      const sectionMainTemplate = Handlebars.compile(sectionMainFile);

      const sectionForWhoFile = readFileSync(`html-templates/${version}/components/sections/section.for-who.html`, 'utf-8');
      const sectionForWhoTemplate = Handlebars.compile(sectionForWhoFile);

      const componentsData = templateData;

      const filledHeaderDesktopComponenent = headerDesktopTemplate(componentsData.header);
      const filledSectionMainComponenent = sectionMainTemplate(componentsData.sections.main);
      const filledSectionForWhoComponenent = sectionForWhoTemplate(componentsData.sections.forWho);
      const filledFooterDesktopComponenent = footerDesktopTemplate(componentsData.footer);

      const generatedPage = pageTemplate({
        content: {

        },

        components: {
          header: {
            desktop: filledHeaderDesktopComponenent,
          },
          sections: [
            filledSectionMainComponenent,
            filledSectionForWhoComponenent,
            filledSectionMainComponenent
          ],
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
