import './page-components.scss';
import axios from 'axios';
import Editor from "@monaco-editor/react";
import { useState, useEffect } from 'react';

function PageComponents() {

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
    const {data} = await axios.get(`http://localhost:8081/api/generator/page-components/${pageComponentId}`);
    const pageComp = data.payload[0];

    return setPageComponent(prevState => {
      return {
        id: pageComp.id,
        pageId: pageComp.pageId,
        type: pageComp.type,
        name: pageComp.name,
        htmlCode: pageComp.htmlCode,
        cssCode: pageComp.cssCode,
        jsCode: pageComp.jsCode,
        htmlVars: pageComp.htmlVars,
        cssVars: pageComp.cssVars,
        jsVars: pageComp.jsVars
      }
    });
  }

  useEffect(() => {
    console.log('getComponent')
    getComponent(2);
  }, []);



  return (
    <div className="PageComponents flex">
      <div className="pr-10">
        <div>
          <h4>HTML</h4>
          <div>
            <Editor
              height="200px"
              width="500px"
              language="html"
              theme="vs-dark"
              value={pageComponent.htmlCode}
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
          <div>
          <Editor
              height="200px"
              width="500px"
              language="scss"
              theme="vs-dark"
              value={pageComponent.cssCode}
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
          <div>
          <Editor
              height="200px"
              width="500px"
              language="javascript"
              theme="vs-dark"
              value={pageComponent.jsCode}
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
        <h4>COMPONENT</h4>
        <div>
          content
        </div>
      </div>
    </div>
  );
}

export default PageComponents;
