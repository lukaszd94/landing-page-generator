import './page-component-settings.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Save from '@mui/icons-material/Save';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';

export default function PageComponentSettings({ onComponentChange, onSave }) {

  const [pageComponents, setPageComponents] = useState([]);

  async function getComponents() {
    const { data } = await axios.get(`http://localhost:8081/api/generator/page-components`);
    const pageComps = data.payload;

    return setPageComponents(prevState => {
      return pageComps.map(pageComp => {
        return {
          id: pageComp.id,
          label: pageComp.name
        }
      });
    });
  }

  function onPageComponentChange(value) {
    console.log('onPageComponentChange: ', value);
    onComponentChange(value ? value.id: null);
  }

  useEffect(() => {
    console.log('getComponents')
    getComponents();
  }, []);


  return (
    <div className="PageComponentSettings">
      <div>
        <h4>Settings</h4>
        <div className="flex justify-between items-center settings-container">
          <div className="flex">
            <div>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={pageComponents}
                sx={{ width: 300 }}
                onChange={(event, value) => onPageComponentChange(value)}
                renderInput={(params) => <TextField {...params} label="Component" />}
              />
            </div>
            <div>

            </div>
          </div>
          <div>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
              <Button color="success" onClick={(event) => onSave()}>
                <Save />
                <span className="ml-2">Save</span>
              </Button>
              <Button>
                <Add />
                <span className="ml-2">Add</span>
              </Button>
              <Button color="error">
                <Delete />
                <span className="ml-2">Delete</span>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

