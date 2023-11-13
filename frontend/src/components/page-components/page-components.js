import './page-components.scss';
import axios from 'axios';
import Editor from "@monaco-editor/react";
import PageComponentSettings from "./page-component-settings/page-component-settings";
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function PageComponents() {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [pageComponentUrl, setPageComponentUrl] = useState(null);
  const [pageComponent, setPageComponent] = useState({
    id: null,
    pageId: null,
    type: null,
    name: null,
    htmlCode: null,
    cssCode: null,
    jsCode: null,
    htmlVars: null,
    cssVars: null,
    jsVars: null,
  });

  async function getComponent(pageComponentId) {
    if (pageComponentId) {
      const { data } = await axios.get(`http://localhost:8081/api/generator/page-components/${pageComponentId}`);
      const pageComp = data.payload[0];

      setPageComponentUrl(`http://localhost:8081/generated-components/${pageComp.id}/component.html`);

      return setPageComponent(prevState => {
        return {
          id: pageComp.id,
          pageId: pageComp.pageId,
          type: pageComp.type,
          name: pageComp.name,
          htmlCode: pageComp.htmlCode,
          cssCode: pageComp.cssCode,
          jsCode: pageComp.jsCode,
          htmlVars: JSON.stringify(pageComp.htmlVars),
          cssVars: JSON.stringify(pageComp.cssVars),
          jsVars: JSON.stringify(pageComp.jsVars)
        }
      });
    } else {
      return setPageComponent(prevState => {
        return {
          id: null,
          pageId: null,
          type: null,
          name: null,
          htmlCode: null,
          cssCode: null,
          jsCode: null,
          htmlVars: null,
          cssVars: null,
          jsVars: null,
        }
      });
    }
  }

  async function saveComponent() {
    await axios.put(`http://localhost:8081/api/generator/page-components/${pageComponent.id}`, pageComponent);
    setPageComponentUrl(`http://localhost:8081/generated-components/${pageComponent.id}/component.html`);
    setOpenSnackBar(true);
    generatedPageReload();
  }

  async function generateComponent() {
    await axios.post(`http://localhost:8081/api/generator/page-components/${pageComponent.id}/generate`);
    setPageComponentUrl(`http://localhost:8081/generated-components/${pageComponent.id}/component.html`);
    setOpenSnackBar(true);
    generatedPageReload();
  }

  function generatedPageReload() {
    document.getElementById('generated-page-component-iframe').src = document.getElementById('generated-page-component-iframe').src;
  }


  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  const setHtmlCode = (code) => {
    setPageComponent(prevState => {
      return {
        id: prevState.id,
        pageId: prevState.pageId,
        type: prevState.type,
        name: prevState.name,
        htmlCode: code,
        cssCode: prevState.cssCode,
        jsCode: prevState.jsCode,
        htmlVars: prevState.htmlVars,
        cssVars: prevState.cssVars,
        jsVars: prevState.jsVars
      }
    });
  };

  const setCssCode = (code) => {
    setPageComponent(prevState => {
      return {
        id: prevState.id,
        pageId: prevState.pageId,
        type: prevState.type,
        name: prevState.name,
        htmlCode: prevState.htmlCode,
        cssCode: code,
        jsCode: prevState.jsCode,
        htmlVars: prevState.htmlVars,
        cssVars: prevState.cssVars,
        jsVars: prevState.jsVars
      }
    });
  };

  const setJsCode = (code) => {
    setPageComponent(prevState => {
      return {
        id: prevState.id,
        pageId: prevState.pageId,
        type: prevState.type,
        name: prevState.name,
        htmlCode: prevState.htmlCode,
        cssCode: prevState.cssCode,
        jsCode: code,
        htmlVars: prevState.htmlVars,
        cssVars: prevState.cssVars,
        jsVars: prevState.jsVars
      }
    });
  };

  const setHtmlVars = (code) => {
    setPageComponent(prevState => {
      return { ...prevState, htmlVars: code }
    });
  };

  const setCssVars = (code) => {
    setPageComponent(prevState => {
      return { ...prevState, cssVars: code }
    });
  };

  const setJsVars = (code) => {
    setPageComponent(prevState => {
      return { ...prevState, jsVars: code }
    });
  };


  useEffect(() => {
    //console.log('getComponent')
    //getComponent(2);
  }, []);

  return (
    <div className="PageComponents">
      <div>
        <PageComponentSettings onComponentChange={(componentId) => getComponent(componentId)} onSave={() => saveComponent()} onGenerate={() => generateComponent()} />
      </div>

      <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleCloseSnackBar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
          Saved!
        </Alert>
      </Snackbar>

      {pageComponent.id > 0 ?
        (
          <div>
            <div className="flex">
              <div className="pr-10">
                <div>
                  <h3>Templates</h3>
                  <br />
                </div>
                <div>
                  <h4>HTML</h4>
                  <div className="code-editor">
                    <Editor
                      height="100%"
                      width="100%"
                      language="html"
                      theme="vs-dark"
                      inlineSuggest="true"
                      value={pageComponent.htmlCode}
                      onChange={(code) => setHtmlCode(code)}
                      options={{
                        fontSize: "12px",
                        formatOnType: true,
                        autoClosingBrackets: true
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h4>CSS</h4>
                  <div className="code-editor">
                    <Editor
                      height="100%"
                      width="100%"
                      language="scss"
                      theme="vs-dark"
                      value={pageComponent.cssCode}
                      onChange={(code) => setCssCode(code)}
                      options={{
                        fontSize: "12px",
                        formatOnType: true,
                        autoClosingBrackets: true
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h4>JS</h4>
                  <div className="code-editor">
                    <Editor
                      height="100%"
                      width="100%"
                      language="javascript"
                      theme="vs-dark"
                      value={pageComponent.jsCode}
                      onChange={(code) => setJsCode(code)}
                      options={{
                        fontSize: "12px",
                        formatOnType: true,
                        autoClosingBrackets: true
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <h3>Data</h3>
                  <br />
                </div>
                <div>
                  <h4>HTML</h4>
                  <div className="code-editor">
                    <Editor
                      height="100%"
                      width="100%"
                      language="json"
                      theme="vs-dark"
                      inlineSuggest="true"
                      value={pageComponent.htmlVars}
                      onChange={(code) => setHtmlVars(code)}
                      options={{
                        fontSize: "12px",
                        formatOnType: true,
                        autoClosingBrackets: true
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h4>CSS</h4>
                  <div className="code-editor">
                    <Editor
                      height="100%"
                      width="100%"
                      language="json"
                      theme="vs-dark"
                      value={pageComponent.cssVars}
                      onChange={(code) => setCssVars(code)}
                      options={{
                        fontSize: "12px",
                        formatOnType: true,
                        autoClosingBrackets: true
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h4>JS</h4>
                  <div className="code-editor">
                    <Editor
                      height="100%"
                      width="100%"
                      language="json"
                      theme="vs-dark"
                      value={pageComponent.jsVars}
                      onChange={(code) => setJsVars(code)}
                      options={{
                        fontSize: "12px",
                        formatOnType: true,
                        autoClosingBrackets: true
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="w-full">
              <h4>COMPONENT</h4>
              <div className="page-component">
                <iframe title="generated-page-component" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  referrerPolicy="origin" className="page-component__iframe"
                  src={pageComponentUrl} id="generated-page-component-iframe"
                  allowtransparency="true">
                </iframe>
              </div>
            </div>
          </div>

        ) :
        (
          <div>
            <Alert severity="info">Select component from list</Alert>
          </div>
        )
      }
    </div>
  );
}
