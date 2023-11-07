import './generator.scss';
import axios from 'axios';
import GeneratorForm from './generator-form/generator-form.js';
import { useState } from 'react';

function Generator() {
  const [templateData, setTemplateData] = useState({
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
        header: {
          title: 'Dla kogo jest Apteczka Finansowa?',
          text: 'Przekonaj się, że Apteczka Finansowa to produkt właśnie dla Ciebie!'
        },
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
  });

  function goToGeneratedPage() {
    window.location.href = 'http://localhost:8081/generated-page.html';
  }

  function generatedPageReload() {
    document.getElementById('generated-page-iframe').src = document.getElementById('generated-page-iframe').src;
  }

  function generatePage() {
    axios.post('http://localhost:8081/api/generator/generate-page', { templateData })
      .then(response => {
        console.log(response.data);
        generatedPageReload();
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  function downloadGeneratedPage() {
    axios.post('http://localhost:8081/api/generator/download-generated-page', {})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }


  function onInputChange(event) {
    const updatedTemplateData = {
      sections: {
        ...templateData.sections,
        forWho: {
          ...templateData.sections.forWho,
          header: {
            ...templateData.sections.forWho.header,
            title: event.target.value
          }
        }
      }
    };

    setTemplateData((templateData) => ({
      ...templateData,
      ...updatedTemplateData
    }));
  }

  function deleteBox(index) {
    const updatedBoxes = templateData.sections.forWho.boxes.filter((item, idx) => idx !== index);

    const updatedTemplateData = {
      sections: {
        ...templateData.sections,
        forWho: {
          ...templateData.sections.forWho,
          boxes: updatedBoxes
        }
      }
    };

    setTemplateData((templateData) => ({
      ...templateData,
      ...updatedTemplateData
    }));
  };


  return (
    <div className="Generator">
      <h3>Generator</h3>
      <div className="menu">
        <div>
          <button className="menu__goto-btn" onClick={goToGeneratedPage}>Go to generated page</button>
        </div>
        <div>
          <button className="menu__reload-btn" onClick={generatedPageReload}>Reload generated page</button>
        </div>
        <div>
          <button className="menu__generate-btn" onClick={generatePage}>Generate page</button>
        </div>
        <div>
          <button className="menu__generate-btn" onClick={downloadGeneratedPage}>Download generated page</button>
        </div>
      </div>

      <hr />

      <div className="flex justify-between pt-5">
        <div className="w-1/3">
          <GeneratorForm className="" />

          {/* {templateData.sections.forWho.boxes.map((box, index) => {
            return (
              <div key={index}>
                <h2>title: {box.title}</h2>
                <h2>text: {box.text}</h2>
                <hr />
              </div>
            );
          })
          } */}

          <div>
            <div className="p-3">
              <label className="block text-sm font-medium leading-">Header title</label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                  <textarea
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                    value={templateData.sections.forWho.header.title}
                    onChange={onInputChange} />
                </div>
              </div>
            </div>

            <div className="p-3">
              <label className="block text-sm font-medium leading-">Header text</label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                  <textarea
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                    value={templateData.sections.forWho.header.text}
                    onChange={onInputChange} />
                </div>
              </div>
            </div>


            <div className="p-3">
              <label className="block text-sm font-medium leading-">Boxes</label>
              {templateData.sections.forWho.boxes.map((box, index) => {
                return (
                  <div className="m-2 p-3 rounded-md" key={index} style={{ border: 'solid 1px' }}>
                    <div className="flex justify-between">
                      <div>
                        <span>Box {index}</span>
                      </div>
                      <div>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full text-xs"
                          onClick={() => deleteBox(index)}>
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <textarea
                          type="text"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder=""
                          value={box.title}
                          onChange={onInputChange} />
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <textarea
                          type="text"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder=""
                          value={box.text}
                          onChange={onInputChange} />
                      </div>
                    </div>
                  </div>
                );
              })
              }
            </div>
          </div>
        </div>

        <div className="w-full">
          <h3>Generated page</h3>
          <div className="mt-3 generated-page">
            <iframe title="generated-page" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              referrerPolicy="origin" className="generated-page__iframe"
              src="http://localhost:8081/generated-page.html" id="generated-page-iframe"
              allowtransparency="true" scrolling="yes" frameBorder="0">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Generator;
