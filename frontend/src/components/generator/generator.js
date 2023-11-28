import './generator.scss';
import axios from 'axios';
import GeneratorForm from './generator-form/generator-form.js';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { usePageComponentsStore } from '../../store';
import Add from '@mui/icons-material/Add';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
// import Save from '@mui/icons-material/Save';
// import Delete from '@mui/icons-material/Delete';


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

  const selectedPageType = usePageComponentsStore(state => state.generator.selectedPageType);
  const pageTypes = usePageComponentsStore(state => state.generator.pageTypes);
  const setSelectedPageType = usePageComponentsStore(state => state.setSelectedPageType);
  const getPageTypes = usePageComponentsStore(state => state.getPageTypes);

  const selectedTheme = usePageComponentsStore(state => state.generator.selectedTheme);
  const themes = usePageComponentsStore(state => state.generator.themes);
  const setSelectedTheme = usePageComponentsStore(state => state.setSelectedTheme);
  const getThemes = usePageComponentsStore(state => state.getThemes);

  const selectedLayout = usePageComponentsStore(state => state.generator.selectedLayout);
  const layouts = usePageComponentsStore(state => state.generator.layouts);
  const setSelectedLayout = usePageComponentsStore(state => state.setSelectedLayout);
  const getLayouts = usePageComponentsStore(state => state.getLayouts);

  const selectedTempPageComponent = usePageComponentsStore(state => state.generator.selectedTempPageComponent);
  const selectedPageComponents = usePageComponentsStore(state => state.generator.selectedComponents);
  const pageComponents = usePageComponentsStore(state => state.pageComponents);
  const setSelectedTempPageComponent = usePageComponentsStore(state => state.setSelectedTempPageComponent);
  const addTempPageComponentToPage = usePageComponentsStore(state => state.addTempPageComponentToPage);
  const removeTempPageComponentToPage = usePageComponentsStore(state => state.removeTempPageComponentToPage);
  const getPageComponents = usePageComponentsStore(state => state.getPageComponents);

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

  function onPageTypeChange(value) {
    setSelectedPageType(value);
  }

  function onThemeChange(value) {
    setSelectedTheme(value);
  }

  function onLayoutChange(value) {
    setSelectedLayout(value);
  }

  function onTempPageComponentChange(value) {
    setSelectedTempPageComponent(value);
  }

  function addPageComponentToPage() {
    addTempPageComponentToPage(selectedTempPageComponent);
  }

  function removePageComponentFromPage(id) {
    removeTempPageComponentToPage(id);
  }

  useEffect(() => {
    getPageTypes();
    getThemes();
    getLayouts();
    getPageComponents();
  }, []);


  return (
    <div className="Generator">
      <div className="menu">
        <div className="p-2">
          <Button variant="outlined" onClick={goToGeneratedPage}>Go to generated page</Button>
        </div>
        <div className="p-2">
          <Button variant="outlined" onClick={generatedPageReload}>Reload generated page</Button>
        </div>
        <div className="p-2">
          <Button variant="outlined" onClick={generatePage}>Generate page</Button>
        </div>
        <div className="p-2">
          <Button variant="outlined" onClick={downloadGeneratedPage}>Download generated page</Button>
        </div>
      </div>

      <hr />

      <div className="flex justify-between pt-5">
        <div className="w-1/3">
          <GeneratorForm className="" />

          <div>
            <div className="p-3">
              <Autocomplete
                size="small"
                disablePortal
                value={selectedPageType}
                id="combo-box-demo"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={pageTypes}
                sx={{ width: 300 }}
                onChange={(event, value) => onPageTypeChange(value)}
                renderInput={(params) => <TextField {...params} label="Page Type" />}
              />
            </div>

            <div className="p-3">
              <Autocomplete
                size="small"
                disablePortal
                value={selectedTheme}
                id="combo-box-demo"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={themes}
                sx={{ width: 300 }}
                onChange={(event, value) => onThemeChange(value)}
                renderInput={(params) => <TextField {...params} label="Theme" />}
              />
            </div>

            <div className="p-3">
              <Autocomplete
                size="small"
                disablePortal
                value={selectedLayout}
                id="combo-box-demo"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={layouts}
                sx={{ width: 300 }}
                onChange={(event, value) => onLayoutChange(value)}
                renderInput={(params) => <TextField {...params} label="Layout" />}
              />
            </div>

            <div className="p-3">
              <h4>Components</h4>
              selectedPageComponents: {selectedPageComponents.length}
              {
                selectedPageComponents.map((pageComp, index) => {
                  return (
                    <div key={index} >
                      <div className="flex justify-between">
                        <div>
                          <div>
                            <span>{pageComp.id}</span>
                          </div>
                          <div>
                            <span>{pageComp.label}</span>
                          </div>
                        </div>

                        <div>
                          <Button variant="text" onClick={(event) => removePageComponentFromPage(pageComp.id)}>
                            <RemoveCircle />
                          </Button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })
              }
              <div className="flex items-center mt-4">
                <div className="pr-1">
                  <Autocomplete
                    size="small"
                    disablePortal
                    value={selectedTempPageComponent}
                    id="combo-box-demo"
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={pageComponents}
                    sx={{ width: 300 }}
                    onChange={(event, value) => onTempPageComponentChange(value)}
                    renderInput={(params) => <TextField {...params} label="Page component" />}
                  />
                </div>
                <div>
                  <Button variant="outlined" onClick={addPageComponentToPage}>
                    <Add />
                  </Button>
                </div>
              </div>
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
