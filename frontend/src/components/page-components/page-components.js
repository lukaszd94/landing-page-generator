import './page-components.scss';
import axios from 'axios';

function PageComponents() {

  function getComponent(pageComponentId) {
    axios.get(`http://localhost:8081/api/generator/page-components/${pageComponentId}`, {})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }


  getComponent(2);


  return (
    <div className="PageComponents flex">
      <div className="pr-10">
        <div>
          <h4>HTML</h4>
          <div>
            <textarea name="" id="" cols="50" rows="10"></textarea>
          </div>
        </div>

        <div>
          <h4>CSS</h4>
          <div>
            <textarea name="" id="" cols="50" rows="10"></textarea>
          </div>
        </div>

        <div>
          <h4>JS</h4>
          <div>
            <textarea name="" id="" cols="50" rows="10"></textarea>
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
