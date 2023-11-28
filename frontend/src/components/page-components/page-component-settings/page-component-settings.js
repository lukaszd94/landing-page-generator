import './page-component-settings.scss';
import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Save from '@mui/icons-material/Save';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import { socket } from '../../../socket';
import { usePageComponentsStore } from '../../../store';

export default function PageComponentSettings({ pageComponents, onComponentChange, onSave, onCreate, onDelete, onGenerate, onSaveNew }) {
  const setCurrentPageComponentId = usePageComponentsStore(state => state.setCurrentPageComponentId);
  const selectedPageComponent = usePageComponentsStore(state => state.selectedPageComponent);
  const setSelectedPageComponent = usePageComponentsStore(state => state.setSelectedPageComponent);

  function onPageComponentChange(value) {
    // console.log('onPageComponentChange: ', value);
    onComponentChange(value ? value.id : null);
    setSelectedPageComponent(value);
    setCurrentPageComponentId(value?.id);
  }

  function openGeneratedComponent() {
    window.open(`/page-components/${selectedPageComponent.id}`, "_blank");
  }

  const onGeneretedEvent = (args) => {
    // console.log('on generated event', args);
  }

  useEffect(() => {
    socket.on('generated', onGeneretedEvent);

    return () => {
      socket.off('generated', onGeneretedEvent);
    }
  }, []);


  return (
    <div className="PageComponentSettings">
      <div>
        <div className="flex justify-between items-center settings-container">
          <div className="flex items-center">
            <div>
              <Autocomplete
                size="small"
                disablePortal
                value={selectedPageComponent}
                id="combo-box-demo"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={pageComponents}
                sx={{ width: 300 }}
                onChange={(event, value) => onPageComponentChange(value)}
                renderInput={(params) => <TextField {...params} label="Component" />}
              />
            </div>
            <div className="pl-2">
              <Button variant="outlined" onClick={(event) => onCreate()}>
                <Add />
                <span className="ml-2">Create</span>
              </Button>
            </div>
          </div>
          {selectedPageComponent?.id != null ?
            (
              <div>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                  {/* <Button onClick={(event) => onGenerate()}>
                    <Save />
                    <span className="ml-2">Generate</span>
                  </Button> */}

                  <Button onClick={(event) => openGeneratedComponent(selectedPageComponent?.id)}>
                    <span className="ml-2">Open Generated Component</span>
                  </Button>
                  <Button color="success" onClick={(event) => onSave(selectedPageComponent?.id)}>
                    <Save />
                    <span className="ml-2">Save</span>
                  </Button>
                  <Button color="error" onClick={(event) => onDelete(selectedPageComponent?.id)}>
                    <Delete />
                    <span className="ml-2">Delete</span>
                  </Button>
                </ButtonGroup>
              </div>
            )
            :
            (
              <div>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                  <Button color="success" onClick={(event) => onSaveNew()}>
                    <Save />
                    <span className="ml-2">Save</span>
                  </Button>
                </ButtonGroup>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

