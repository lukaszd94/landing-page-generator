import './App.scss';
// import { useState } from 'react';
import axios from 'axios';

function App() {
  //const [count, setCount] = useState(0);

  // function onClick() {
  //   setCount(count + 1);
  // }

  function goToGeneratedPage() {
    window.location.href = 'http://localhost:8081/generated-page.html';
  }

  function generatedPageReload() {
    document.getElementById('generated-page-iframe').src = document.getElementById('generated-page-iframe').src;
  }

  function generatePage() {
    let body = {
      test: 1
    };

    axios.post('http://localhost:8081/api/generator/generate-page', body)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Landing Page Generator</h3>
      </header>

      <div className="App-content">
        <div className="App-generated-page__menu">
          <div>
            <button className="App-generated-page__goto-btn" onClick={goToGeneratedPage}>Go to generated page</button>
          </div>
          <div>
            <button className="App-generated-page__reload-btn" onClick={generatedPageReload}>Reload generated page</button>
          </div>
          <div>
            <button className="App-generated-page__generate-btn" onClick={generatePage}>Generate page</button>
          </div>
        </div>


        <div>
          <iframe title="generated-page" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            referrerPolicy="origin" className="App-generated-page__iframe"
            src="http://localhost:8081/generated-page.html" id="generated-page-iframe"
            allowtransparency="true" scrolling="yes" frameBorder="0">
          </iframe>
        </div>

      </div>
    </div>
  );
}

export default App;
