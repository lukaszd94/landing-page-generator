import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss';
import Generator from './components/generator/generator';
import Navbar from './components/navbar/navbar';
import PageComponents from './components/page-components/page-components';
import PageComponentGenerated from './components/page-components/page-component-generated/page-component-generated';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey, green, purple, amber } from '@mui/material/colors';

function App() {
  const theme = createTheme({
    palette: {
      primary: blueGrey,
      secondary: purple,
      success: green,
      error: amber,
      mode: 'dark'
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="App-content">
            <Routes>
              <Route path="/" element={<Generator />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/page-components" element={<PageComponents />} />
              <Route path="/page-components/:id" element={<PageComponentGenerated />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
