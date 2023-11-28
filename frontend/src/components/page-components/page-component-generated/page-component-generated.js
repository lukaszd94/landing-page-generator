import './page-component-generated.scss';
import { socket } from '../../../socket';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function PageComponentGenerated() {
  let params = useParams();
  const [pageComponentUrl, setPageComponentUrl] = useState('');

  function generatedPageReload() {
    document.getElementById('generated-page-component-iframe').src = document.getElementById('generated-page-component-iframe').src;
  }


  async function getComponentUrl(pageComponentId) {
    if (pageComponentId) {
      const { data } = await axios.get(`http://localhost:8081/api/generator/page-components/${pageComponentId}/url`);
      const pageCompUrl = data.payload;

      setPageComponentUrl(`http://localhost:8081${pageCompUrl}`);
      generatedPageReload();
    }
  }

  useEffect(() => {
    console.log('PageComponentGenerated');

    getComponentUrl(params.id);

    socket.on('generated', (args) => {
      console.log('on page component generated', args);
      setPageComponentUrl(`http://localhost:8081${args.pageComponentUrl}`);
      generatedPageReload();
    });
  }, []);


  return (
    <div className="PageComponentGenerated">
      <h4>PageComponentGenerated {params.id}</h4>
      <p>url: <a href={pageComponentUrl}>{pageComponentUrl}</a></p>
      <br />
      <div className="w-full">
        <div className="page-component">
          <iframe title="generated-page-component" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            referrerPolicy="origin" className="page-component__iframe"
            src={pageComponentUrl} id="generated-page-component-iframe"
            allowtransparency="true">
          </iframe>
        </div>
      </div>
    </div>
  );
}

