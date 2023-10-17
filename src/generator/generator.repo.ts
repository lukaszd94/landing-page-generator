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

      const sectionMainFile = readFileSync(`html-templates/${version}/components/sections/section.main.html`, 'utf-8');
      const sectionMainTemplate = Handlebars.compile(sectionMainFile);

      const sectionForWhoFile = readFileSync(`html-templates/${version}/components/sections/section.for-who.html`, 'utf-8');
      const sectionForWhoTemplate = Handlebars.compile(sectionForWhoFile);

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
        sections: {
          main: {

          },
          forWho: {
            boxes: [{
              title: 'Dla świadomych osób, które chcą uporządkować swoją dokumentację we właściwy i przejrzysty sposób.',
              text: 'Praktycznie każdy z nas wie, że ważne dokumenty powinny być przechowywane w bezpiecznym i łatwo dostępnym miejscu. Bałagan w „papierach” to jednak odwieczny problem wielu gospodarstw domowych. Apteczka Finansowa to rozwiązanie, które pomoże Ci w uporządkowaniu kluczowych dokumentów finansowych w prosty, wygodny i skuteczny sposób.',
            }, {
              title: 'Dla zabieganych osób, które nie chcą poświęcać czasu i energii na przeszukiwanie domu w poszukiwaniu zagubionych dokumentów.',
              text: 'Bałagan w dokumentach powoduje, że tracimy sporo czasu i nerwów na odnalezienie tego, co akurat jest nam potrzebne. Uniknij przyszłych frustracji i zaoszczędź cenny czas - z Apteczką Finansową z łatwością uporządkujesz swoje dokumenty i zyskasz spokój umysłu.',
            }, {
              title: 'Dla osób, którym zależy na bezpieczeństwie swoim oraz bliskich osób.',
              text: 'Nikt w trudnych chwilach choroby, czy straty bliskiej osoby, nie chciałby zmagać się z poszukiwaniem ważnych dokumentów. Apteczka Finansowa pomoże Ci w ich zebraniu i uporządkowaniu. Dzięki temu w razie potrzeby Ty i Twoi bliscy będziecie mieć pod ręką najistotniejsze dokumenty finansowe, co pozwoli Wam na uniknięcie dodatkowego stresu i niepewności w trudnych momentach.',
            }, {
              title: 'Dla tych, którzy cenią sobie czas, wygodę i łatwość dostępu do dokumentacji.',
              text: 'Zastanawiasz się, jaką dokumentację gromadzić i w jaki sposób ją segregować? Skorzystaj z gotowego i przemyślanego rozwiązania, jakie oferuje nasza Apteczka Finansowa. Dzięki niej bez trudu, szybko i skutecznie poukładasz najważniejsze dokumenty, a w przyszłości nie będziesz mieć problemów z ich odnalezieniem.',
            }, {
              title: 'Dla tych, którzy cenią sobie czas, wygodę i łatwość dostępu do dokumentacji.',
              text: 'Zastanawiasz się, jaką dokumentację gromadzić i w jaki sposób ją segregować? Skorzystaj z gotowego i przemyślanego rozwiązania, jakie oferuje nasza Apteczka Finansowa. Dzięki niej bez trudu, szybko i skutecznie poukładasz najważniejsze dokumenty, a w przyszłości nie będziesz mieć problemów z ich odnalezieniem.',
            }],
          }
        },
        footer: {
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
          }, {
            text: 'Dla kogo',
            title: 'Dla kogo',
            url: 'https://test.pl',
            type: 'link'
          }],
          rightText: "Apteczka finansowa © 2023 Wszystkie prawa zastrzeżone"
        }
      }

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
