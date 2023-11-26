import { DbService } from "../core/utils/db.service.js";
import Handlebars from "handlebars";
import {
  readFileSync,
  writeFileSync,
  createWriteStream,
  readdir,
  existsSync,
  mkdirSync,
  rmSync
} from 'fs';
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

  static async savePageComponent(pageComponentId: number, pageComponent: PageComponent): Promise<number> {
    pageComponent.htmlVars = JSON.parse(pageComponent.htmlVars);
    pageComponent.cssVars = JSON.parse(pageComponent.cssVars);
    pageComponent.jsVars = JSON.parse(pageComponent.jsVars);

    const updatedPageComponents = (await DbService.runFunction('update_page_component',
      pageComponentId,
      pageComponent.name,
      pageComponent.htmlCode,
      pageComponent.cssCode,
      pageComponent.jsCode,
      pageComponent.htmlVars,
      pageComponent.cssVars,
      pageComponent.jsVars
    ))[0].updatePageComponent;

    return updatedPageComponents;
  }

  static async createPageComponent(pageComponent: PageComponent): Promise<number> {
    pageComponent.htmlVars = JSON.parse(pageComponent.htmlVars);
    pageComponent.cssVars = JSON.parse(pageComponent.cssVars);
    pageComponent.jsVars = JSON.parse(pageComponent.jsVars);

    const createdPageComponent = (await DbService.runFunction('create_page_component',
      pageComponent.name,
      pageComponent.htmlCode,
      pageComponent.cssCode,
      pageComponent.jsCode,
      pageComponent.htmlVars,
      pageComponent.cssVars,
      pageComponent.jsVars
    ))[0].createPageComponent;

    return createdPageComponent;
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

  static async generatePageComponent(pageComponentId: number): Promise<string> {
    try {

      const compnentData = await this.getPageComponentById(pageComponentId);

      console.log(compnentData);

      const componentHtmlFromDb = compnentData[0].htmlCode;
      const componentTemplate = Handlebars.compile(componentHtmlFromDb);
      const componentVars = compnentData[0].htmlVars;
      const filledComponentTemplate = componentTemplate(componentVars);

      const componentCssFromDb = compnentData[0].cssCode;
      const componentCssTemplate = Handlebars.compile(componentCssFromDb);
      const componentCssVars = compnentData[0].cssVars;
      const filledComponentCssTemplate = componentCssTemplate(componentCssVars);

      const componentJsFromDb = compnentData[0].jsCode;
      const componentJsTemplate = Handlebars.compile(componentJsFromDb);
      const componentJsVars = compnentData[0].jsVars;
      const filledComponentJsTemplate = componentJsTemplate(componentJsVars);

      const mainLayout = `
        <!DOCTYPE html>
        <html lang="en" data-lt-installed="true">

        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">

          <title>COMPONENT PREVIEW</title>

          <link type="text/css" rel="stylesheet" href="./component.css">

        </head>

        <body>
          <div>
            {{{componentTemplate}}}
          </div>
        </body>

        <script src="component.js"></script>
        </html>
      `;
      const mainLayoutTemplate = Handlebars.compile(mainLayout);
      const component = mainLayoutTemplate({
        componentTemplate: filledComponentTemplate
      });

      if (!existsSync(`generated/generated-components/${pageComponentId}`)) {
        mkdirSync(`generated/generated-components/${pageComponentId}`);
      }

      console.log('Generated!');

      writeFileSync(`generated/generated-components/${pageComponentId}/component.html`, component);
      writeFileSync(`generated/generated-components/${pageComponentId}/component.css`, filledComponentCssTemplate);
      writeFileSync(`generated/generated-components/${pageComponentId}/component.js`, filledComponentJsTemplate);

      return `/generated-components/${pageComponentId}/component.html`;
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }

  static async deleteGeneratedComponent(pageComponentId: number): Promise<void> {
    await DbService.runQuery(`
      DELETE FROM page_component
      WHERE id = ${pageComponentId};
    `);

    rmSync(`generated/generated-components/${pageComponentId}`, { recursive: true, force: true });
  }

}
