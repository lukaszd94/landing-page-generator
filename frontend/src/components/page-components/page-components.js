import './page-components.scss';
import axios from 'axios';
import Editor from "@monaco-editor/react";
import PageComponentSettings from "./page-component-settings/page-component-settings";
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { usePageComponentsStore } from '../../store';

export default function PageComponents() {
  // const currentPageComponentId = usePageComponentsStore(state => state.currentPageComponentId);
  const pageComponents = usePageComponentsStore(state => state.pageComponents);
  // const setPageComponents = usePageComponentsStore(state => state.setPageComponents);
  const currentPageComponent = usePageComponentsStore(state => state.currentPageComponent);
  const setCurrentPageComponent = usePageComponentsStore(state => state.setCurrentPageComponent);
  const setCurrentPageComponentId = usePageComponentsStore(state => state.setCurrentPageComponentId);
  const setSelectedPageComponent = usePageComponentsStore(state => state.setSelectedPageComponent);
  const addNewToPageComponents = usePageComponentsStore(state => state.addNewToPageComponents);
  const deleteFromPageComponents = usePageComponentsStore(state => state.deleteFromPageComponents);
  const getPageComponents = usePageComponentsStore(state => state.getPageComponents);

  const [openSnackBar, setOpenSnackBar] = useState(false);


  async function getComponent(pageComponentId) {
    if (pageComponentId) {
      const { data } = await axios.get(`http://localhost:8081/api/generator/page-components/${pageComponentId}`);
      const pageComp = data.payload[0];

      setCurrentPageComponent({
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
      });
    } else {
      setCurrentPageComponent({
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
    }
  }

  async function saveComponent(id) {
    if (id) {
      await axios.put(`http://localhost:8081/api/generator/page-components/${id}`, currentPageComponent);
      setOpenSnackBar(true);
    }
  }

  async function saveNewComponent(id) {
    const { data } = await axios.post(`http://localhost:8081/api/generator/page-components`, currentPageComponent);
    const newComponentId = data.payload;

    setCurrentPageComponent({ id: newComponentId });
    setOpenSnackBar(true);
    getComponent(newComponentId);
    addNewToPageComponents({ id: newComponentId, label: currentPageComponent.name });
  }

  async function generateComponent(id) {
    if (id) {
      await axios.post(`http://localhost:8081/api/generator/page-components/${id}/generate`);
      setOpenSnackBar(true);
    }
  }

  async function deleteComponent(id) {
    if (id) {
      await axios.delete(`http://localhost:8081/api/generator/page-components/${id}`);
      setOpenSnackBar(true);

      setCurrentPageComponent({
        id: null,
        pageId: null,
        type: null,
        name: null,
        htmlCode: null,
        cssCode: null,
        jsCode: null,
        htmlVars: null,
        cssVars: null,
        jsVars: null
      });
      setCurrentPageComponentId(null);
      deleteFromPageComponents(id);
    }
  }

  async function createComponent() {
    setCurrentPageComponent({
      id: 0,
      pageId: null,
      type: null,
      name: null,
      htmlCode: null,
      cssCode: null,
      jsCode: null,
      htmlVars: null,
      cssVars: null,
      jsVars: null
    });
    setCurrentPageComponentId(null);
    setSelectedPageComponent(null);
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  const setHtmlCode = (code) => {
    setCurrentPageComponent({ htmlCode: code });
  };

  const setCssCode = (code) => {
    setCurrentPageComponent({ cssCode: code });
  };

  const setJsCode = (code) => {
    setCurrentPageComponent({ jsCode: code });
  };

  const setHtmlVars = (code) => {
    setCurrentPageComponent({ htmlVars: code });
  };

  const setCssVars = (code) => {
    setCurrentPageComponent({ cssVars: code });
  };

  const setJsVars = (code) => {
    setCurrentPageComponent({ jsVars: code });
  };

  const setName = (name) => {
    setCurrentPageComponent({ name: name });
  };



  useEffect(() => {
    getPageComponents();
    console.log('page components useEffect');

    // const onCtrlS = (event) => {
    //   if (event.ctrlKey && event.key === 's') {
    //     event.preventDefault();
    //     console.log('CTRL + S, pageComponentId:', currentPageComponent.id);
    //     saveComponent(currentPageComponent.id);
    //   }
    // }

    // document.addEventListener('keydown', onCtrlS);

    // return () => {
    //   document.removeEventListener("keydown", onCtrlS);
    // };
  }, [getPageComponents]);


  return (
    <div className="PageComponents">
      <div>
        <PageComponentSettings
          pageComponents={pageComponents}
          onComponentChange={(componentId) => getComponent(componentId)}
          onSave={(componentId) => saveComponent(componentId)}
          onGenerate={(componentId) => generateComponent(componentId)}
          onCreate={() => createComponent()}
          onDelete={(componentId) => deleteComponent(componentId)}
          onSaveNew={() => saveNewComponent()}
        />
      </div>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
          Saved!
        </Alert>
      </Snackbar>

      {currentPageComponent.id === 0 ?
        (
          <div className="pb-5">
            <TextField id="outlined-basic" required label="Name" variant="outlined"
              onChange={event => setName(event.target.value)}
            />
          </div>
        )
        :
        (
          <div></div>
        )
      }

      {currentPageComponent.id !== null ?
        (
          <div>
            <div>
              <h1>Page Component <b>#{currentPageComponent.id}</b>: {currentPageComponent.name}</h1>
            </div>
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
                      value={currentPageComponent.htmlCode}
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
                      value={currentPageComponent.cssCode}
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
                      value={currentPageComponent.jsCode}
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
                      value={currentPageComponent.htmlVars}
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
                      value={currentPageComponent.cssVars}
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
                      value={currentPageComponent.jsVars}
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
          </div>

        ) :
        (
          <div>
            <Alert severity="info">Select component from list od create new</Alert>
          </div>
        )
      }
    </div>
  );
}
